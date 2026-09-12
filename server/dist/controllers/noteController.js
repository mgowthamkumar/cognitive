"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotes = void 0;
const database_js_1 = require("../db/database.js");
const getNotes = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const query = req.query.q;
        const language = req.query.language;
        const topicId = req.query.topic_id;
        const notes = database_js_1.dbService.getNotes(userId, query, language, topicId);
        res.json({
            success: true,
            total: notes.length,
            notes
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch notes' });
    }
};
exports.getNotes = getNotes;
const createNote = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const { language, course_id, topic_id, subtopic_title, title, content } = req.body;
        if (!title || !content || !topic_id) {
            res.status(400).json({ error: 'title, content, and topic_id are required' });
            return;
        }
        const note = {
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
        database_js_1.dbService.addNote(note);
        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            note
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to create note' });
    }
};
exports.createNote = createNote;
const updateNote = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const { id } = req.params;
        const { title, content, subtopic_title } = req.body;
        const updated = database_js_1.dbService.updateNote(id, userId, { title, content, subtopic_title });
        if (!updated) {
            res.status(404).json({ error: 'Note not found or unauthorized' });
            return;
        }
        res.json({
            success: true,
            message: 'Note updated successfully',
            note: updated
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to update note' });
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const { id } = req.params;
        const removed = database_js_1.dbService.deleteNote(id, userId);
        if (!removed) {
            res.status(404).json({ error: 'Note not found or unauthorized' });
            return;
        }
        res.json({ success: true, message: 'Note deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to delete note' });
    }
};
exports.deleteNote = deleteNote;
