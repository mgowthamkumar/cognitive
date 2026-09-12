import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { adaptiveEngine } from '../services/adaptiveEngine.js';

export const evaluateAdaptive = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { topic_id, language } = req.body;
    const userId = req.user?.id || 'guest_user';

    if (!topic_id) {
      res.status(400).json({ error: 'topic_id is required' });
      return;
    }

    const evaluation = await adaptiveEngine.evaluateLearner(userId, topic_id, language || 'python');
    res.json(evaluation);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCognitiveHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id || 'guest_user';
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const history = dbService.getCognitiveHistory(userId, limit);
    res.json(history);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getLatestRecommendation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id || 'guest_user';
    const rec = dbService.getLatestRecommendation(userId);
    res.json(rec || null);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
