"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authCtrl = __importStar(require("../controllers/authController.js"));
const courseCtrl = __importStar(require("../controllers/courseController.js"));
const quizCtrl = __importStar(require("../controllers/quizController.js"));
const codeCtrl = __importStar(require("../controllers/codeController.js"));
const behaviorCtrl = __importStar(require("../controllers/behaviorController.js"));
const adaptiveCtrl = __importStar(require("../controllers/adaptiveController.js"));
const aiCtrl = __importStar(require("../controllers/aiController.js"));
const adminCtrl = __importStar(require("../controllers/adminController.js"));
const dashboardCtrl = __importStar(require("../controllers/dashboardController.js"));
const projectCtrl = __importStar(require("../controllers/projectController.js"));
const diagnosticCtrl = __importStar(require("../controllers/diagnosticController.js"));
const searchCtrl = __importStar(require("../controllers/searchController.js"));
const bookmarkCtrl = __importStar(require("../controllers/bookmarkController.js"));
const noteCtrl = __importStar(require("../controllers/noteController.js"));
const historyCtrl = __importStar(require("../controllers/historyController.js"));
const auth_js_1 = require("../middleware/auth.js");
const router = (0, express_1.Router)();
// Platform Public Statistics (Section 43)
router.get('/stats/platform', dashboardCtrl.getPlatformStats);
// Authentication
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.get('/auth/me', auth_js_1.requireAuth, authCtrl.getMe);
router.post('/auth/preferences', auth_js_1.requireAuth, authCtrl.updatePreferences);
// Personalized Dashboard & Visual Roadmaps (Section 44, 46)
router.get('/dashboard/snapshot', dashboardCtrl.getDashboardSnapshot);
router.get('/dashboard/roadmap/:language', dashboardCtrl.getLanguageRoadmap);
router.post('/feedback/submit', dashboardCtrl.submitContentFeedback);
// Courses & Topics
router.get('/courses', courseCtrl.getCourses);
router.get('/courses/:courseId', courseCtrl.getCourseStructure);
router.get('/topics/:topicId', courseCtrl.getTopicDetail);
// Quizzes
router.get('/topics/:topicId/quiz', quizCtrl.getTopicQuiz);
router.post('/topics/:topicId/quiz/submit', quizCtrl.submitTopicQuiz);
// Sandboxed Code Execution
router.get('/topics/:topicId/coding', codeCtrl.getTopicCodingChallenge);
router.post('/code/run', codeCtrl.runCode);
router.post('/code/submit', codeCtrl.submitCode);
// Telemetry & Behavioral Tracking (Section 23)
router.post('/behavior/event', behaviorCtrl.logBehaviorEvent);
router.get('/behavior/session/:topicId', behaviorCtrl.getSessionEvents);
// Adaptive Learning Engine (Section 16)
router.post('/adaptive/evaluate', adaptiveCtrl.evaluateAdaptive);
router.get('/adaptive/history', adaptiveCtrl.getCognitiveHistory);
router.get('/adaptive/recommendation', adaptiveCtrl.getLatestRecommendation);
// AI Learning Assistant & Progressive Hints (Section 14)
router.post('/ai/ask', aiCtrl.askAiAssistant);
router.post('/ai/hint', aiCtrl.requestProgressiveHint);
// Project-Based Learning & Capstones (Sections 82 & 83)
router.get('/projects', projectCtrl.getProjects);
router.get('/projects/:projectId', projectCtrl.getProjectDetail);
router.post('/projects/:projectId/submit', projectCtrl.submitProject);
// Diagnostic Assessment (Section 109)
router.get('/diagnostic/:language/questions', diagnosticCtrl.getDiagnosticQuestions);
router.post('/diagnostic/:language/submit', diagnosticCtrl.submitDiagnostic);
// Global Search System with Synonyms (Section 111)
router.get('/search', searchCtrl.globalSearch);
// Bookmarking System (Section 112)
router.get('/bookmarks', bookmarkCtrl.getBookmarks);
router.post('/bookmarks', bookmarkCtrl.addBookmark);
router.delete('/bookmarks/:id', bookmarkCtrl.deleteBookmark);
router.get('/bookmarks/check', bookmarkCtrl.checkBookmarkStatus);
// Personal Notes System (Section 113)
router.get('/notes', noteCtrl.getNotes);
router.post('/notes', noteCtrl.createNote);
router.put('/notes/:id', noteCtrl.updateNote);
router.delete('/notes/:id', noteCtrl.deleteNote);
// Detailed Learning History & Improvement (Section 114)
router.get('/learning-history', historyCtrl.getLearningHistory);
// Admin & ML Analytics (Section 19)
router.get('/admin/analytics', adminCtrl.getAdminAnalytics);
router.get('/admin/ml-metrics', adminCtrl.getMLModelMetrics);
router.post('/admin/retrain-ml', adminCtrl.retrainMLModel);
router.post('/admin/reindex-rag', adminCtrl.reindexRAG);
router.post('/admin/run-diagnostics', adminCtrl.runSystemDiagnostics);
exports.default = router;
