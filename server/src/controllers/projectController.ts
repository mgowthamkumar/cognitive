import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { projectEvaluator } from '../services/projectEvaluator.js';
import { integrityEngine } from '../services/integrityEngine.js';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, level } = req.query;
    const projects = dbService.getProjects(
      language ? (language as string).toLowerCase() : undefined,
      level ? (level as string).toLowerCase() : undefined
    );

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
  } catch (err: any) {
    res.status(500).json({ error: 'Something went wrong while retrieving projects. Please try again.' });
  }
};

export const getProjectDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;
    const project = dbService.getProjectById(projectId);

    if (!project) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    res.json({ project });
  } catch (err: any) {
    res.status(500).json({ error: 'Something went wrong while retrieving project details. Please try again.' });
  }
};

export const submitProject = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { projectId } = req.params;
    const { code, completion_time_seconds, keystrokes, paste_events } = req.body;
    const userId = req.user?.id || 'guest_user';

    if (!code || typeof code !== 'string') {
      res.status(400).json({ error: 'Code content is required.' });
      return;
    }

    const project = dbService.getProjectById(projectId);
    if (!project) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    // 1. Evaluate Project across 6 criteria (Section 84)
    const evaluation = await projectEvaluator.evaluateProject(project, code, userId);

    // 2. Evaluate Integrity Signals (Section 94)
    const integrityResult = integrityEngine.evaluateIntegrity({
      completion_time_seconds: completion_time_seconds || 60,
      keystrokes: keystrokes || 50,
      paste_events: paste_events || 0,
      code_length: code.length,
      current_score: evaluation.overall_score / 100
    });

    // 3. Save Submission in Database
    dbService.saveProjectEvaluation(evaluation);

    // 4. Achievement & Progress Unlocks
    if (evaluation.passed) {
      dbService.unlockAchievement(userId, 'FIRST_CODE');
      if (project.is_capstone) {
        dbService.unlockAchievement(userId, 'FIRST_TOPIC');
      }
    }

    res.json({
      success: true,
      evaluation,
      integrity: integrityResult
    });
  } catch (err: any) {
    console.error('Project submission error:', err);
    res.status(500).json({ error: 'Something went wrong while evaluating your project. Please try again.' });
  }
};
