"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitProject = exports.getProjectDetail = exports.getProjects = void 0;
const database_js_1 = require("../db/database.js");
const projectEvaluator_js_1 = require("../services/projectEvaluator.js");
const integrityEngine_js_1 = require("../services/integrityEngine.js");
const getProjects = async (req, res) => {
    try {
        const { language, level } = req.query;
        const projects = database_js_1.dbService.getProjects(language ? language.toLowerCase() : undefined, level ? level.toLowerCase() : undefined);
        // Provide lightweight project summaries with milestone counts
        const summarized = projects.map(p => ({
            id: p.id,
            title: p.title,
            language: p.language,
            level: p.level,
            is_capstone: p.is_capstone,
            description: p.description,
            learning_objectives: p.learning_objectives,
            milestone_count: p.milestones.length,
            test_case_count: p.test_cases.length
        }));
        res.json({
            total: summarized.length,
            projects: summarized
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Something went wrong while retrieving projects. Please try again.' });
    }
};
exports.getProjects = getProjects;
const getProjectDetail = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = database_js_1.dbService.getProjectById(projectId);
        if (!project) {
            res.status(404).json({ error: 'Project not found.' });
            return;
        }
        res.json({ project });
    }
    catch (err) {
        res.status(500).json({ error: 'Something went wrong while retrieving project details. Please try again.' });
    }
};
exports.getProjectDetail = getProjectDetail;
const submitProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { code, completion_time_seconds, keystrokes, paste_events } = req.body;
        const userId = req.user?.id || 'guest_user';
        if (!code || typeof code !== 'string') {
            res.status(400).json({ error: 'Code content is required.' });
            return;
        }
        const project = database_js_1.dbService.getProjectById(projectId);
        if (!project) {
            res.status(404).json({ error: 'Project not found.' });
            return;
        }
        // 1. Evaluate Project across 6 criteria (Section 84)
        const evaluation = await projectEvaluator_js_1.projectEvaluator.evaluateProject(project, code, userId);
        // 2. Evaluate Integrity Signals (Section 94)
        const integrityResult = integrityEngine_js_1.integrityEngine.evaluateIntegrity({
            completion_time_seconds: completion_time_seconds || 60,
            keystrokes: keystrokes || 50,
            paste_events: paste_events || 0,
            code_length: code.length,
            current_score: evaluation.overall_score / 100
        });
        // 3. Save Submission in Database
        database_js_1.dbService.saveProjectEvaluation(evaluation);
        // 4. Achievement & Progress Unlocks
        if (evaluation.passed) {
            database_js_1.dbService.unlockAchievement(userId, 'FIRST_CODE');
            if (project.is_capstone) {
                database_js_1.dbService.unlockAchievement(userId, 'FIRST_TOPIC');
            }
        }
        res.json({
            success: true,
            evaluation,
            integrity: integrityResult
        });
    }
    catch (err) {
        console.error('Project submission error:', err);
        res.status(500).json({ error: 'Something went wrong while evaluating your project. Please try again.' });
    }
};
exports.submitProject = submitProject;
