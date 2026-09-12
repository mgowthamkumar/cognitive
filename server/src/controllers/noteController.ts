import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { NoteRecord } from '../types.js';

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const query = req.query.q as string;
    const language = req.query.language as string;
    const topicId = req.query.topic_id as string;

    const notes = dbService.getNotes(userId, query, language, topicId);
    res.json({
      success: true,
      total: notes.length,
      notes
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch notes' });
  }
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const { language, course_id, topic_id, subtopic_title, title, content } = req.body;

    if (!title || !content || !topic_id) {
      res.status(400).json({ error: 'title, content, and topic_id are required' });
      return;
    }

    const note: NoteRecord = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: userId,
      language: language || 'python',
      course_id: course_id || '',
      topic_id,
      subtopic_title: subtopic_title || '',
      title,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    dbService.addNote(note);

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      note
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to create note' });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const { id } = req.params;
    const { title, content, subtopic_title } = req.body;

    const updated = dbService.updateNote(id, userId, { title, content, subtopic_title });
    if (!updated) {
      res.status(404).json({ error: 'Note not found or unauthorized' });
      return;
    }

    res.json({
      success: true,
      message: 'Note updated successfully',
      note: updated
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to update note' });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id || 'anon-learner';
    const { id } = req.params;

    const removed = dbService.deleteNote(id, userId);
    if (!removed) {
      res.status(404).json({ error: 'Note not found or unauthorized' });
      return;
    }

    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to delete note' });
  }
};
