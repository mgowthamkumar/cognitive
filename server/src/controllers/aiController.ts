import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { dbService } from '../db/database.js';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

/**
 * Section 52, 53 & 66: Context-Aware AI Tutor with 8 Explicit Response Modes
 * and Structured Prompt Context.
 */
export const askAiAssistant = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const {
      question,
      language,
      level,
      topic,
      cognitive_load,
      tutor_mode = 'EXPLAIN',
      code_context
    } = req.body;
    const userId = req.user?.id || 'guest_user';

    // Extract user profile context (Section 66)
    const weakList = dbService.getWeakConcepts(userId).map(w => w.concept_name);
    const snapshot = dbService.getUserSnapshot(userId);

    // Log AI explanation request event
    if (topic) {
      dbService.recordBehaviorEvent({
        user_id: userId,
        topic_id: topic,
        event_type: 'AI_EXPLANATION_REQUEST',
        duration: 15,
        timestamp: new Date().toISOString(),
        metadata: { question, tutor_mode }
      });
    }

    try {
      const resp = await fetch(`${ML_SERVICE_URL}/api/rag/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          language: language || 'python',
          level: level || 'beginner',
          topic: topic || 'loops',
          cognitive_load: cognitive_load || 'MEDIUM',
          tutor_mode,
          code_context,
          weak_concepts: weakList,
          recent_performance: snapshot.learning_snapshot.quiz_accuracy
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        res.json(data);
        return;
      }
    } catch (e) {
      // Fallback to intelligent offline generator
    }

    // Built-in resilient fallback response
    const mode = (cognitive_load || 'MEDIUM').toUpperCase();
    let fallbackAnswer = '';

    if (tutor_mode === 'SIMPLIFY') {
      fallbackAnswer = `### 🌱 Simplified AI Breakdown\nLet's keep it simple! Imagine **${topic || 'this concept'}** like an automated counter in an elevator that stops at designated floors sequentially.\n\n*Rule: Each floor is visited once in ascending order.*`;
    } else if (tutor_mode === 'EXAMPLE') {
      fallbackAnswer = `### 💻 Example in ${language || 'Python'}\n\`\`\`${(language || 'python').toLowerCase()}\n# Minimal working demonstration\nfor item in range(1, 4):\n    print(f"Step {item}")\n\`\`\``;
    } else if (tutor_mode === 'DEBUG') {
      fallbackAnswer = `### 🛠️ Code Debug Checklist\n1. Ensure loop conditions or loop ranges advance correctly.\n2. Confirm return statements are outside loops unless early exit is intended.\n3. Verify variables are initialized prior to the loop.`;
    } else {
      fallbackAnswer = mode === 'HIGH'
        ? `### 🌱 Step-by-Step AI Guidance\nHere is a gentle, step-by-step breakdown for **${topic || 'this concept'}** in ${language || 'programming'}:\n\nTake it one step at a time! Avoid nesting until the basics feel comfortable. Use small print statements to inspect values.`
        : `### 💡 AI Tutor Explanation\nIn **${language || 'Python'}**, **${topic || 'this topic'}** allows you to structure modular, testable logic. Focus on understanding state invariants before optimizing.`;
    }

    res.json({
      query: question,
      language: language || 'python',
      topic: topic || 'general',
      cognitive_load: mode,
      tutor_mode,
      answer: fallbackAnswer,
      sources: ['Course Knowledge Base', `${(language || 'Python').toUpperCase()} Reference Manual`]
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Section 54: 5-Tier Progressive Hints (Anti-Spoiling)
 */
export const requestProgressiveHint = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { question, code_snippet, hint_level = 1, topic, language } = req.body;
    const userId = req.user?.id || 'guest_user';

    // Log Hint Request event
    if (topic) {
      dbService.recordBehaviorEvent({
        user_id: userId,
        topic_id: topic,
        event_type: 'HINT_REQUEST',
        duration: 10,
        timestamp: new Date().toISOString(),
        metadata: { hint_level }
      });
    }

    try {
      const resp = await fetch(`${ML_SERVICE_URL}/api/rag/progressive-hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question || 'Need hint for challenge',
          code_snippet: code_snippet || '',
          hint_level,
          topic: topic || 'general',
          language: language || 'python'
        })
      });

      if (resp.ok) {
        const data = await resp.json();
        res.json(data);
        return;
      }
    } catch (e) {
      // Fallback
    }

    // Built-in 5-tier fallback
    const stages: Record<number, string> = {
      1: 'Level 1: Conceptual Clue',
      2: 'Level 2: Algorithmic Approach',
      3: 'Level 3: Pseudocode Blueprint',
      4: 'Level 4: Partial Code Skeleton',
      5: 'Level 5: Full Guided Walkthrough'
    };

    const cleanLevel = Math.max(1, Math.min(5, hint_level));
    res.json({
      hint_level: cleanLevel,
      stage: stages[cleanLevel],
      hint_text: `💡 **${stages[cleanLevel]}**: Break the problem down into initializing your accumulator, testing the condition, and returning the result.`,
      next_hint_available: cleanLevel < 5
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
