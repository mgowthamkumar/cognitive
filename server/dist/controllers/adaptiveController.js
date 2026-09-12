"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestRecommendation = exports.getCognitiveHistory = exports.evaluateAdaptive = void 0;
const database_js_1 = require("../db/database.js");
const adaptiveEngine_js_1 = require("../services/adaptiveEngine.js");
const evaluateAdaptive = async (req, res) => {
    try {
        const { topic_id, language } = req.body;
        const userId = req.user?.id || 'guest_user';
        if (!topic_id) {
            res.status(400).json({ error: 'topic_id is required' });
            return;
        }
        const evaluation = await adaptiveEngine_js_1.adaptiveEngine.evaluateLearner(userId, topic_id, language || 'python');
        res.json(evaluation);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.evaluateAdaptive = evaluateAdaptive;
const getCognitiveHistory = async (req, res) => {
    try {
        const userId = req.user?.id || 'guest_user';
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        const history = database_js_1.dbService.getCognitiveHistory(userId, limit);
        res.json(history);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getCognitiveHistory = getCognitiveHistory;
const getLatestRecommendation = async (req, res) => {
    try {
        const userId = req.user?.id || 'guest_user';
        const rec = database_js_1.dbService.getLatestRecommendation(userId);
        res.json(rec || null);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getLatestRecommendation = getLatestRecommendation;
