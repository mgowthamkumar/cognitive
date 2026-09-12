"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBookmarkStatus = exports.deleteBookmark = exports.addBookmark = exports.getBookmarks = void 0;
const database_js_1 = require("../db/database.js");
const getBookmarks = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const itemType = req.query.type || 'all';
        const bookmarks = database_js_1.dbService.getBookmarks(userId, itemType);
        res.json({
            success: true,
            total: bookmarks.length,
            bookmarks
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to fetch bookmarks' });
    }
};
exports.getBookmarks = getBookmarks;
const addBookmark = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const { item_type, item_id, title, snippet, language, topic_id } = req.body;
        if (!item_type || !item_id || !title) {
            res.status(400).json({ error: 'item_type, item_id, and title are required' });
            return;
        }
        const bookmark = {
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
        database_js_1.dbService.addBookmark(bookmark);
        res.status(201).json({
            success: true,
            message: 'Item bookmarked successfully',
            bookmark
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to add bookmark' });
    }
};
exports.addBookmark = addBookmark;
const deleteBookmark = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const { id } = req.params;
        const removed = database_js_1.dbService.deleteBookmark(id, userId);
        if (!removed) {
            res.status(404).json({ error: 'Bookmark not found or unauthorized' });
            return;
        }
        res.json({ success: true, message: 'Bookmark removed successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to delete bookmark' });
    }
};
exports.deleteBookmark = deleteBookmark;
const checkBookmarkStatus = async (req, res) => {
    try {
        const userId = req.user?.id || 'anon-learner';
        const itemType = (req.query.item_type || req.query.itemType);
        const itemId = (req.query.item_id || req.query.itemId);
        if (!itemType || !itemId) {
            res.json({ is_bookmarked: false });
            return;
        }
        const isBookmarked = database_js_1.dbService.isBookmarked(userId, itemType, itemId);
        res.json({ is_bookmarked: isBookmarked });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to check bookmark status' });
    }
};
exports.checkBookmarkStatus = checkBookmarkStatus;
