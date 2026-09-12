"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSystemDiagnostics = exports.reindexRAG = exports.retrainMLModel = exports.getMLModelMetrics = exports.getAdminAnalytics = void 0;
const database_js_1 = require("../db/database.js");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
const getAdminAnalytics = async (req, res) => {
    try {
        const stats = database_js_1.dbService.getAdminStats();
        res.json(stats);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAdminAnalytics = getAdminAnalytics;
const getMLModelMetrics = async (req, res) => {
    try {
        try {
            const resp = await fetch(`${ML_SERVICE_URL}/api/ml/metrics`);
            if (resp.ok) {
                const metrics = await resp.json();
                res.json(metrics);
                return;
            }
        }
        catch (e) {
            // Ignore and fallback to reading saved metrics.json directly from disk
        }
        // Try reading directly from models/metrics.json
        const fs = await import('fs');
        const metricsPath = path_1.default.resolve(process.cwd(), '../ml_service/models/metrics.json');
        if (fs.existsSync(metricsPath)) {
            const data = JSON.parse(fs.readFileSync(metricsPath, 'utf-8'));
            res.json(data);
            return;
        }
        res.status(404).json({ error: 'ML model metrics not available' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getMLModelMetrics = getMLModelMetrics;
const retrainMLModel = async (req, res) => {
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.retrainMLModel = retrainMLModel;
const reindexRAG = async (req, res) => {
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.reindexRAG = reindexRAG;
const runSystemDiagnostics = async (req, res) => {
    try {
        const rootDir = path_1.default.resolve(process.cwd(), '..');
        const proc = (0, child_process_1.spawn)('python', ['scripts/verify_platform.py'], {
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
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.runSystemDiagnostics = runSystemDiagnostics;
