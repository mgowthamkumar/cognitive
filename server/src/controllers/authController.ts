import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { dbService } from '../db/database.js';
import { generateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { User } from '../types.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required' });
      return;
    }

    const existing = dbService.getUserByEmail(email);
    if (existing) {
      res.status(409).json({ error: 'User with this email already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      password_hash,
      role: role === 'admin' ? 'admin' : 'learner',
      created_at: new Date().toISOString()
    };

    dbService.createUser(newUser);
    const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = dbService.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    const prefs = dbService.getUserPreferences(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      preferences: prefs
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const user = dbService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const prefs = dbService.getUserPreferences(userId);
    const progress = dbService.getUserProgress(userId);
    const cognitiveHistory = dbService.getCognitiveHistory(userId, 5);
    const latestRec = dbService.getLatestRecommendation(userId);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      preferences: prefs,
      progress,
      cognitive_history: cognitiveHistory,
      latest_recommendation: latestRec
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePreferences = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { selected_language, current_level, preferred_mode } = req.body;
    dbService.saveUserPreferences({
      user_id: userId,
      selected_language: selected_language || 'python',
      current_level: current_level || 'beginner',
      preferred_mode: preferred_mode || 'adaptive'
    });

    res.json({ success: true, message: 'Preferences updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
