"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitDiagnostic = exports.getDiagnosticQuestions = void 0;
const diagnosticData_js_1 = require("../data/diagnosticData.js");
const database_js_1 = require("../db/database.js");
/**
 * Section 109: Diagnostic Assessment Controller
 */
const getDiagnosticQuestions = async (req, res) => {
    try {
        const { language } = req.params;
        const targetLang = (language || 'python').toLowerCase();
        let questions = diagnosticData_js_1.initialDiagnosticQuestions.filter(q => q.language === targetLang);
        if (questions.length === 0) {
            questions = diagnosticData_js_1.initialDiagnosticQuestions.filter(q => q.language === 'python');
        }
        // Omit correct_index and explanation for security prior to submission
        const sanitized = questions.map(q => ({
            id: q.id,
            language: q.language,
            category: q.category,
            question: q.question,
            code_snippet: q.code_snippet,
            options: q.options,
            difficulty_weight: q.difficulty_weight
        }));
        res.json({
            language: targetLang,
            total_questions: sanitized.length,
            categories: ['concept', 'problem_solving', 'coding_ability'],
            questions: sanitized
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to load diagnostic assessment' });
    }
};
exports.getDiagnosticQuestions = getDiagnosticQuestions;
const submitDiagnostic = async (req, res) => {
    try {
        const { language } = req.params;
        const { answers } = req.body; // { question_id: selected_index }
        const userId = req.user?.id || 'anon-learner';
        const targetLang = (language || 'python').toLowerCase();
        const questions = diagnosticData_js_1.initialDiagnosticQuestions.filter(q => q.language === targetLang);
        if (!answers || typeof answers !== 'object') {
            res.status(400).json({ error: 'Answers payload must be an object of question IDs to option indices' });
            return;
        }
        let conceptTotal = 0;
        let conceptCorrect = 0;
        let problemTotal = 0;
        let problemCorrect = 0;
        let codingTotal = 0;
        let codingCorrect = 0;
        const questionResults = questions.map(q => {
            const selectedIndex = answers[q.id];
            const isCorrect = selectedIndex === q.correct_index;
            if (q.category === 'concept') {
                conceptTotal++;
                if (isCorrect)
                    conceptCorrect++;
            }
            else if (q.category === 'problem_solving') {
                problemTotal++;
                if (isCorrect)
                    problemCorrect++;
            }
            else if (q.category === 'coding_ability') {
                codingTotal++;
                if (isCorrect)
                    codingCorrect++;
            }
            return {
                id: q.id,
                category: q.category,
                is_correct: isCorrect,
                user_choice: selectedIndex,
                correct_index: q.correct_index,
                explanation: q.explanation
            };
        });
        const totalQuestions = questions.length || 1;
        const totalCorrect = conceptCorrect + problemCorrect + codingCorrect;
        const totalScore = Math.round((totalCorrect / totalQuestions) * 100);
        const conceptScore = conceptTotal > 0 ? Math.round((conceptCorrect / conceptTotal) * 100) : 75;
        const problemSolvingScore = problemTotal > 0 ? Math.round((problemCorrect / problemTotal) * 100) : 70;
        const codingScore = codingTotal > 0 ? Math.round((codingCorrect / codingTotal) * 100) : 65;
        let recommendedLevel = 'beginner';
        let startingTopicId = 'top-py-fundamentals';
        if (targetLang === 'python') {
            if (totalScore >= 80) {
                recommendedLevel = 'advanced';
                startingTopicId = 'top-py-modules-regex';
            }
            else if (totalScore >= 50) {
                recommendedLevel = 'intermediate';
                startingTopicId = 'top-py-lists';
            }
            else {
                recommendedLevel = 'beginner';
                startingTopicId = 'top-py-fundamentals';
            }
        }
        else if (targetLang === 'c') {
            if (totalScore >= 75) {
                recommendedLevel = 'advanced';
                startingTopicId = 'top-c-malloc';
            }
            else {
                recommendedLevel = totalScore >= 45 ? 'intermediate' : 'beginner';
                startingTopicId = 'top-c-pointers';
            }
        }
        else if (targetLang === 'cpp') {
            recommendedLevel = totalScore >= 60 ? 'intermediate' : 'beginner';
            startingTopicId = 'top-cpp-oop';
        }
        else if (targetLang === 'java') {
            recommendedLevel = totalScore >= 60 ? 'intermediate' : 'beginner';
            startingTopicId = 'top-java-oop';
        }
        const diagnosticResult = {
            language: targetLang,
            total_score: totalScore,
            concept_score: conceptScore,
            problem_solving_score: problemSolvingScore,
            coding_score: codingScore,
            recommended_level: recommendedLevel,
            starting_topic_id: startingTopicId,
            evaluated_at: new Date().toISOString()
        };
        // Persist diagnostic result to user preferences
        if (userId && userId !== 'anon-learner') {
            const currentPrefs = database_js_1.dbService.getUserPreferences(userId);
            const updatedPrefs = {
                ...currentPrefs,
                selected_language: targetLang,
                current_level: recommendedLevel,
                diagnostic_completed: true,
                diagnostic_result: diagnosticResult
            };
            database_js_1.dbService.saveUserPreferences(updatedPrefs);
        }
        res.json({
            success: true,
            diagnostic_result: diagnosticResult,
            question_breakdown: questionResults,
            message: `Diagnostic test complete! Recommended starting point: ${recommendedLevel.toUpperCase()} track.`
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Failed to submit diagnostic assessment' });
    }
};
exports.submitDiagnostic = submitDiagnostic;
