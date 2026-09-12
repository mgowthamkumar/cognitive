import { Request, Response } from 'express';
import { dbService } from '../db/database.js';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { language, level } = req.query;
    const courses = dbService.getCourses(language as string, level as string);
    res.json(courses);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourseStructure = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const course = dbService.getCourseById(courseId);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    const modules = dbService.getModulesByCourse(courseId);
    const structure = modules.map(m => {
      const topics = dbService.getTopicsByModule(m.id);
      return {
        ...m,
        topics: topics.map(t => ({
          id: t.id,
          title: t.title,
          order_index: t.order_index,
          learning_objective: t.learning_objective,
          prerequisite_topic_id: t.prerequisite_topic_id
        }))
      };
    });

    res.json({
      course,
      modules: structure
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopicDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { topicId } = req.params;
    const topic = dbService.getTopicById(topicId);
    if (!topic) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }

    res.json(topic);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
