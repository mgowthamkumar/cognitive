import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { adaptiveEngine } from '../services/adaptiveEngine.js';

export const getTopicQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topicId } = req.params;
    const questions = dbService.getMCQsByTopic(topicId);
    
    // Omit correct_index and explanation for quiz taking phase
    const sanitized = questions.map(q => ({
      id: q.id,
      topic_id: q.topic_id,
      difficulty: q.difficulty,
      question: q.question,
      options: q.options
    }));

    res.json(sanitized);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const submitTopicQuiz = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { topicId } = req.params;
    const { answers, time_spent } = req.body; // answers: { [questionId]: selectedIndex }
    const userId = req.user?.id || 'guest_user';

    const questions = dbService.getMCQsByTopic(topicId);
    if (!questions.length) {
      res.status(404).json({ error: 'No questions found for this topic' });
      return;
    }

    let correctCount = 0;
    const review = questions.map(q => {
      const selected = answers ? answers[q.id] : undefined;
      const isCorrect = selected === q.correct_index;
      if (isCorrect) correctCount++;

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

    const score = correctCount / questions.length;
    const passed = score >= 0.6;

    // Record quiz attempt
    dbService.recordQuizAttempt({
      id: `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      user_id: userId,
      topic_id: topicId,
      score,
      time_spent: time_spent || 30,
      passed: passed ? 1 : 0,
      timestamp: new Date().toISOString()
    });

    // Record telemetry event for MCQ submission
    dbService.recordBehaviorEvent({
      user_id: userId,
      topic_id: topicId,
      event_type: 'MCQ_SUBMIT',
      duration: time_spent || 30,
      timestamp: new Date().toISOString(),
      metadata: { score, accuracy: score, passed }
    });

    if (passed) {
      dbService.markTopicCompleted(userId, topicId, score);
    }

    // Automatically trigger Adaptive Engine evaluation to compute real-time cognitive feedback
    const topic = dbService.getTopicById(topicId);
    const adaptiveFeedback = await adaptiveEngine.evaluateLearner(userId, topicId, 'python');

    res.json({
      score: Math.round(score * 100),
      passed,
      correct_count: correctCount,
      total_questions: questions.length,
      review,
      adaptive_feedback: adaptiveFeedback
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
