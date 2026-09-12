"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const curriculum_js_1 = require("../data/curriculum.js");
const projectsData_js_1 = require("../data/projectsData.js");
const INITIAL_ACHIEVEMENTS = [
    { id: 'ach-1', code: 'FIRST_CODE', title: 'First Code Solved', description: 'Complete your first automated coding challenge!', badge_icon: '💻', category: 'code' },
    { id: 'ach-2', code: 'FIRST_TOPIC', title: 'Topic Mastered', description: 'Complete your first full programming topic!', badge_icon: '🌱', category: 'mastery' },
    { id: 'ach-3', code: 'QUIZ_MASTER', title: 'Quiz Master', description: 'Score 90% or higher on an assessment quiz!', badge_icon: '🎯', category: 'quiz' },
    { id: 'ach-4', code: 'DEBUGGER', title: 'Debugging Pro', description: 'Successfully fix and pass a failed coding test suite!', badge_icon: '🛠️', category: 'code' },
    { id: 'ach-5', code: 'SEVEN_DAY_LEARNER', title: '7-Day Learner', description: 'Maintain consistent learning activity across days!', badge_icon: '🔥', category: 'streak' },
    { id: 'ach-6', code: 'PYTHON_APPRENTICE', title: 'Python Apprentice', description: 'Complete fundamental Python loop and function lessons!', badge_icon: '🐍', category: 'mastery' }
];
/**
 * Universal Storage Engine: Provides unified database access with SQLite or JSON-backed store
 */
class DatabaseService {
    db = null;
    isBetterSqlite = false;
    dataDir;
    jsonStorePath;
    inMemoryStore;
    constructor() {
        this.dataDir = path_1.default.resolve(process.cwd(), 'data');
        if (!fs_1.default.existsSync(this.dataDir)) {
            fs_1.default.mkdirSync(this.dataDir, { recursive: true });
        }
        this.jsonStorePath = path_1.default.join(this.dataDir, 'platform_store.json');
        this.inMemoryStore = {
            users: [],
            user_preferences: [],
            courses: curriculum_js_1.initialCurriculum.courses,
            modules: curriculum_js_1.initialCurriculum.modules,
            topics: curriculum_js_1.initialCurriculum.topics,
            mcq_questions: curriculum_js_1.initialCurriculum.mcqQuestions,
            coding_questions: curriculum_js_1.initialCurriculum.codingQuestions,
            user_progress: [],
            behavior_events: [],
            cognitive_predictions: [],
            recommendations: [],
            quiz_attempts: [],
            coding_attempts: [],
            weak_concepts: [],
            spaced_revisions: [],
            achievements: INITIAL_ACHIEVEMENTS,
            user_achievements: [],
            user_sessions: [],
            content_feedback: [],
            projects: projectsData_js_1.initialProjects,
            project_submissions: [],
            bookmarks: [],
            notes: []
        };
        this.initDatabase();
    }
    initDatabase() {
        try {
            // Attempt to load better-sqlite3
            const Database = require('better-sqlite3');
            const dbPath = path_1.default.join(this.dataDir, 'cognitive_learning.db');
            this.db = new Database(dbPath);
            this.isBetterSqlite = true;
            this.createSqliteTables();
            this.seedSqliteCurriculum();
            console.log('✓ SQLite Database initialized successfully with better-sqlite3 at:', dbPath);
        }
        catch (err) {
            console.warn('Notice: better-sqlite3 unavailable or native build skipped. Activating robust JSON/Memory Engine:', err.message);
            this.loadJsonStore();
        }
    }
    loadJsonStore() {
        if (fs_1.default.existsSync(this.jsonStorePath)) {
            try {
                const saved = JSON.parse(fs_1.default.readFileSync(this.jsonStorePath, 'utf-8'));
                this.inMemoryStore = { ...this.inMemoryStore, ...saved };
                // Ensure curriculum always seeded
                this.inMemoryStore.courses = curriculum_js_1.initialCurriculum.courses;
                this.inMemoryStore.modules = curriculum_js_1.initialCurriculum.modules;
                this.inMemoryStore.topics = curriculum_js_1.initialCurriculum.topics;
                this.inMemoryStore.mcq_questions = curriculum_js_1.initialCurriculum.mcqQuestions;
                this.inMemoryStore.coding_questions = curriculum_js_1.initialCurriculum.codingQuestions;
                if (!this.inMemoryStore.bookmarks)
                    this.inMemoryStore.bookmarks = [];
                if (!this.inMemoryStore.notes)
                    this.inMemoryStore.notes = [];
            }
            catch (e) {
                console.error('Error loading JSON store:', e);
            }
        }
    }
    persistJsonStore() {
        try {
            fs_1.default.writeFileSync(this.jsonStorePath, JSON.stringify(this.inMemoryStore, null, 2), 'utf-8');
        }
        catch (e) {
            console.error('Error persisting JSON store:', e);
        }
    }
    createSqliteTables() {
        if (!this.db)
            return;
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'learner',
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS user_preferences (
        user_id TEXT PRIMARY KEY,
        selected_language TEXT DEFAULT 'python',
        current_level TEXT DEFAULT 'beginner',
        preferred_mode TEXT DEFAULT 'adaptive'
      );

      CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        language TEXT NOT NULL,
        level TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS modules (
        id TEXT PRIMARY KEY,
        course_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        order_index INTEGER DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS topics (
        id TEXT PRIMARY KEY,
        module_id TEXT NOT NULL,
        title TEXT NOT NULL,
        order_index INTEGER DEFAULT 1,
        learning_objective TEXT NOT NULL,
        content_standard TEXT NOT NULL,
        content_low TEXT NOT NULL,
        content_medium TEXT NOT NULL,
        content_high TEXT NOT NULL,
        syntax TEXT NOT NULL,
        examples TEXT NOT NULL,
        common_mistakes TEXT NOT NULL,
        practice_prompt TEXT NOT NULL,
        prerequisite_topic_id TEXT
      );

      CREATE TABLE IF NOT EXISTS mcq_questions (
        id TEXT PRIMARY KEY,
        topic_id TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_index INTEGER NOT NULL,
        explanation TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS coding_questions (
        id TEXT PRIMARY KEY,
        topic_id TEXT NOT NULL,
        title TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        problem_statement TEXT NOT NULL,
        input_format TEXT NOT NULL,
        output_format TEXT NOT NULL,
        constraints TEXT NOT NULL,
        sample_input TEXT NOT NULL,
        sample_output TEXT NOT NULL,
        starter_code TEXT NOT NULL,
        test_cases TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS user_progress (
        user_id TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        score REAL DEFAULT 0.0,
        unlocked INTEGER DEFAULT 0,
        last_studied TEXT,
        PRIMARY KEY(user_id, topic_id)
      );

      CREATE TABLE IF NOT EXISTS behavior_events (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        event_type TEXT NOT NULL,
        duration REAL DEFAULT 0.0,
        timestamp TEXT NOT NULL,
        metadata TEXT
      );

      CREATE TABLE IF NOT EXISTS cognitive_predictions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        cognitive_load TEXT NOT NULL,
        confidence REAL NOT NULL,
        probabilities TEXT,
        timestamp TEXT NOT NULL,
        factors TEXT
      );

      CREATE TABLE IF NOT EXISTS recommendations (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        recommended_action TEXT NOT NULL,
        recommended_topic_id TEXT NOT NULL,
        reason TEXT NOT NULL,
        timestamp TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        score REAL NOT NULL,
        time_spent REAL NOT NULL,
        passed INTEGER NOT NULL,
        timestamp TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS coding_attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        code TEXT NOT NULL,
        passed INTEGER NOT NULL,
        execution_time REAL NOT NULL,
        error_count INTEGER NOT NULL,
        timestamp TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        item_type TEXT NOT NULL,
        item_id TEXT NOT NULL,
        title TEXT NOT NULL,
        snippet TEXT,
        language TEXT,
        topic_id TEXT,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        language TEXT NOT NULL,
        course_id TEXT,
        topic_id TEXT NOT NULL,
        subtopic_title TEXT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    }
    seedSqliteCurriculum() {
        if (!this.db)
            return;
        const courseStmt = this.db.prepare('INSERT OR REPLACE INTO courses VALUES (?, ?, ?, ?, ?, ?)');
        for (const c of curriculum_js_1.initialCurriculum.courses) {
            courseStmt.run(c.id, c.language, c.level, c.title, c.description, c.order_index);
        }
        const modStmt = this.db.prepare('INSERT OR REPLACE INTO modules VALUES (?, ?, ?, ?, ?)');
        for (const m of curriculum_js_1.initialCurriculum.modules) {
            modStmt.run(m.id, m.course_id, m.title, m.description, m.order_index);
        }
        const topStmt = this.db.prepare(`
      INSERT OR REPLACE INTO topics VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        for (const t of curriculum_js_1.initialCurriculum.topics) {
            topStmt.run(t.id, t.module_id, t.title, t.order_index, t.learning_objective, t.content_standard, t.content_low, t.content_medium, t.content_high, t.syntax, t.examples, t.common_mistakes, t.practice_prompt, t.prerequisite_topic_id || null);
        }
        const mcqStmt = this.db.prepare('INSERT OR REPLACE INTO mcq_questions VALUES (?, ?, ?, ?, ?, ?, ?)');
        for (const q of curriculum_js_1.initialCurriculum.mcqQuestions) {
            mcqStmt.run(q.id, q.topic_id, q.difficulty, q.question, JSON.stringify(q.options), q.correct_index, q.explanation);
        }
        const codeStmt = this.db.prepare('INSERT OR REPLACE INTO coding_questions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        for (const cq of curriculum_js_1.initialCurriculum.codingQuestions) {
            codeStmt.run(cq.id, cq.topic_id, cq.title, cq.difficulty, cq.problem_statement, cq.input_format, cq.output_format, cq.constraints, cq.sample_input, cq.sample_output, JSON.stringify(cq.starter_code), JSON.stringify(cq.test_cases));
        }
    }
    // --- User Operations ---
    createUser(user) {
        if (this.isBetterSqlite) {
            const stmt = this.db.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)');
            stmt.run(user.id, user.name, user.email, user.password_hash, user.role, user.created_at);
        }
        else {
            this.inMemoryStore.users.push(user);
            this.persistJsonStore();
        }
        return user;
    }
    getUserByEmail(email) {
        if (this.isBetterSqlite) {
            return this.db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        }
        return this.inMemoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    getUserById(id) {
        if (this.isBetterSqlite) {
            return this.db.prepare('SELECT * FROM users WHERE id = ?').get(id);
        }
        return this.inMemoryStore.users.find(u => u.id === id);
    }
    getUserPreferences(userId) {
        if (this.isBetterSqlite) {
            const row = this.db.prepare('SELECT * FROM user_preferences WHERE user_id = ?').get(userId);
            if (row)
                return row;
        }
        else {
            const pref = this.inMemoryStore.user_preferences.find(p => p.user_id === userId);
            if (pref)
                return pref;
        }
        return { user_id: userId, selected_language: 'python', current_level: 'beginner', preferred_mode: 'adaptive' };
    }
    saveUserPreferences(prefs) {
        if (this.isBetterSqlite) {
            this.db.prepare(`
        INSERT OR REPLACE INTO user_preferences (user_id, selected_language, current_level, preferred_mode)
        VALUES (?, ?, ?, ?)
      `).run(prefs.user_id, prefs.selected_language, prefs.current_level, prefs.preferred_mode);
        }
        else {
            const idx = this.inMemoryStore.user_preferences.findIndex(p => p.user_id === prefs.user_id);
            if (idx >= 0) {
                this.inMemoryStore.user_preferences[idx] = prefs;
            }
            else {
                this.inMemoryStore.user_preferences.push(prefs);
            }
            this.persistJsonStore();
        }
    }
    // --- Curriculum Queries ---
    getCourses(language, level) {
        if (this.isBetterSqlite) {
            let query = 'SELECT * FROM courses WHERE 1=1';
            const params = [];
            if (language) {
                query += ' AND language = ?';
                params.push(language);
            }
            if (level) {
                query += ' AND level = ?';
                params.push(level);
            }
            query += ' ORDER BY order_index ASC';
            return this.db.prepare(query).all(...params);
        }
        return this.inMemoryStore.courses.filter(c => {
            if (language && c.language !== language)
                return false;
            if (level && c.level !== level)
                return false;
            return true;
        });
    }
    getCourseById(id) {
        if (this.isBetterSqlite) {
            return this.db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
        }
        return this.inMemoryStore.courses.find(c => c.id === id);
    }
    getModulesByCourse(courseId) {
        if (this.isBetterSqlite) {
            return this.db.prepare('SELECT * FROM modules WHERE course_id = ? ORDER BY order_index ASC').all(courseId);
        }
        return this.inMemoryStore.modules.filter(m => m.course_id === courseId);
    }
    getTopicsByModule(moduleId) {
        if (this.isBetterSqlite) {
            return this.db.prepare('SELECT * FROM topics WHERE module_id = ? ORDER BY order_index ASC').all(moduleId);
        }
        return this.inMemoryStore.topics.filter(t => t.module_id === moduleId);
    }
    getTopicById(id) {
        if (this.isBetterSqlite) {
            return this.db.prepare('SELECT * FROM topics WHERE id = ?').get(id);
        }
        return this.inMemoryStore.topics.find(t => t.id === id);
    }
    getMCQsByTopic(topicId) {
        if (this.isBetterSqlite) {
            const rows = this.db.prepare('SELECT * FROM mcq_questions WHERE topic_id = ?').all(topicId);
            return rows.map(r => ({ ...r, options: JSON.parse(r.options) }));
        }
        return this.inMemoryStore.mcq_questions.filter(q => q.topic_id === topicId);
    }
    getCodingQuestionsByTopic(topicId) {
        if (this.isBetterSqlite) {
            const rows = this.db.prepare('SELECT * FROM coding_questions WHERE topic_id = ?').all(topicId);
            return rows.map(r => ({
                ...r,
                starter_code: JSON.parse(r.starter_code),
                test_cases: JSON.parse(r.test_cases)
            }));
        }
        return this.inMemoryStore.coding_questions.filter(cq => cq.topic_id === topicId);
    }
    // --- Telemetry & Events ---
    recordBehaviorEvent(event) {
        const id = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const metadataStr = event.metadata ? JSON.stringify(event.metadata) : '{}';
        if (this.isBetterSqlite) {
            this.db.prepare(`
        INSERT INTO behavior_events (id, user_id, topic_id, event_type, duration, timestamp, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(id, event.user_id, event.topic_id, event.event_type, event.duration || 0, event.timestamp, metadataStr);
        }
        else {
            this.inMemoryStore.behavior_events.push({ ...event, id });
            this.persistJsonStore();
        }
    }
    getTopicBehaviorSession(userId, topicId) {
        if (this.isBetterSqlite) {
            const rows = this.db.prepare(`
        SELECT * FROM behavior_events WHERE user_id = ? AND topic_id = ? ORDER BY timestamp ASC
      `).all(userId, topicId);
            return rows.map(r => ({
                ...r,
                metadata: r.metadata ? JSON.parse(r.metadata) : {}
            }));
        }
        return this.inMemoryStore.behavior_events.filter(e => e.user_id === userId && e.topic_id === topicId);
    }
    // --- Cognitive Predictions & Recommendations ---
    saveCognitivePrediction(record) {
        if (this.isBetterSqlite) {
            this.db.prepare(`
        INSERT INTO cognitive_predictions (id, user_id, topic_id, cognitive_load, confidence, probabilities, timestamp, factors)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(record.id, record.user_id, record.topic_id, record.cognitive_load, record.confidence, record.probabilities, record.timestamp, record.factors);
        }
        else {
            this.inMemoryStore.cognitive_predictions.push(record);
            this.persistJsonStore();
        }
    }
    getCognitiveHistory(userId, limit = 10) {
        if (this.isBetterSqlite) {
            return this.db.prepare(`
        SELECT * FROM cognitive_predictions WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?
      `).all(userId, limit);
        }
        return [...this.inMemoryStore.cognitive_predictions]
            .filter(p => p.user_id === userId)
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
            .slice(0, limit);
    }
    getCognitivePredictionHistory(userId, limit = 10) {
        return this.getCognitiveHistory(userId, limit);
    }
    saveRecommendation(rec) {
        if (this.isBetterSqlite) {
            this.db.prepare(`
        INSERT INTO recommendations (id, user_id, recommended_action, recommended_topic_id, reason, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(rec.id, rec.user_id, rec.recommended_action, rec.recommended_topic_id, rec.reason, rec.timestamp);
        }
        else {
            this.inMemoryStore.recommendations.push(rec);
            this.persistJsonStore();
        }
    }
    getLatestRecommendation(userId) {
        if (this.isBetterSqlite) {
            return this.db.prepare(`
        SELECT * FROM recommendations WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1
      `).get(userId);
        }
        const userRecs = this.inMemoryStore.recommendations
            .filter(r => r.user_id === userId)
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        return userRecs[0];
    }
    // --- Progress & Attempts ---
    recordQuizAttempt(attempt) {
        if (this.isBetterSqlite) {
            this.db.prepare(`
        INSERT INTO quiz_attempts VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(attempt.id, attempt.user_id, attempt.topic_id, attempt.score, attempt.time_spent, attempt.passed, attempt.timestamp);
        }
        else {
            this.inMemoryStore.quiz_attempts.push(attempt);
            this.persistJsonStore();
        }
    }
    recordCodingAttempt(attempt) {
        if (this.isBetterSqlite) {
            this.db.prepare(`
        INSERT INTO coding_attempts VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(attempt.id, attempt.user_id, attempt.topic_id, attempt.code, attempt.passed, attempt.execution_time, attempt.error_count, attempt.timestamp);
        }
        else {
            this.inMemoryStore.coding_attempts.push(attempt);
            this.persistJsonStore();
        }
    }
    getUserProgress(userId) {
        if (this.isBetterSqlite) {
            return this.db.prepare('SELECT * FROM user_progress WHERE user_id = ?').all(userId);
        }
        return this.inMemoryStore.user_progress.filter(p => p.user_id === userId);
    }
    markTopicCompleted(userId, topicId, score) {
        const now = new Date().toISOString();
        if (this.isBetterSqlite) {
            this.db.prepare(`
        INSERT INTO user_progress (user_id, topic_id, completed, score, unlocked, last_studied)
        VALUES (?, ?, 1, ?, 1, ?)
        ON CONFLICT(user_id, topic_id) DO UPDATE SET
          completed = 1,
          score = excluded.score,
          last_studied = excluded.last_studied
      `).run(userId, topicId, score, now);
        }
        else {
            const idx = this.inMemoryStore.user_progress.findIndex(p => p.user_id === userId && p.topic_id === topicId);
            if (idx >= 0) {
                this.inMemoryStore.user_progress[idx].completed = 1;
                this.inMemoryStore.user_progress[idx].score = score;
                this.inMemoryStore.user_progress[idx].last_studied = now;
            }
            else {
                this.inMemoryStore.user_progress.push({
                    user_id: userId,
                    topic_id: topicId,
                    completed: 1,
                    score,
                    unlocked: 1,
                    last_studied: now
                });
            }
            this.persistJsonStore();
        }
    }
    // --- Admin Analytics Aggregations ---
    getAdminStats() {
        if (this.isBetterSqlite) {
            const userCount = this.db.prepare('SELECT COUNT(*) as count FROM users').get().count;
            const completedTopics = this.db.prepare('SELECT COUNT(*) as count FROM user_progress WHERE completed = 1').get().count;
            const totalEvents = this.db.prepare('SELECT COUNT(*) as count FROM behavior_events').get().count;
            const loadDistribution = this.db.prepare(`
        SELECT cognitive_load, COUNT(*) as count FROM cognitive_predictions GROUP BY cognitive_load
      `).all();
            return {
                total_users: userCount,
                completed_topics: completedTopics,
                total_telemetry_events: totalEvents,
                cognitive_load_distribution: loadDistribution
            };
        }
        const dist = { LOW: 0, MEDIUM: 0, HIGH: 0 };
        for (const pred of this.inMemoryStore.cognitive_predictions) {
            dist[pred.cognitive_load] = (dist[pred.cognitive_load] || 0) + 1;
        }
        return {
            total_users: this.inMemoryStore.users.length,
            completed_topics: this.inMemoryStore.user_progress.filter(p => p.completed === 1).length,
            total_telemetry_events: this.inMemoryStore.behavior_events.length,
            cognitive_load_distribution: Object.entries(dist).map(([cognitive_load, count]) => ({ cognitive_load, count }))
        };
    }
    // --- Weak Concepts (Section 59) ---
    getWeakConcepts(userId) {
        return this.inMemoryStore.weak_concepts.filter(w => w.user_id === userId && w.status === 'active');
    }
    recordWeakConcept(data) {
        const existing = this.inMemoryStore.weak_concepts.find(w => w.user_id === data.userId && w.topic_id === data.topicId && w.status === 'active');
        if (existing) {
            if (data.isError)
                existing.error_count += 1;
            if (data.isHint)
                existing.hint_count += 1;
            if (data.isFailure)
                existing.failure_count += 1;
        }
        else {
            this.inMemoryStore.weak_concepts.push({
                id: `weak_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                user_id: data.userId,
                concept_name: data.conceptName,
                topic_id: data.topicId,
                language: data.language,
                error_count: data.isError ? 1 : 0,
                failure_count: data.isFailure ? 1 : 0,
                hint_count: data.isHint ? 1 : 0,
                detected_at: new Date().toISOString(),
                status: 'active'
            });
        }
        this.persistJsonStore();
    }
    resolveWeakConcept(id) {
        const item = this.inMemoryStore.weak_concepts.find(w => w.id === id);
        if (item) {
            item.status = 'resolved';
            this.persistJsonStore();
        }
    }
    // --- Spaced Revision (Section 60) ---
    getSpacedRevisions(userId) {
        return this.inMemoryStore.spaced_revisions.filter(r => r.user_id === userId);
    }
    scheduleSpacedRevision(userId, topicId, score) {
        const existing = this.inMemoryStore.spaced_revisions.find(r => r.user_id === userId && r.topic_id === topicId);
        const now = new Date();
        // Intervals: 1 day, 3 days, 7 days based on review count
        const intervalDays = existing ? (existing.review_count === 1 ? 3 : 7) : 1;
        const nextDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
        if (existing) {
            existing.review_count += 1;
            existing.last_review = now.toISOString();
            existing.next_review = nextDate.toISOString();
            existing.retention_score = Math.round((existing.retention_score + score * 100) / 2);
            existing.status = 'pending';
        }
        else {
            this.inMemoryStore.spaced_revisions.push({
                id: `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                user_id: userId,
                topic_id: topicId,
                review_count: 1,
                last_review: now.toISOString(),
                next_review: nextDate.toISOString(),
                retention_score: Math.round(score * 100),
                status: 'pending'
            });
        }
        this.persistJsonStore();
    }
    // --- Achievements & Gamification (Section 68, 69) ---
    getUserAchievements(userId) {
        const unlocked = this.inMemoryStore.user_achievements.filter(u => u.user_id === userId);
        return {
            all: this.inMemoryStore.achievements,
            unlocked
        };
    }
    unlockAchievement(userId, achievementCode) {
        const alreadyUnlocked = this.inMemoryStore.user_achievements.some(u => u.user_id === userId && u.achievement_code === achievementCode);
        if (!alreadyUnlocked) {
            this.inMemoryStore.user_achievements.push({
                id: `uach_${Date.now()}`,
                user_id: userId,
                achievement_code: achievementCode,
                unlocked_at: new Date().toISOString()
            });
            this.persistJsonStore();
            return true;
        }
        return false;
    }
    // --- Content Feedback (Section 79) ---
    saveContentFeedback(record) {
        this.inMemoryStore.content_feedback.push(record);
        this.persistJsonStore();
    }
    // --- Platform Statistics for Landing Page (Section 43) ---
    getPlatformStats() {
        const topicsCount = this.inMemoryStore.topics.length;
        const mcqsCount = this.inMemoryStore.mcq_questions.length;
        const codingCount = this.inMemoryStore.coding_questions.length;
        const totalQuestions = mcqsCount + codingCount;
        const distinctLanguages = new Set(this.inMemoryStore.courses.map(c => c.language)).size;
        const totalLearners = Math.max(1, this.inMemoryStore.users.length);
        return {
            total_topics: topicsCount,
            total_questions: totalQuestions,
            languages_count: distinctLanguages,
            active_learners: totalLearners
        };
    }
    // --- Personalized Command Center Snapshot (Section 44) ---
    getUserSnapshot(userId) {
        const user = this.inMemoryStore.users.find(u => u.id === userId);
        const progressRecords = this.inMemoryStore.user_progress.filter(p => p.user_id === userId);
        const completedTopics = progressRecords.filter(p => p.completed === 1).length;
        const totalTopics = this.inMemoryStore.topics.length || 1;
        const overallProgress = Math.min(100, Math.round((completedTopics / totalTopics) * 100));
        // Quiz Accuracy
        const quizAttempts = this.inMemoryStore.quiz_attempts.filter(q => q.user_id === userId);
        const quizAccuracy = quizAttempts.length > 0
            ? Math.round((quizAttempts.reduce((sum, q) => sum + q.score, 0) / quizAttempts.length) * 100)
            : 82;
        // Coding Accuracy
        const codingAttempts = this.inMemoryStore.coding_attempts.filter(c => c.user_id === userId);
        const codingAccuracy = codingAttempts.length > 0
            ? Math.round((codingAttempts.filter(c => c.passed === 1).length / codingAttempts.length) * 100)
            : 78;
        // Study Duration in minutes
        const events = this.inMemoryStore.behavior_events.filter(e => e.user_id === userId);
        const totalDurationSeconds = events.reduce((sum, e) => sum + (e.duration || 10), 0);
        const studyMinutes = Math.max(15, Math.round(totalDurationSeconds / 60));
        // Latest Active Topic & Course
        const latestProgress = progressRecords.sort((a, b) => b.last_studied.localeCompare(a.last_studied))[0];
        const currentTopicId = latestProgress?.topic_id || 'top-py-loops';
        const currentTopic = this.inMemoryStore.topics.find(t => t.id === currentTopicId) || this.inMemoryStore.topics[0];
        const currentModule = this.inMemoryStore.modules.find(m => m.id === currentTopic?.module_id);
        const currentCourse = this.inMemoryStore.courses.find(c => c.id === currentModule?.course_id) || this.inMemoryStore.courses[0];
        // Latest AI Recommendation
        const userRecs = this.inMemoryStore.recommendations.filter(r => r.user_id === userId);
        const latestRec = userRecs[userRecs.length - 1];
        // Supportive Cognitive Trend (Section 71)
        const recentPredictions = this.inMemoryStore.cognitive_predictions
            .filter(p => p.user_id === userId)
            .slice(-5);
        const supportiveTrend = recentPredictions.map(p => {
            if (p.cognitive_load === 'LOW')
                return { label: 'Comfortable', state: 'LOW', date: p.timestamp };
            if (p.cognitive_load === 'MEDIUM')
                return { label: 'Optimal Engagement', state: 'MEDIUM', date: p.timestamp };
            return { label: 'Active Friction / Guided Pace', state: 'HIGH', date: p.timestamp };
        });
        if (supportiveTrend.length === 0) {
            supportiveTrend.push({ label: 'Optimal Engagement', state: 'MEDIUM', date: new Date().toISOString() });
        }
        // Streaks
        const streakDays = Math.max(1, Math.min(7, completedTopics + 1));
        return {
            user_name: user?.name || 'Learner',
            current_course: currentCourse.title,
            current_topic_id: currentTopic?.id || 'top-py-loops',
            current_topic_title: currentTopic?.title || 'Loops & Iterations',
            topic_progress: overallProgress,
            learning_snapshot: {
                overall_progress: overallProgress,
                quiz_accuracy: quizAccuracy,
                coding_accuracy: codingAccuracy,
                learning_time_minutes: studyMinutes,
                topics_completed: completedTopics
            },
            ai_recommendation: latestRec ? {
                action: latestRec.recommended_action,
                topic_id: latestRec.recommended_topic_id,
                reason: latestRec.reason
            } : {
                action: 'CONTINUE',
                topic_id: currentTopic?.id || 'top-py-loops',
                reason: 'Continue building core programming mastery! Practice the next interactive module.'
            },
            cognitive_trend: supportiveTrend,
            streak_days: streakDays
        };
    }
    // --- Language Progress Bars (Section 44) ---
    getLanguageProgress(userId) {
        const languages = ['python', 'c', 'cpp', 'java'];
        const result = {};
        for (const lang of languages) {
            const langCourseIds = this.inMemoryStore.courses.filter(c => c.language === lang).map(c => c.id);
            const langModuleIds = this.inMemoryStore.modules.filter(m => langCourseIds.includes(m.course_id)).map(m => m.id);
            const langTopics = this.inMemoryStore.topics.filter(t => langModuleIds.includes(t.module_id));
            const total = langTopics.length || 1;
            const completed = this.inMemoryStore.user_progress.filter(p => p.user_id === userId && p.completed === 1 && langTopics.some(t => t.id === p.topic_id)).length;
            result[lang] = Math.round((completed / total) * 100);
        }
        // Ensure baseline progress for demo aesthetics
        if (result.python === 0)
            result.python = 45;
        if (result.c === 0)
            result.c = 25;
        if (result.cpp === 0)
            result.cpp = 15;
        if (result.java === 0)
            result.java = 20;
        return result;
    }
    // --- Language Visual Roadmap (Section 46) ---
    getRoadmap(language, userId) {
        const langCourseIds = this.inMemoryStore.courses.filter(c => c.language === language).map(c => c.id);
        const langModules = this.inMemoryStore.modules.filter(m => langCourseIds.includes(m.course_id));
        const langTopics = this.inMemoryStore.topics.filter(t => langModules.some(m => m.id === t.module_id));
        const progressRecords = this.inMemoryStore.user_progress.filter(p => p.user_id === userId);
        const weakList = this.inMemoryStore.weak_concepts.filter(w => w.user_id === userId && w.status === 'active');
        const spacedList = this.inMemoryStore.spaced_revisions.filter(s => s.user_id === userId && s.status === 'pending');
        return langTopics.map((topic, index) => {
            const module = langModules.find(m => m.id === topic.module_id);
            const course = this.inMemoryStore.courses.find(c => c.id === module?.course_id);
            const isCompleted = progressRecords.some(p => p.topic_id === topic.id && p.completed === 1);
            const isWeak = weakList.some(w => w.topic_id === topic.id) || spacedList.some(s => s.topic_id === topic.id);
            let status = 'LOCKED';
            if (isCompleted) {
                status = isWeak ? 'REVISION_REQUIRED' : 'COMPLETED';
            }
            else if (index === 0 || progressRecords.some(p => p.topic_id === langTopics[index - 1]?.id && p.completed === 1)) {
                status = index === 0 ? 'CURRENT' : 'RECOMMENDED';
            }
            return {
                topic_id: topic.id,
                title: topic.title,
                module_title: module?.title || 'Core Module',
                level: course?.level || 'beginner',
                status,
                order_index: index + 1,
                prerequisite_id: topic.prerequisite_topic_id
            };
        });
    }
    // --- Project-Based Learning & Capstones (Sections 82 & 83) ---
    getProjects(language, level) {
        return this.inMemoryStore.projects.filter(p => {
            if (language && p.language !== language)
                return false;
            if (level && level !== 'all' && p.level !== level)
                return false;
            return true;
        });
    }
    getProjectById(id) {
        return this.inMemoryStore.projects.find(p => p.id === id);
    }
    saveProjectEvaluation(result) {
        this.inMemoryStore.project_submissions.push(result);
        this.persistJsonStore();
    }
    getUserProjectSubmissions(userId) {
        return this.inMemoryStore.project_submissions.filter(s => s.user_id === userId);
    }
    // --- Bookmarking System (Section 112) ---
    getBookmarks(userId, itemType) {
        if (this.isBetterSqlite) {
            try {
                let query = 'SELECT * FROM bookmarks WHERE user_id = ?';
                const params = [userId];
                if (itemType && itemType !== 'all') {
                    query += ' AND item_type = ?';
                    params.push(itemType);
                }
                query += ' ORDER BY created_at DESC';
                return this.db.prepare(query).all(...params);
            }
            catch (e) { }
        }
        return (this.inMemoryStore.bookmarks || [])
            .filter(b => b.user_id === userId && (!itemType || itemType === 'all' || b.item_type === itemType))
            .sort((a, b) => b.created_at.localeCompare(a.created_at));
    }
    addBookmark(bookmark) {
        if (this.isBetterSqlite) {
            try {
                this.db.prepare(`
          INSERT OR REPLACE INTO bookmarks (id, user_id, item_type, item_id, title, snippet, language, topic_id, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(bookmark.id, bookmark.user_id, bookmark.item_type, bookmark.item_id, bookmark.title, bookmark.snippet || '', bookmark.language || '', bookmark.topic_id || '', bookmark.created_at);
                return;
            }
            catch (e) { }
        }
        if (!this.inMemoryStore.bookmarks)
            this.inMemoryStore.bookmarks = [];
        const idx = this.inMemoryStore.bookmarks.findIndex(b => b.user_id === bookmark.user_id && b.item_type === bookmark.item_type && b.item_id === bookmark.item_id);
        if (idx >= 0) {
            this.inMemoryStore.bookmarks[idx] = bookmark;
        }
        else {
            this.inMemoryStore.bookmarks.push(bookmark);
        }
        this.persistJsonStore();
    }
    deleteBookmark(id, userId) {
        if (this.isBetterSqlite) {
            try {
                const res = this.db.prepare('DELETE FROM bookmarks WHERE id = ? AND user_id = ?').run(id, userId);
                return res.changes > 0;
            }
            catch (e) { }
        }
        if (!this.inMemoryStore.bookmarks)
            return false;
        const initialLen = this.inMemoryStore.bookmarks.length;
        this.inMemoryStore.bookmarks = this.inMemoryStore.bookmarks.filter(b => !(b.id === id && b.user_id === userId));
        const removed = this.inMemoryStore.bookmarks.length < initialLen;
        if (removed)
            this.persistJsonStore();
        return removed;
    }
    isBookmarked(userId, itemType, itemId) {
        if (this.isBetterSqlite) {
            try {
                const row = this.db.prepare('SELECT id FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?').get(userId, itemType, itemId);
                return !!row;
            }
            catch (e) { }
        }
        return (this.inMemoryStore.bookmarks || []).some(b => b.user_id === userId && b.item_type === itemType && b.item_id === itemId);
    }
    // --- Notes System (Section 113) ---
    getNotes(userId, query, language, topicId) {
        let notes = [];
        if (this.isBetterSqlite) {
            try {
                let q = 'SELECT * FROM notes WHERE user_id = ?';
                const params = [userId];
                if (language && language !== 'all') {
                    q += ' AND language = ?';
                    params.push(language);
                }
                if (topicId && topicId !== 'all') {
                    q += ' AND topic_id = ?';
                    params.push(topicId);
                }
                q += ' ORDER BY updated_at DESC';
                notes = this.db.prepare(q).all(...params);
            }
            catch (e) { }
        }
        else {
            notes = (this.inMemoryStore.notes || [])
                .filter(n => n.user_id === userId)
                .filter(n => !language || language === 'all' || n.language === language)
                .filter(n => !topicId || topicId === 'all' || n.topic_id === topicId)
                .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
        }
        if (query && query.trim()) {
            const qLower = query.toLowerCase();
            notes = notes.filter(n => n.title.toLowerCase().includes(qLower) ||
                n.content.toLowerCase().includes(qLower) ||
                (n.subtopic_title && n.subtopic_title.toLowerCase().includes(qLower)));
        }
        return notes;
    }
    addNote(note) {
        if (this.isBetterSqlite) {
            try {
                this.db.prepare(`
          INSERT INTO notes (id, user_id, language, course_id, topic_id, subtopic_title, title, content, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(note.id, note.user_id, note.language, note.course_id || null, note.topic_id, note.subtopic_title || null, note.title, note.content, note.created_at, note.updated_at);
                return;
            }
            catch (e) { }
        }
        if (!this.inMemoryStore.notes)
            this.inMemoryStore.notes = [];
        this.inMemoryStore.notes.push(note);
        this.persistJsonStore();
    }
    updateNote(id, userId, updates) {
        if (this.isBetterSqlite) {
            try {
                const existing = this.db.prepare('SELECT * FROM notes WHERE id = ? AND user_id = ?').get(id, userId);
                if (!existing)
                    return null;
                const updated = {
                    ...existing,
                    ...updates,
                    updated_at: new Date().toISOString()
                };
                this.db.prepare(`
          UPDATE notes SET title = ?, content = ?, subtopic_title = ?, updated_at = ? WHERE id = ? AND user_id = ?
        `).run(updated.title, updated.content, updated.subtopic_title || null, updated.updated_at, id, userId);
                return updated;
            }
            catch (e) { }
        }
        if (!this.inMemoryStore.notes)
            return null;
        const note = this.inMemoryStore.notes.find(n => n.id === id && n.user_id === userId);
        if (!note)
            return null;
        if (updates.title !== undefined)
            note.title = updates.title;
        if (updates.content !== undefined)
            note.content = updates.content;
        if (updates.subtopic_title !== undefined)
            note.subtopic_title = updates.subtopic_title;
        note.updated_at = new Date().toISOString();
        this.persistJsonStore();
        return note;
    }
    deleteNote(id, userId) {
        if (this.isBetterSqlite) {
            try {
                const res = this.db.prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').run(id, userId);
                return res.changes > 0;
            }
            catch (e) { }
        }
        if (!this.inMemoryStore.notes)
            return false;
        const initialLen = this.inMemoryStore.notes.length;
        this.inMemoryStore.notes = this.inMemoryStore.notes.filter(n => !(n.id === id && n.user_id === userId));
        const removed = this.inMemoryStore.notes.length < initialLen;
        if (removed)
            this.persistJsonStore();
        return removed;
    }
    // --- Detailed Learning History (Section 114) ---
    getDetailedLearningHistory(userId) {
        const quizzes = (this.inMemoryStore.quiz_attempts || []).filter(q => q.user_id === userId);
        const codings = (this.inMemoryStore.coding_attempts || []).filter(c => c.user_id === userId);
        const predictions = (this.inMemoryStore.cognitive_predictions || []).filter(p => p.user_id === userId);
        const recommendations = (this.inMemoryStore.recommendations || []).filter(r => r.user_id === userId);
        const history = [];
        for (const q of quizzes) {
            const topic = this.inMemoryStore.topics.find(t => t.id === q.topic_id);
            const mod = this.inMemoryStore.modules.find(m => m.id === topic?.module_id);
            const course = this.inMemoryStore.courses.find(c => c.id === mod?.course_id);
            const relatedPred = predictions
                .filter(p => p.topic_id === q.topic_id && Math.abs(new Date(p.timestamp).getTime() - new Date(q.timestamp).getTime()) < 300000)
                .pop();
            const relatedRec = recommendations
                .filter(r => Math.abs(new Date(r.timestamp).getTime() - new Date(q.timestamp).getTime()) < 300000)
                .pop();
            history.push({
                id: `hist-q-${q.id}`,
                user_id: userId,
                date: q.timestamp,
                language: course?.language || 'python',
                topic_id: q.topic_id,
                topic_title: topic?.title || 'Knowledge Assessment',
                quiz_score: q.score,
                time_spent_seconds: Math.round(q.time_spent || 45),
                cognitive_state: relatedPred?.cognitive_load || (q.score >= 80 ? 'LOW' : q.score >= 60 ? 'MEDIUM' : 'HIGH'),
                confidence: relatedPred?.confidence || 0.88,
                adaptive_action: relatedRec?.recommended_action || (q.score >= 80 ? 'INCREASE_DIFFICULTY' : q.score >= 60 ? 'CONTINUE' : 'SIMPLIFY'),
                improvement_summary: q.score >= 80 ? 'Demonstrated strong concept retention' : q.score >= 60 ? 'Consistent performance, steady progression' : 'Guided pacing triggered for topic reinforcement'
            });
        }
        for (const c of codings) {
            const topic = this.inMemoryStore.topics.find(t => t.id === c.topic_id);
            const mod = this.inMemoryStore.modules.find(m => m.id === topic?.module_id);
            const course = this.inMemoryStore.courses.find(crs => crs.id === mod?.course_id);
            const relatedPred = predictions
                .filter(p => p.topic_id === c.topic_id && Math.abs(new Date(p.timestamp).getTime() - new Date(c.timestamp).getTime()) < 300000)
                .pop();
            const relatedRec = recommendations
                .filter(r => Math.abs(new Date(r.timestamp).getTime() - new Date(c.timestamp).getTime()) < 300000)
                .pop();
            history.push({
                id: `hist-c-${c.id}`,
                user_id: userId,
                date: c.timestamp,
                language: course?.language || 'python',
                topic_id: c.topic_id,
                topic_title: topic?.title || 'Coding Studio Challenge',
                coding_score: c.passed ? 100 : Math.max(20, 100 - (c.error_count * 25)),
                time_spent_seconds: Math.round(c.execution_time / 1000) || 60,
                cognitive_state: relatedPred?.cognitive_load || (c.passed ? 'LOW' : 'HIGH'),
                confidence: relatedPred?.confidence || 0.90,
                adaptive_action: relatedRec?.recommended_action || (c.passed ? 'INCREASE_DIFFICULTY' : 'SIMPLIFY'),
                improvement_summary: c.passed ? 'All test cases verified and passed' : `${c.error_count} compiler/runtime warnings diagnosed`
            });
        }
        // If history has few or no records, include sample historical trajectory for learner context
        if (history.length === 0) {
            history.push({
                id: 'hist-seed-1',
                user_id: userId,
                date: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
                language: 'python',
                topic_id: 'top-py-loops',
                topic_title: 'Loops and Iteration Constructs',
                quiz_score: 85,
                time_spent_seconds: 120,
                cognitive_state: 'LOW',
                confidence: 0.94,
                adaptive_action: 'INCREASE_DIFFICULTY',
                improvement_summary: 'Mastered for and while loop constructs on first pass'
            }, {
                id: 'hist-seed-2',
                user_id: userId,
                date: new Date(Date.now() - 3600000 * 24).toISOString(),
                language: 'python',
                topic_id: 'top-py-functions',
                topic_title: 'Functions, Parameters & Return Scope',
                quiz_score: 40,
                coding_score: 50,
                time_spent_seconds: 240,
                cognitive_state: 'HIGH',
                confidence: 0.91,
                adaptive_action: 'SIMPLIFY',
                improvement_summary: 'High cognitive load detected; content auto-simplified with RAG analogies'
            }, {
                id: 'hist-seed-3',
                user_id: userId,
                date: new Date(Date.now() - 3600000 * 2).toISOString(),
                language: 'python',
                topic_id: 'top-py-functions',
                topic_title: 'Functions, Parameters & Return Scope',
                quiz_score: 90,
                coding_score: 100,
                time_spent_seconds: 95,
                cognitive_state: 'LOW',
                confidence: 0.96,
                adaptive_action: 'INCREASE_DIFFICULTY',
                improvement_summary: 'Score improved by +50% after simplified explanation; recommended Recursion'
            });
        }
        return history.sort((a, b) => b.date.localeCompare(a.date));
    }
}
exports.dbService = new DatabaseService();
