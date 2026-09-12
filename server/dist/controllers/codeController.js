"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitCode = exports.runCode = exports.getTopicCodingChallenge = void 0;
const database_js_1 = require("../db/database.js");
const codeSandbox_js_1 = require("../services/codeSandbox.js");
const adaptiveEngine_js_1 = require("../services/adaptiveEngine.js");
const getTopicCodingChallenge = async (req, res) => {
    try {
        const { topicId } = req.params;
        const challenges = database_js_1.dbService.getCodingQuestionsByTopic(topicId);
        if (!challenges.length) {
            res.status(404).json({ error: 'No coding challenge found for this topic' });
            return;
        }
        const challenge = challenges[0];
        // Return with only non-hidden test cases visible in UI
        res.json({
            ...challenge,
            test_cases: challenge.test_cases.filter(t => !t.is_hidden)
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTopicCodingChallenge = getTopicCodingChallenge;
const runCode = async (req, res) => {
    try {
        const { code, language, custom_input } = req.body;
        if (!code || !language) {
            res.status(400).json({ error: 'Code and language are required' });
            return;
        }
        const testCase = [{ input: custom_input || '', expected_output: '', is_hidden: false }];
        const result = await codeSandbox_js_1.codeSandbox.evaluateCode(code, language, testCase);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.runCode = runCode;
const submitCode = async (req, res) => {
    try {
        const topicId = req.params.topicId || req.body.topicId || req.body.topic_id;
        const { code, language, coding_time_seconds, keystrokes, paste_events } = req.body;
        const userId = req.user?.id || 'guest_user';
        if (!code || !language) {
            res.status(400).json({ error: 'Code and language are required' });
            return;
        }
        const challenges = database_js_1.dbService.getCodingQuestionsByTopic(topicId);
        if (!challenges.length) {
            res.status(404).json({ error: 'No coding challenge registered for this topic' });
            return;
        }
        const challenge = challenges[0];
        const execResult = await codeSandbox_js_1.codeSandbox.evaluateCode(code, language, challenge.test_cases);
        const isPassed = execResult.status === 'PASSED';
        const hasError = execResult.status === 'COMPILE_ERROR' || execResult.status === 'RUNTIME_ERROR' || execResult.status === 'TIME_LIMIT_EXCEEDED';
        // Record coding attempt
        database_js_1.dbService.recordCodingAttempt({
            id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            user_id: userId,
            topic_id: topicId,
            code,
            passed: isPassed ? 1 : 0,
            execution_time: execResult.execution_time_ms,
            error_count: hasError ? 1 : 0,
            timestamp: new Date().toISOString()
        });
        // Record behavioral telemetry event
        database_js_1.dbService.recordBehaviorEvent({
            user_id: userId,
            topic_id: topicId,
            event_type: 'CODE_SUBMIT',
            duration: coding_time_seconds || 60,
            timestamp: new Date().toISOString(),
            metadata: {
                has_error: hasError,
                status: execResult.status,
                passed: isPassed,
                keystrokes: keystrokes || 50,
                paste_events: paste_events || 0
            }
        });
        if (isPassed) {
            database_js_1.dbService.markTopicCompleted(userId, topicId, 1.0);
            database_js_1.dbService.unlockAchievement(userId, 'FIRST_CODE');
        }
        else if (execResult.recommended_review_concept) {
            database_js_1.dbService.recordWeakConcept({
                userId,
                conceptName: execResult.recommended_review_concept,
                topicId,
                language,
                isError: true
            });
        }
        // Adaptive evaluation
        const adaptiveFeedback = await adaptiveEngine_js_1.adaptiveEngine.evaluateLearner(userId, topicId, language);
        res.json({
            execution: execResult,
            error_classification: execResult.error_category ? {
                category: execResult.error_category,
                diagnosis: execResult.error_diagnosis,
                recommended_review_concept: execResult.recommended_review_concept
            } : null,
            is_passed: isPassed,
            adaptive_feedback: adaptiveFeedback
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.submitCode = submitCode;
