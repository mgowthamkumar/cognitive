"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitTopicQuiz = exports.getTopicQuiz = void 0;
const database_js_1 = require("../db/database.js");
const adaptiveEngine_js_1 = require("../services/adaptiveEngine.js");
/**
 * Section 55 & 56: Smart Quiz Engine with Dynamic Question Selection and Difficulty Adaptation
 */
const getTopicQuiz = async (req, res) => {
    try {
        const { topicId } = req.params;
        const userId = req.user?.id || 'guest_user';
        const requestedDiff = req.query.difficulty?.toLowerCase();
        const allQuestions = database_js_1.dbService.getMCQsByTopic(topicId);
        if (!allQuestions.length) {
            res.status(404).json({ error: 'No questions found for this topic' });
            return;
        }
        // Inspect user's recent cognitive predictions and quiz history
        const recentPredictions = database_js_1.dbService.getCognitivePredictionHistory(userId, 1);
        const cognitiveState = recentPredictions[0]?.cognitive_load || 'MEDIUM';
        // Check consecutive streaks
        const recentAttempts = database_js_1.dbService.getTopicBehaviorSession(userId, topicId)
            .filter(e => e.event_type === 'MCQ_SUBMIT')
            .slice(-3);
        const consecutiveCorrect = recentAttempts.filter(e => e.metadata?.score >= 0.8).length;
        const consecutiveWrong = recentAttempts.filter(e => e.metadata?.score < 0.5).length;
        // Dynamic Difficulty Determination (Section 56)
        let targetDifficulty = 'medium';
        let difficultyNote = 'Standard adaptive difficulty';
        if (requestedDiff === 'easy' || requestedDiff === 'medium' || requestedDiff === 'hard') {
            targetDifficulty = requestedDiff;
            difficultyNote = `Manual selection: ${requestedDiff.toUpperCase()}`;
        }
        else if (cognitiveState === 'HIGH' || consecutiveWrong >= 2) {
            targetDifficulty = 'easy';
            difficultyNote = 'Difficulty eased to rebuild foundational confidence (High Cognitive Load detected)';
        }
        else if (cognitiveState === 'LOW' || consecutiveCorrect >= 3) {
            targetDifficulty = 'hard';
            difficultyNote = 'Advanced challenges unlocked (3+ consecutive high-accuracy completions!)';
        }
        // Smart Selection: match target difficulty first, then backfill
        let selectedQuestions = allQuestions.filter(q => q.difficulty === targetDifficulty);
        if (selectedQuestions.length < 3) {
            const others = allQuestions.filter(q => q.difficulty !== targetDifficulty);
            selectedQuestions = [...selectedQuestions, ...others].slice(0, 4);
        }
        else {
            selectedQuestions = selectedQuestions.slice(0, 4);
        }
        // Omit correct_index and explanation for quiz taking phase
        const sanitized = selectedQuestions.map(q => ({
            id: q.id,
            topic_id: q.topic_id,
            difficulty: q.difficulty,
            question: q.question,
            options: q.options
        }));
        res.json({
            questions: sanitized,
            target_difficulty: targetDifficulty,
            adaptive_note: difficultyNote,
            consecutive_correct: consecutiveCorrect,
            consecutive_wrong: consecutiveWrong
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getTopicQuiz = getTopicQuiz;
const submitTopicQuiz = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { answers, time_spent } = req.body; // answers: { [questionId]: selectedIndex }
        const userId = req.user?.id || 'guest_user';
        const allQuestions = database_js_1.dbService.getMCQsByTopic(topicId);
        if (!allQuestions.length) {
            res.status(404).json({ error: 'No questions found for this topic' });
            return;
        }
        // Grade only the questions that were part of this quiz session
        const questionsToGrade = Object.keys(answers || {}).length > 0
            ? allQuestions.filter(q => answers[q.id] !== undefined)
            : allQuestions.slice(0, 3);
        const activeList = questionsToGrade.length > 0 ? questionsToGrade : allQuestions;
        let correctCount = 0;
        const review = activeList.map(q => {
            const selected = answers ? answers[q.id] : undefined;
            const isCorrect = selected === q.correct_index;
            if (isCorrect)
                correctCount++;
            return {
                id: q.id,
                question: q.question,
                options: q.options,
                selected_index: selected,
                correct_index: q.correct_index,
                is_correct: isCorrect,
                explanation: q.explanation
            };
        });
        const score = correctCount / (activeList.length || 1);
        const passed = score >= 0.6;
        // Record quiz attempt
        database_js_1.dbService.recordQuizAttempt({
            id: `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            user_id: userId,
            topic_id: topicId,
            score,
            time_spent: time_spent || 30,
            passed: passed ? 1 : 0,
            timestamp: new Date().toISOString()
        });
        // Record behavioral telemetry event for MCQ submission
        database_js_1.dbService.recordBehaviorEvent({
            user_id: userId,
            topic_id: topicId,
            event_type: 'MCQ_SUBMIT',
            duration: time_spent || 30,
            timestamp: new Date().toISOString(),
            metadata: { score, accuracy: score, passed }
        });
        // Spaced Revision Tracking (Section 60)
        database_js_1.dbService.scheduleSpacedRevision(userId, topicId, score);
        const topic = database_js_1.dbService.getTopicById(topicId);
        if (passed) {
            database_js_1.dbService.markTopicCompleted(userId, topicId, score);
            if (score >= 0.9) {
                database_js_1.dbService.unlockAchievement(userId, 'QUIZ_MASTER');
            }
        }
        else {
            // Weak Concept Detection (Section 59)
            database_js_1.dbService.recordWeakConcept({
                userId,
                conceptName: topic?.title || 'Quiz Assessment',
                topicId,
                language: 'python',
                isFailure: true
            });
        }
        // Automatically trigger Adaptive Engine evaluation
        const adaptiveFeedback = await adaptiveEngine_js_1.adaptiveEngine.evaluateLearner(userId, topicId, 'python');
        res.json({
            score: Math.round(score * 100),
            passed,
            correct_count: correctCount,
            total_questions: activeList.length,
            review,
            adaptive_feedback: adaptiveFeedback
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.submitTopicQuiz = submitTopicQuiz;
