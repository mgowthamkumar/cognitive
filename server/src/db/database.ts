import path from 'path';
import fs from 'fs';
import { initialCurriculum } from '../data/curriculum.js';
import {
  User,
  UserPreferences,
  Course,
  Module,
  Topic,
  MCQQuestion,
  CodingQuestion,
  BehaviorEvent,
  CognitiveLoadLevel,
  AdaptiveAction
} from '../types.js';

interface UserProgressRecord {
  user_id: string;
  topic_id: string;
  completed: number;
  score: number;
  unlocked: number;
  last_studied: string;
}

interface CognitivePredictionRecord {
  id: string;
  user_id: string;
  topic_id: string;
  cognitive_load: CognitiveLoadLevel;
  confidence: number;
  probabilities: string;
  timestamp: string;
  factors: string;
}

interface AdaptiveRecommendationRecord {
  id: string;
  user_id: string;
  recommended_action: AdaptiveAction;
  recommended_topic_id: string;
  reason: string;
  timestamp: string;
}

interface QuizAttemptRecord {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  time_spent: number;
  passed: number;
  timestamp: string;
}

interface CodingAttemptRecord {
  id: string;
  user_id: string;
  topic_id: string;
  code: string;
  passed: number;
  execution_time: number;
  error_count: number;
  timestamp: string;
}

/**
 * Universal Storage Engine: Provides unified database access with SQLite or JSON-backed store
 */
class DatabaseService {
  private db: any = null;
  private isBetterSqlite = false;
  private dataDir: string;
  private jsonStorePath: string;
  private inMemoryStore: {
    users: User[];
    user_preferences: UserPreferences[];
    courses: Course[];
    modules: Module[];
    topics: Topic[];
    mcq_questions: MCQQuestion[];
    coding_questions: CodingQuestion[];
    user_progress: UserProgressRecord[];
    behavior_events: BehaviorEvent[];
    cognitive_predictions: CognitivePredictionRecord[];
    recommendations: AdaptiveRecommendationRecord[];
    quiz_attempts: QuizAttemptRecord[];
    coding_attempts: CodingAttemptRecord[];
  };

  constructor() {
    this.dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    this.jsonStorePath = path.join(this.dataDir, 'platform_store.json');

    this.inMemoryStore = {
      users: [],
      user_preferences: [],
      courses: initialCurriculum.courses,
      modules: initialCurriculum.modules,
      topics: initialCurriculum.topics,
      mcq_questions: initialCurriculum.mcqQuestions,
      coding_questions: initialCurriculum.codingQuestions,
      user_progress: [],
      behavior_events: [],
      cognitive_predictions: [],
      recommendations: [],
      quiz_attempts: [],
      coding_attempts: []
    };

    this.initDatabase();
  }

  private initDatabase() {
    try {
      // Attempt to load better-sqlite3
      const Database = require('better-sqlite3');
      const dbPath = path.join(this.dataDir, 'cognitive_learning.db');
      this.db = new Database(dbPath);
      this.isBetterSqlite = true;
      this.createSqliteTables();
      this.seedSqliteCurriculum();
      console.log('✓ SQLite Database initialized successfully with better-sqlite3 at:', dbPath);
    } catch (err: any) {
      console.warn('Notice: better-sqlite3 unavailable or native build skipped. Activating robust JSON/Memory Engine:', err.message);
      this.loadJsonStore();
    }
  }

  private loadJsonStore() {
    if (fs.existsSync(this.jsonStorePath)) {
      try {
        const saved = JSON.parse(fs.readFileSync(this.jsonStorePath, 'utf-8'));
        this.inMemoryStore = { ...this.inMemoryStore, ...saved };
        // Ensure curriculum always seeded
        this.inMemoryStore.courses = initialCurriculum.courses;
        this.inMemoryStore.modules = initialCurriculum.modules;
        this.inMemoryStore.topics = initialCurriculum.topics;
        this.inMemoryStore.mcq_questions = initialCurriculum.mcqQuestions;
        this.inMemoryStore.coding_questions = initialCurriculum.codingQuestions;
      } catch (e) {
        console.error('Error loading JSON store:', e);
      }
    }
  }

  private persistJsonStore() {
    try {
      fs.writeFileSync(this.jsonStorePath, JSON.stringify(this.inMemoryStore, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error persisting JSON store:', e);
    }
  }

  private createSqliteTables() {
    if (!this.db) return;
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
    `);
  }

  private seedSqliteCurriculum() {
    if (!this.db) return;
    const courseStmt = this.db.prepare('INSERT OR REPLACE INTO courses VALUES (?, ?, ?, ?, ?, ?)');
    for (const c of initialCurriculum.courses) {
      courseStmt.run(c.id, c.language, c.level, c.title, c.description, c.order_index);
    }

    const modStmt = this.db.prepare('INSERT OR REPLACE INTO modules VALUES (?, ?, ?, ?, ?)');
    for (const m of initialCurriculum.modules) {
      modStmt.run(m.id, m.course_id, m.title, m.description, m.order_index);
    }

    const topStmt = this.db.prepare(`
      INSERT OR REPLACE INTO topics VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const t of initialCurriculum.topics) {
      topStmt.run(
        t.id, t.module_id, t.title, t.order_index, t.learning_objective,
        t.content_standard, t.content_low, t.content_medium, t.content_high,
        t.syntax, t.examples, t.common_mistakes, t.practice_prompt, t.prerequisite_topic_id || null
      );
    }

    const mcqStmt = this.db.prepare('INSERT OR REPLACE INTO mcq_questions VALUES (?, ?, ?, ?, ?, ?, ?)');
    for (const q of initialCurriculum.mcqQuestions) {
      mcqStmt.run(q.id, q.topic_id, q.difficulty, q.question, JSON.stringify(q.options), q.correct_index, q.explanation);
    }

    const codeStmt = this.db.prepare('INSERT OR REPLACE INTO coding_questions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const cq of initialCurriculum.codingQuestions) {
      codeStmt.run(
        cq.id, cq.topic_id, cq.title, cq.difficulty, cq.problem_statement,
        cq.input_format, cq.output_format, cq.constraints, cq.sample_input, cq.sample_output,
        JSON.stringify(cq.starter_code), JSON.stringify(cq.test_cases)
      );
    }
  }

  // --- User Operations ---
  public createUser(user: User): User {
    if (this.isBetterSqlite) {
      const stmt = this.db.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)');
      stmt.run(user.id, user.name, user.email, user.password_hash, user.role, user.created_at);
    } else {
      this.inMemoryStore.users.push(user);
      this.persistJsonStore();
    }
    return user;
  }

  public getUserByEmail(email: string): User | undefined {
    if (this.isBetterSqlite) {
      return this.db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
    }
    return this.inMemoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): User | undefined {
    if (this.isBetterSqlite) {
      return this.db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
    }
    return this.inMemoryStore.users.find(u => u.id === id);
  }

  public getUserPreferences(userId: string): UserPreferences {
    if (this.isBetterSqlite) {
      const row = this.db.prepare('SELECT * FROM user_preferences WHERE user_id = ?').get(userId) as UserPreferences | undefined;
      if (row) return row;
    } else {
      const pref = this.inMemoryStore.user_preferences.find(p => p.user_id === userId);
      if (pref) return pref;
    }
    return { user_id: userId, selected_language: 'python', current_level: 'beginner', preferred_mode: 'adaptive' };
  }

  public saveUserPreferences(prefs: UserPreferences): void {
    if (this.isBetterSqlite) {
      this.db.prepare(`
        INSERT OR REPLACE INTO user_preferences (user_id, selected_language, current_level, preferred_mode)
        VALUES (?, ?, ?, ?)
      `).run(prefs.user_id, prefs.selected_language, prefs.current_level, prefs.preferred_mode);
    } else {
      const idx = this.inMemoryStore.user_preferences.findIndex(p => p.user_id === prefs.user_id);
      if (idx >= 0) {
        this.inMemoryStore.user_preferences[idx] = prefs;
      } else {
        this.inMemoryStore.user_preferences.push(prefs);
      }
      this.persistJsonStore();
    }
  }

  // --- Curriculum Queries ---
  public getCourses(language?: string, level?: string): Course[] {
    if (this.isBetterSqlite) {
      let query = 'SELECT * FROM courses WHERE 1=1';
      const params: any[] = [];
      if (language) { query += ' AND language = ?'; params.push(language); }
      if (level) { query += ' AND level = ?'; params.push(level); }
      query += ' ORDER BY order_index ASC';
      return this.db.prepare(query).all(...params) as Course[];
    }
    return this.inMemoryStore.courses.filter(c => {
      if (language && c.language !== language) return false;
      if (level && c.level !== level) return false;
      return true;
    });
  }

  public getCourseById(id: string): Course | undefined {
    if (this.isBetterSqlite) {
      return this.db.prepare('SELECT * FROM courses WHERE id = ?').get(id) as Course | undefined;
    }
    return this.inMemoryStore.courses.find(c => c.id === id);
  }

  public getModulesByCourse(courseId: string): Module[] {
    if (this.isBetterSqlite) {
      return this.db.prepare('SELECT * FROM modules WHERE course_id = ? ORDER BY order_index ASC').all(courseId) as Module[];
    }
    return this.inMemoryStore.modules.filter(m => m.course_id === courseId);
  }

  public getTopicsByModule(moduleId: string): Topic[] {
    if (this.isBetterSqlite) {
      return this.db.prepare('SELECT * FROM topics WHERE module_id = ? ORDER BY order_index ASC').all(moduleId) as Topic[];
    }
    return this.inMemoryStore.topics.filter(t => t.module_id === moduleId);
  }

  public getTopicById(id: string): Topic | undefined {
    if (this.isBetterSqlite) {
      return this.db.prepare('SELECT * FROM topics WHERE id = ?').get(id) as Topic | undefined;
    }
    return this.inMemoryStore.topics.find(t => t.id === id);
  }

  public getMCQsByTopic(topicId: string): MCQQuestion[] {
    if (this.isBetterSqlite) {
      const rows = this.db.prepare('SELECT * FROM mcq_questions WHERE topic_id = ?').all(topicId) as any[];
      return rows.map(r => ({ ...r, options: JSON.parse(r.options) }));
    }
    return this.inMemoryStore.mcq_questions.filter(q => q.topic_id === topicId);
  }

  public getCodingQuestionsByTopic(topicId: string): CodingQuestion[] {
    if (this.isBetterSqlite) {
      const rows = this.db.prepare('SELECT * FROM coding_questions WHERE topic_id = ?').all(topicId) as any[];
      return rows.map(r => ({
        ...r,
        starter_code: JSON.parse(r.starter_code),
        test_cases: JSON.parse(r.test_cases)
      }));
    }
    return this.inMemoryStore.coding_questions.filter(cq => cq.topic_id === topicId);
  }

  // --- Telemetry & Events ---
  public recordBehaviorEvent(event: BehaviorEvent): void {
    const id = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const metadataStr = event.metadata ? JSON.stringify(event.metadata) : '{}';

    if (this.isBetterSqlite) {
      this.db.prepare(`
        INSERT INTO behavior_events (id, user_id, topic_id, event_type, duration, timestamp, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(id, event.user_id, event.topic_id, event.event_type, event.duration || 0, event.timestamp, metadataStr);
    } else {
      this.inMemoryStore.behavior_events.push({ ...event, id });
      this.persistJsonStore();
    }
  }

  public getTopicBehaviorSession(userId: string, topicId: string): BehaviorEvent[] {
    if (this.isBetterSqlite) {
      const rows = this.db.prepare(`
        SELECT * FROM behavior_events WHERE user_id = ? AND topic_id = ? ORDER BY timestamp ASC
      `).all(userId, topicId) as any[];
      return rows.map(r => ({
        ...r,
        metadata: r.metadata ? JSON.parse(r.metadata) : {}
      }));
    }
    return this.inMemoryStore.behavior_events.filter(e => e.user_id === userId && e.topic_id === topicId);
  }

  // --- Cognitive Predictions & Recommendations ---
  public saveCognitivePrediction(record: CognitivePredictionRecord): void {
    if (this.isBetterSqlite) {
      this.db.prepare(`
        INSERT INTO cognitive_predictions (id, user_id, topic_id, cognitive_load, confidence, probabilities, timestamp, factors)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(record.id, record.user_id, record.topic_id, record.cognitive_load, record.confidence, record.probabilities, record.timestamp, record.factors);
    } else {
      this.inMemoryStore.cognitive_predictions.push(record);
      this.persistJsonStore();
    }
  }

  public getCognitiveHistory(userId: string, limit = 10): CognitivePredictionRecord[] {
    if (this.isBetterSqlite) {
      return this.db.prepare(`
        SELECT * FROM cognitive_predictions WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?
      `).all(userId, limit) as CognitivePredictionRecord[];
    }
    return [...this.inMemoryStore.cognitive_predictions]
      .filter(p => p.user_id === userId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, limit);
  }

  public saveRecommendation(rec: AdaptiveRecommendationRecord): void {
    if (this.isBetterSqlite) {
      this.db.prepare(`
        INSERT INTO recommendations (id, user_id, recommended_action, recommended_topic_id, reason, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(rec.id, rec.user_id, rec.recommended_action, rec.recommended_topic_id, rec.reason, rec.timestamp);
    } else {
      this.inMemoryStore.recommendations.push(rec);
      this.persistJsonStore();
    }
  }

  public getLatestRecommendation(userId: string): AdaptiveRecommendationRecord | undefined {
    if (this.isBetterSqlite) {
      return this.db.prepare(`
        SELECT * FROM recommendations WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1
      `).get(userId) as AdaptiveRecommendationRecord | undefined;
    }
    const userRecs = this.inMemoryStore.recommendations
      .filter(r => r.user_id === userId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    return userRecs[0];
  }

  // --- Progress & Attempts ---
  public recordQuizAttempt(attempt: QuizAttemptRecord): void {
    if (this.isBetterSqlite) {
      this.db.prepare(`
        INSERT INTO quiz_attempts VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(attempt.id, attempt.user_id, attempt.topic_id, attempt.score, attempt.time_spent, attempt.passed, attempt.timestamp);
    } else {
      this.inMemoryStore.quiz_attempts.push(attempt);
      this.persistJsonStore();
    }
  }

  public recordCodingAttempt(attempt: CodingAttemptRecord): void {
    if (this.isBetterSqlite) {
      this.db.prepare(`
        INSERT INTO coding_attempts VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(attempt.id, attempt.user_id, attempt.topic_id, attempt.code, attempt.passed, attempt.execution_time, attempt.error_count, attempt.timestamp);
    } else {
      this.inMemoryStore.coding_attempts.push(attempt);
      this.persistJsonStore();
    }
  }

  public getUserProgress(userId: string): UserProgressRecord[] {
    if (this.isBetterSqlite) {
      return this.db.prepare('SELECT * FROM user_progress WHERE user_id = ?').all(userId) as UserProgressRecord[];
    }
    return this.inMemoryStore.user_progress.filter(p => p.user_id === userId);
  }

  public markTopicCompleted(userId: string, topicId: string, score: number): void {
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
    } else {
      const idx = this.inMemoryStore.user_progress.findIndex(p => p.user_id === userId && p.topic_id === topicId);
      if (idx >= 0) {
        this.inMemoryStore.user_progress[idx].completed = 1;
        this.inMemoryStore.user_progress[idx].score = score;
        this.inMemoryStore.user_progress[idx].last_studied = now;
      } else {
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
  public getAdminStats(): any {
    if (this.isBetterSqlite) {
      const userCount = (this.db.prepare('SELECT COUNT(*) as count FROM users').get() as any).count;
      const completedTopics = (this.db.prepare('SELECT COUNT(*) as count FROM user_progress WHERE completed = 1').get() as any).count;
      const totalEvents = (this.db.prepare('SELECT COUNT(*) as count FROM behavior_events').get() as any).count;
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

    const dist: Record<string, number> = { LOW: 0, MEDIUM: 0, HIGH: 0 };
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
}

export const dbService = new DatabaseService();
