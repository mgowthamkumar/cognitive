import { Router } from 'express';
import * as authCtrl from '../controllers/authController.js';
import * as courseCtrl from '../controllers/courseController.js';
import * as quizCtrl from '../controllers/quizController.js';
import * as codeCtrl from '../controllers/codeController.js';
import * as behaviorCtrl from '../controllers/behaviorController.js';
import * as adaptiveCtrl from '../controllers/adaptiveController.js';
import * as aiCtrl from '../controllers/aiController.js';
import * as adminCtrl from '../controllers/adminController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Authentication
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.get('/auth/me', requireAuth, authCtrl.getMe);
router.post('/auth/preferences', requireAuth, authCtrl.updatePreferences);

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

// Admin & ML Analytics (Section 19)
router.get('/admin/analytics', adminCtrl.getAdminAnalytics);
router.get('/admin/ml-metrics', adminCtrl.getMLModelMetrics);
router.post('/admin/retrain-ml', adminCtrl.retrainMLModel);
router.post('/admin/reindex-rag', adminCtrl.reindexRAG);
router.post('/admin/run-diagnostics', adminCtrl.runSystemDiagnostics);

export default router;
