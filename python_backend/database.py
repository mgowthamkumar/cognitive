"""
SQLite Database Layer for Python Backend Gateway
Manages persistent users, bookmarks, notes, learning sessions, and telemetry events.
"""
import sqlite3
import os
import json
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cognitive_py.db")

class PythonDatabase:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self.init_db()

    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def init_db(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                role TEXT DEFAULT 'student',
                selected_language TEXT DEFAULT 'python',
                current_level TEXT DEFAULT 'beginner',
                preferred_mode TEXT DEFAULT 'adaptive',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookmarks (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                item_type TEXT NOT NULL,
                item_id TEXT NOT NULL,
                title TEXT NOT NULL,
                snippet TEXT,
                language TEXT DEFAULT 'python',
                topic_id TEXT,
                link TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS notes (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                language TEXT NOT NULL,
                course_id TEXT,
                topic_id TEXT NOT NULL,
                subtopic_title TEXT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS learning_history (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                topic_id TEXT NOT NULL,
                topic_title TEXT NOT NULL,
                language TEXT NOT NULL,
                quiz_score INTEGER DEFAULT 0,
                coding_score INTEGER DEFAULT 0,
                time_spent INTEGER DEFAULT 0,
                cognitive_load TEXT DEFAULT 'MEDIUM',
                adaptive_action TEXT DEFAULT 'CONTINUE',
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """)

            cursor.execute("""
            CREATE TABLE IF NOT EXISTS telemetry_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                topic_id TEXT,
                event_type TEXT NOT NULL,
                duration REAL DEFAULT 0,
                metadata TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
            """)
            conn.commit()

    # User Management
    def create_user(self, user_id: str, name: str, email: str, password_hash: str, role: str = 'student') -> Dict[str, Any]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO users (id, name, email, password_hash, role)
            VALUES (?, ?, ?, ?, ?)
            """, (user_id, name, email, password_hash, role))
            conn.commit()
            return self.get_user_by_id(user_id)

    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def update_user_preferences(self, user_id: str, prefs: Dict[str, Any]):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE users SET
                selected_language = COALESCE(?, selected_language),
                current_level = COALESCE(?, current_level),
                preferred_mode = COALESCE(?, preferred_mode)
            WHERE id = ?
            """, (
                prefs.get("selected_language"),
                prefs.get("current_level"),
                prefs.get("preferred_mode"),
                user_id
            ))
            conn.commit()

    # Bookmarks
    def add_bookmark(self, bm: Dict[str, Any]):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO bookmarks (id, user_id, item_type, item_id, title, snippet, language, topic_id, link)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                bm["id"], bm["user_id"], bm["item_type"], bm["item_id"],
                bm["title"], bm.get("snippet", ""), bm.get("language", "python"),
                bm.get("topic_id", ""), bm.get("link", "")
            ))
            conn.commit()

    def get_bookmarks(self, user_id: str, item_type: Optional[str] = None) -> List[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            if item_type and item_type != 'all':
                cursor.execute("SELECT * FROM bookmarks WHERE user_id = ? AND item_type = ? ORDER BY created_at DESC", (user_id, item_type))
            else:
                cursor.execute("SELECT * FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC", (user_id,))
            return [dict(r) for r in cursor.fetchall()]

    def delete_bookmark(self, bm_id: str, user_id: str) -> bool:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM bookmarks WHERE id = ? AND user_id = ?", (bm_id, user_id))
            conn.commit()
            return cursor.rowcount > 0

    def is_bookmarked(self, user_id: str, item_type: str, item_id: str) -> bool:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1 FROM bookmarks WHERE user_id = ? AND item_type = ? AND item_id = ?", (user_id, item_type, item_id))
            return cursor.fetchone() is not None

    # Notes
    def add_note(self, note: Dict[str, Any]):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO notes (id, user_id, language, course_id, topic_id, subtopic_title, title, content)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                note["id"], note["user_id"], note["language"], note.get("course_id", ""),
                note["topic_id"], note.get("subtopic_title", ""), note["title"], note["content"]
            ))
            conn.commit()

    def get_notes(self, user_id: str, query: Optional[str] = None, language: Optional[str] = None, topic_id: Optional[str] = None) -> List[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            sql = "SELECT * FROM notes WHERE user_id = ?"
            params = [user_id]
            if language and language != 'all':
                sql += " AND language = ?"
                params.append(language)
            if topic_id and topic_id != 'all':
                sql += " AND topic_id = ?"
                params.append(topic_id)
            if query:
                sql += " AND (title LIKE ? OR content LIKE ?)"
                params.extend([f"%{query}%", f"%{query}%"])
            sql += " ORDER BY updated_at DESC"
            cursor.execute(sql, params)
            return [dict(r) for r in cursor.fetchall()]

    def update_note(self, note_id: str, user_id: str, title: Optional[str], content: Optional[str], subtopic: Optional[str]) -> Optional[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            UPDATE notes SET
                title = COALESCE(?, title),
                content = COALESCE(?, content),
                subtopic_title = COALESCE(?, subtopic_title),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ? AND user_id = ?
            """, (title, content, subtopic, note_id, user_id))
            conn.commit()
            if cursor.rowcount > 0:
                cursor.execute("SELECT * FROM notes WHERE id = ?", (note_id,))
                return dict(cursor.fetchone())
            return None

    def delete_note(self, note_id: str, user_id: str) -> bool:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM notes WHERE id = ? AND user_id = ?", (note_id, user_id))
            conn.commit()
            return cursor.rowcount > 0

    # Learning History
    def log_learning_session(self, session: Dict[str, Any]):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO learning_history (id, user_id, topic_id, topic_title, language, quiz_score, coding_score, time_spent, cognitive_load, adaptive_action)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                session["id"], session["user_id"], session["topic_id"], session["topic_title"],
                session["language"], session.get("quiz_score", 0), session.get("coding_score", 0),
                session.get("time_spent", 0), session.get("cognitive_load", "MEDIUM"), session.get("adaptive_action", "CONTINUE")
            ))
            conn.commit()

    def get_learning_history(self, user_id: str) -> List[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM learning_history WHERE user_id = ? ORDER BY timestamp DESC", (user_id,))
            return [dict(r) for r in cursor.fetchall()]

    # Telemetry Ingestion
    def log_telemetry_event(self, user_id: str, topic_id: Optional[str], event_type: str, duration: float, metadata: Optional[Dict[str, Any]] = None):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO telemetry_events (user_id, topic_id, event_type, duration, metadata)
            VALUES (?, ?, ?, ?, ?)
            """, (user_id, topic_id, event_type, duration, json.dumps(metadata or {})))
            conn.commit()

    def get_telemetry_count(self) -> int:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM telemetry_events")
            return cursor.fetchone()[0]

db = PythonDatabase()
