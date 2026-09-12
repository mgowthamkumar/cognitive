import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { BookmarkRecord } from '../types.js';

export const getBookmarks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const itemType = (req.query.type as string) || 'all';

    const bookmarks = dbService.getBookmarks(userId, itemType);
    res.json({
      success: true,
      total: bookmarks.length,
      bookmarks
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch bookmarks' });
  }
};

export const addBookmark = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const { item_type, item_id, title, snippet, language, topic_id } = req.body;

    if (!item_type || !item_id || !title) {
      res.status(400).json({ error: 'item_type, item_id, and title are required' });
      return;
    }

    const bookmark: BookmarkRecord = {
      id: `bm-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: userId,
      item_type,
      item_id,
      title,
      snippet: snippet || '',
      language: language || 'python',
      topic_id: topic_id || '',
      created_at: new Date().toISOString()
    };

    dbService.addBookmark(bookmark);

    res.status(201).json({
      success: true,
      message: 'Item bookmarked successfully',
      bookmark
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to add bookmark' });
  }
};

export const deleteBookmark = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const { id } = req.params;

    const removed = dbService.deleteBookmark(id, userId);
    if (!removed) {
      res.status(404).json({ error: 'Bookmark not found or unauthorized' });
      return;
    }

    res.json({ success: true, message: 'Bookmark removed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete bookmark' });
  }
};

export const checkBookmarkStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const itemType = (req.query.item_type || req.query.itemType) as string;
    const itemId = (req.query.item_id || req.query.itemId) as string;

    if (!itemType || !itemId) {
      res.json({ is_bookmarked: false });
      return;
    }

    const isBookmarked = dbService.isBookmarked(userId, itemType, itemId);
    res.json({ is_bookmarked: isBookmarked });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to check bookmark status' });
  }
};
