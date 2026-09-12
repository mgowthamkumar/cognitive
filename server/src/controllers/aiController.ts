import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { dbService } from '../db/database.js';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

export const askAiAssistant = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { question, language, level, topic, cognitive_load } = req.body;
    const userId = req.user?.id || 'guest_user';

    // Log AI explanation request event
    if (topic) {
      dbService.recordBehaviorEvent({
        user_id: userId,
        topic_id: topic,
        event_type: 'AI_EXPLANATION_REQUEST',
        duration: 15,
        timestamp: new Date().toISOString(),
        metadata: { question }
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
          cognitive_load: cognitive_load || 'MEDIUM'
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

    // Built-in resilient fallback response
    const mode = (cognitive_load || 'MEDIUM').toUpperCase();
    const fallbackAnswer = mode === 'HIGH'
      ? `### 🌱 Step-by-Step AI Guidance\nHere is a simple breakdown for **${topic || 'this concept'}** in ${language || 'programming'}:\n\nThink of this like a stepwise recipe where each step must finish before the next begins. Avoid nested loops when learning, and use simple print statements to inspect variables.\n\n*Would you like a conceptual hint or a practice exercise?*`
      : `### 💡 AI Tutor Explanation\nIn **${language || 'Python'}**, **${topic || 'this topic'}** allows you to structure modular, testable logic. Focus on understanding the loop invariants and variable states before running your code.`;

    res.json({
      query: question,
      language: language || 'python',
      topic: topic || 'general',
      cognitive_load: mode,
      answer: fallbackAnswer,
      sources: ['Course Curriculum Reference', 'Core Knowledge Base']
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const requestProgressiveHint = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { question, code_snippet, hint_level, topic, language } = req.body;
    const userId = req.user?.id || 'guest_user';

    // Log Hint Request event
    if (topic) {
      dbService.recordBehaviorEvent({
        user_id: userId,
        topic_id: topic,
        event_type: 'HINT_REQUEST',
        duration: 10,
        timestamp: new Date().toISOString(),
        metadata: { hint_level: hint_level || 1 }
      });
    }

    try {
      const resp = await fetch(`${ML_SERVICE_URL}/api/rag/progressive-hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question || 'Need hint for challenge',
          code_snippet: code_snippet || '',
          hint_level: hint_level || 1,
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

    // Progressive fallback
    const level = hint_level || 1;
    const stages: Record<number, string> = {
      1: '💡 Conceptual Clue: Identify which variable represents the accumulator, and how it updates on each step.',
      2: '🧭 Algorithmic Strategy: Loop through standard input, parse numbers, filter by condition, and return total.',
      3: '📝 Pseudocode Blueprint: FOR each number in input: IF number is valid, THEN add to total. RETURN total.',
      4: '🧩 Code Skeleton: def solve(): total = 0; for x in nums: if ...: total += x; return total'
    };

    res.json({
      hint_level: level,
      stage: `Tier ${level} Progressive Hint`,
      hint_text: stages[level] || stages[1],
      next_hint_available: level < 4
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
