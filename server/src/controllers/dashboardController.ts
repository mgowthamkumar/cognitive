import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const getDashboardSnapshot = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id || 'guest_user';
    const snapshot = dbService.getUserSnapshot(userId);
    const langProgress = dbService.getLanguageProgress(userId);
    const weakConcepts = dbService.getWeakConcepts(userId);
    const achievements = dbService.getUserAchievements(userId);

    res.json({
      ...snapshot,
      snapshot: {
        ...snapshot.learning_snapshot,
        streak_days: snapshot.streak_days,
        current_topic: {
          id: snapshot.current_topic_id,
          title: snapshot.current_topic_title
        },
        ai_recommendation: snapshot.ai_recommendation
      },
      language_progress: langProgress,
      weak_concepts: weakConcepts,
      achievements
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getLanguageRoadmap = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { language } = req.params;
    const userId = req.user?.id || 'guest_user';
    const roadmap = dbService.getRoadmap(language || 'python', userId);
    res.json({
      language: language || 'python',
      roadmap
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const submitContentFeedback = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { topic_id, feedback, comment } = req.body;
    const userId = req.user?.id || 'guest_user';

    if (!topic_id || !feedback) {
      res.status(400).json({ error: 'topic_id and feedback ("yes" | "somewhat" | "no") are required' });
      return;
    }

    dbService.saveContentFeedback({
      id: `fb_${Date.now()}`,
      user_id: userId,
      topic_id,
      feedback,
      comment,
      created_at: new Date().toISOString()
    });

    res.json({ success: true, status: 'success', message: 'Thank you for your feedback!' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPlatformStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = dbService.getPlatformStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
