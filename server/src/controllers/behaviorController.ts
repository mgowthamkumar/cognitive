import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { BehaviorEvent } from '../types.js';

export const logBehaviorEvent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { topic_id, event_type, duration, metadata } = req.body;
    const userId = req.user?.id || req.body.user_id || 'anonymous_learner';

    if (!topic_id || !event_type) {
      res.status(400).json({ error: 'topic_id and event_type are required' });
      return;
    }

    const event: BehaviorEvent = {
      user_id: userId,
      topic_id,
      event_type,
      duration: duration || 0,
      timestamp: new Date().toISOString(),
      metadata: metadata || {}
    };

    dbService.recordBehaviorEvent(event);

    res.status(201).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getSessionEvents = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { topicId } = req.params;
    const userId = req.user?.id || 'guest_user';
    const events = dbService.getTopicBehaviorSession(userId, topicId);
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
