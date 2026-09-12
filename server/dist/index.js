"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const apiRoutes_js_1 = __importDefault(require("./routes/apiRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security & Middleware
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Cognitive-Load-Aware Adaptive Engine Backend API',
        uptime: process.uptime()
    });
});
// Mount Platform API
app.use('/api', apiRoutes_js_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
});
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Cognitive Engine Backend API running on port ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
    console.log(`====================================================`);
});
