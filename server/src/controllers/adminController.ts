import { Request, Response } from 'express';
import { dbService } from '../db/database.js';

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

export const getAdminAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = dbService.getAdminStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMLModelMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    try {
      const resp = await fetch(`${ML_SERVICE_URL}/api/ml/metrics`);
      if (resp.ok) {
        const metrics = await resp.json();
        res.json(metrics);
        return;
      }
    } catch (e) {
      // Ignore and fallback to reading saved metrics.json directly from disk
    }

    // Try reading directly from models/metrics.json
    const fs = await import('fs');
    const path = await import('path');
    const metricsPath = path.resolve(process.cwd(), '../ml_service/models/metrics.json');
    if (fs.existsSync(metricsPath)) {
      const data = JSON.parse(fs.readFileSync(metricsPath, 'utf-8'));
      res.json(data);
      return;
    }

    res.status(404).json({ error: 'ML model metrics not available' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
