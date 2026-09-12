"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatformStats = exports.submitContentFeedback = exports.getLanguageRoadmap = exports.getDashboardSnapshot = void 0;
const database_js_1 = require("../db/database.js");
const getDashboardSnapshot = async (req, res) => {
    try {
        const userId = req.user?.id || 'guest_user';
        const snapshot = database_js_1.dbService.getUserSnapshot(userId);
        const langProgress = database_js_1.dbService.getLanguageProgress(userId);
        const weakConcepts = database_js_1.dbService.getWeakConcepts(userId);
        const achievements = database_js_1.dbService.getUserAchievements(userId);
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getDashboardSnapshot = getDashboardSnapshot;
const getLanguageRoadmap = async (req, res) => {
    try {
        const { language } = req.params;
        const userId = req.user?.id || 'guest_user';
        const roadmap = database_js_1.dbService.getRoadmap(language || 'python', userId);
        res.json({
            language: language || 'python',
            roadmap
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getLanguageRoadmap = getLanguageRoadmap;
const submitContentFeedback = async (req, res) => {
    try {
        const { topic_id, feedback, comment } = req.body;
        const userId = req.user?.id || 'guest_user';
        if (!topic_id || !feedback) {
            res.status(400).json({ error: 'topic_id and feedback ("yes" | "somewhat" | "no") are required' });
            return;
        }
        database_js_1.dbService.saveContentFeedback({
            id: `fb_${Date.now()}`,
            user_id: userId,
            topic_id,
            feedback,
            comment,
            created_at: new Date().toISOString()
        });
        res.json({ success: true, status: 'success', message: 'Thank you for your feedback!' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.submitContentFeedback = submitContentFeedback;
const getPlatformStats = async (req, res) => {
    try {
        const stats = database_js_1.dbService.getPlatformStats();
        res.json(stats);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getPlatformStats = getPlatformStats;
