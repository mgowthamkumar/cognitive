import path from 'path';
import fs from 'fs';
import { initialCurriculum } from '../data/curriculum.js';
import { initialProjects } from '../data/projectsData.js';
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
  AdaptiveAction,
  WeakConceptRecord,
  SpacedRevisionRecord,
  AchievementRecord,
  UserAchievementRecord,
  UserSessionRecord,
  ContentFeedbackRecord,
  RoadmapNode,
  ProjectRecord,
  ProjectEvaluationResult
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

const INITIAL_ACHIEVEMENTS: AchievementRecord[] = [
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
    weak_concepts: WeakConceptRecord[];
    spaced_revisions: SpacedRevisionRecord[];
    achievements: AchievementRecord[];
    user_achievements: UserAchievementRecord[];
    user_sessions: UserSessionRecord[];
    content_feedback: ContentFeedbackRecord[];
    projects: ProjectRecord[];
    project_submissions: ProjectEvaluationResult[];
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
      coding_attempts: [],
      weak_concepts: [],
      spaced_revisions: [],
      achievements: INITIAL_ACHIEVEMENTS,
      user_achievements: [],
      user_sessions: [],
      content_feedback: [],
      projects: initialProjects,
      project_submissions: []
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

  public getCognitivePredictionHistory(userId: string, limit = 10): CognitivePredictionRecord[] {
    return this.getCognitiveHistory(userId, limit);
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

  // --- Weak Concepts (Section 59) ---
  public getWeakConcepts(userId: string): WeakConceptRecord[] {
    return this.inMemoryStore.weak_concepts.filter(w => w.user_id === userId && w.status === 'active');
  }

  public recordWeakConcept(data: { userId: string; conceptName: string; topicId: string; language: string; isError?: boolean; isHint?: boolean; isFailure?: boolean }): void {
    const existing = this.inMemoryStore.weak_concepts.find(
      w => w.user_id === data.userId && w.topic_id === data.topicId && w.status === 'active'
    );
    if (existing) {
      if (data.isError) existing.error_count += 1;
      if (data.isHint) existing.hint_count += 1;
      if (data.isFailure) existing.failure_count += 1;
    } else {
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

  public resolveWeakConcept(id: string): void {
    const item = this.inMemoryStore.weak_concepts.find(w => w.id === id);
    if (item) {
      item.status = 'resolved';
      this.persistJsonStore();
    }
  }

  // --- Spaced Revision (Section 60) ---
  public getSpacedRevisions(userId: string): SpacedRevisionRecord[] {
    return this.inMemoryStore.spaced_revisions.filter(r => r.user_id === userId);
  }

  public scheduleSpacedRevision(userId: string, topicId: string, score: number): void {
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
    } else {
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
  public getUserAchievements(userId: string) {
    const unlocked = this.inMemoryStore.user_achievements.filter(u => u.user_id === userId);
    return {
      all: this.inMemoryStore.achievements,
      unlocked
    };
  }

  public unlockAchievement(userId: string, achievementCode: string): boolean {
    const alreadyUnlocked = this.inMemoryStore.user_achievements.some(
      u => u.user_id === userId && u.achievement_code === achievementCode
    );
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
  public saveContentFeedback(record: ContentFeedbackRecord): void {
    this.inMemoryStore.content_feedback.push(record);
    this.persistJsonStore();
  }

  // --- Platform Statistics for Landing Page (Section 43) ---
  public getPlatformStats() {
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
  public getUserSnapshot(userId: string) {
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
      if (p.cognitive_load === 'LOW') return { label: 'Comfortable', state: 'LOW', date: p.timestamp };
      if (p.cognitive_load === 'MEDIUM') return { label: 'Optimal Engagement', state: 'MEDIUM', date: p.timestamp };
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
  public getLanguageProgress(userId: string): Record<string, number> {
    const languages = ['python', 'c', 'cpp', 'java'];
    const result: Record<string, number> = {};

    for (const lang of languages) {
      const langCourseIds = this.inMemoryStore.courses.filter(c => c.language === lang).map(c => c.id);
      const langModuleIds = this.inMemoryStore.modules.filter(m => langCourseIds.includes(m.course_id)).map(m => m.id);
      const langTopics = this.inMemoryStore.topics.filter(t => langModuleIds.includes(t.module_id));
      const total = langTopics.length || 1;

      const completed = this.inMemoryStore.user_progress.filter(
        p => p.user_id === userId && p.completed === 1 && langTopics.some(t => t.id === p.topic_id)
      ).length;

      result[lang] = Math.round((completed / total) * 100);
    }

    // Ensure baseline progress for demo aesthetics
    if (result.python === 0) result.python = 45;
    if (result.c === 0) result.c = 25;
    if (result.cpp === 0) result.cpp = 15;
    if (result.java === 0) result.java = 20;

    return result;
  }

  // --- Language Visual Roadmap (Section 46) ---
  public getRoadmap(language: string, userId: string): RoadmapNode[] {
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

      let status: 'COMPLETED' | 'CURRENT' | 'LOCKED' | 'RECOMMENDED' | 'REVISION_REQUIRED' = 'LOCKED';
      if (isCompleted) {
        status = isWeak ? 'REVISION_REQUIRED' : 'COMPLETED';
      } else if (index === 0 || progressRecords.some(p => p.topic_id === langTopics[index - 1]?.id && p.completed === 1)) {
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
  public getProjects(language?: string, level?: string): ProjectRecord[] {
    return this.inMemoryStore.projects.filter(p => {
      if (language && p.language !== language) return false;
      if (level && level !== 'all' && p.level !== level) return false;
      return true;
    });
  }

  public getProjectById(id: string): ProjectRecord | undefined {
    return this.inMemoryStore.projects.find(p => p.id === id);
  }

  public saveProjectEvaluation(result: ProjectEvaluationResult): void {
    this.inMemoryStore.project_submissions.push(result);
    this.persistJsonStore();
  }

  public getUserProjectSubmissions(userId: string): ProjectEvaluationResult[] {
    return this.inMemoryStore.project_submissions.filter(s => s.user_id === userId);
  }
}

export const dbService = new DatabaseService();
