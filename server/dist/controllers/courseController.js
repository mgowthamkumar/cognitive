"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicDetail = exports.getCourseStructure = exports.getCourses = void 0;
const database_js_1 = require("../db/database.js");
const getCourses = async (req, res) => {
    try {
        const { language, level } = req.query;
        const courses = database_js_1.dbService.getCourses(language, level);
        res.json(courses);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getCourses = getCourses;
const getCourseStructure = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = database_js_1.dbService.getCourseById(courseId);
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
            return;
        }
        const modules = database_js_1.dbService.getModulesByCourse(courseId);
        const structure = modules.map(m => {
            const topics = database_js_1.dbService.getTopicsByModule(m.id);
            return {
                ...m,
                topics: topics.map(t => ({
                    id: t.id,
                    title: t.title,
                    order_index: t.order_index,
                    learning_objective: t.learning_objective,
                    prerequisite_topic_id: t.prerequisite_topic_id
                }))
            };
        });
        res.json({
            course,
            modules: structure
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getCourseStructure = getCourseStructure;
const getTopicDetail = async (req, res) => {
    try {
        const { topicId } = req.params;
        const topic = database_js_1.dbService.getTopicById(topicId);
        if (!topic) {
            res.status(404).json({ error: 'Topic not found' });
            return;
        }
        res.json(topic);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTopicDetail = getTopicDetail;
