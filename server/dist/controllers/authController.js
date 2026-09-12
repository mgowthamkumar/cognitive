"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferences = exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_js_1 = require("../db/database.js");
const auth_js_1 = require("../middleware/auth.js");
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Name, email, and password are required' });
            return;
        }
        const existing = database_js_1.dbService.getUserByEmail(email);
        if (existing) {
            res.status(409).json({ error: 'User with this email already exists' });
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const password_hash = await bcryptjs_1.default.hash(password, salt);
        const newUser = {
            id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            name,
            email,
            password_hash,
            role: role === 'admin' ? 'admin' : 'learner',
            created_at: new Date().toISOString()
        };
        database_js_1.dbService.createUser(newUser);
        const token = (0, auth_js_1.generateToken)({ id: newUser.id, email: newUser.email, role: newUser.role });
        res.status(201).json({
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const user = database_js_1.dbService.getUserByEmail(email);
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const token = (0, auth_js_1.generateToken)({ id: user.id, email: user.email, role: user.role });
        const prefs = database_js_1.dbService.getUserPreferences(user.id);
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            preferences: prefs
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const user = database_js_1.dbService.getUserById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const prefs = database_js_1.dbService.getUserPreferences(userId);
        const progress = database_js_1.dbService.getUserProgress(userId);
        const cognitiveHistory = database_js_1.dbService.getCognitiveHistory(userId, 5);
        const latestRec = database_js_1.dbService.getLatestRecommendation(userId);
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            preferences: prefs,
            progress,
            cognitive_history: cognitiveHistory,
            latest_recommendation: latestRec
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getMe = getMe;
const updatePreferences = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { selected_language, current_level, preferred_mode } = req.body;
        database_js_1.dbService.saveUserPreferences({
            user_id: userId,
            selected_language: selected_language || 'python',
            current_level: current_level || 'beginner',
            preferred_mode: preferred_mode || 'adaptive'
        });
        res.json({ success: true, message: 'Preferences updated successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updatePreferences = updatePreferences;
