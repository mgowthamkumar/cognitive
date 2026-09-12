import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { codeSandbox } from '../services/codeSandbox.js';
import { adaptiveEngine } from '../services/adaptiveEngine.js';

export const getTopicCodingChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topicId } = req.params;
    const challenges = dbService.getCodingQuestionsByTopic(topicId);
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
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const runCode = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { code, language, custom_input } = req.body;
    if (!code || !language) {
      res.status(400).json({ error: 'Code and language are required' });
      return;
    }

    const testCase = [{ input: custom_input || '', expected_output: '', is_hidden: false }];
    const result = await codeSandbox.evaluateCode(code, language, testCase);

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const submitCode = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { topicId } = req.params;
    const { code, language, coding_time_seconds, keystrokes, paste_events } = req.body;
    const userId = req.user?.id || 'guest_user';

    if (!code || !language) {
      res.status(400).json({ error: 'Code and language are required' });
      return;
    }

    const challenges = dbService.getCodingQuestionsByTopic(topicId);
    if (!challenges.length) {
      res.status(404).json({ error: 'No coding challenge registered for this topic' });
      return;
    }

    const challenge = challenges[0];
    const execResult = await codeSandbox.evaluateCode(code, language, challenge.test_cases);

    const isPassed = execResult.status === 'PASSED';
    const hasError = execResult.status === 'COMPILE_ERROR' || execResult.status === 'RUNTIME_ERROR' || execResult.status === 'TIME_LIMIT_EXCEEDED';

    // Record coding attempt
    dbService.recordCodingAttempt({
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
    dbService.recordBehaviorEvent({
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
      dbService.markTopicCompleted(userId, topicId, 1.0);
    }

    // Adaptive evaluation
    const adaptiveFeedback = await adaptiveEngine.evaluateLearner(userId, topicId, language);

    res.json({
      execution: execResult,
      is_passed: isPassed,
      adaptive_feedback: adaptiveFeedback
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
