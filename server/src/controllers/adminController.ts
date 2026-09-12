import { Request, Response } from 'express';
import { dbService } from '../db/database.js';
import { spawn } from 'child_process';
import path from 'path';

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

export const retrainMLModel = async (req: Request, res: Response): Promise<void> => {
  try {
    const resp = await fetch(`${ML_SERVICE_URL}/api/ml/retrain`, {
      method: 'POST'
    });
    if (!resp.ok) {
      const err = await resp.text();
      res.status(500).json({ error: `ML Service retraining error: ${err}` });
      return;
    }
    const data = await resp.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const reindexRAG = async (req: Request, res: Response): Promise<void> => {
  try {
    const resp = await fetch(`${ML_SERVICE_URL}/api/rag/reindex`, {
      method: 'POST'
    });
    if (!resp.ok) {
      const err = await resp.text();
      res.status(500).json({ error: `RAG re-index error: ${err}` });
      return;
    }
    const data = await resp.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const runSystemDiagnostics = async (req: Request, res: Response): Promise<void> => {
  try {
    const rootDir = path.resolve(process.cwd(), '..');
    const proc = spawn('python', ['scripts/verify_platform.py'], {
      cwd: rootDir,
      shell: true,
      windowsHide: true,
      env: { ...process.env, PYTHONIOENCODING: 'utf-8' }
    });

    let output = '';
    proc.stdout?.on('data', d => { output += d.toString(); });
    proc.stderr?.on('data', d => { output += d.toString(); });

    proc.on('close', code => {
      res.json({
        exitCode: code,
        passed: code === 0,
        output
      });
    });

    proc.on('error', err => {
      res.status(500).json({
        exitCode: 1,
        passed: false,
        output: `Execution error: ${err.message}`
      });
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
