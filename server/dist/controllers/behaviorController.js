"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionEvents = exports.logBehaviorEvent = void 0;
const database_js_1 = require("../db/database.js");
const logBehaviorEvent = async (req, res) => {
    try {
        const { topic_id, event_type, duration, metadata } = req.body;
        const userId = req.user?.id || req.body.user_id || 'anonymous_learner';
        if (!topic_id || !event_type) {
            res.status(400).json({ error: 'topic_id and event_type are required' });
            return;
        }
        const event = {
            user_id: userId,
            topic_id,
            event_type,
            duration: duration || 0,
            timestamp: new Date().toISOString(),
            metadata: metadata || {}
        };
        database_js_1.dbService.recordBehaviorEvent(event);
        res.status(201).json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.logBehaviorEvent = logBehaviorEvent;
const getSessionEvents = async (req, res) => {
    try {
        const { topicId } = req.params;
        const userId = req.user?.id || 'guest_user';
        const events = database_js_1.dbService.getTopicBehaviorSession(userId, topicId);
        res.json(events);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSessionEvents = getSessionEvents;
