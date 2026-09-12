const API_BASE = '/api';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserPreferences {
  selected_language: string;
  current_level: string;
  preferred_mode: 'standard' | 'adaptive';
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('cognitive_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  // Auth
  register: async (payload: { name: string; email: string; password: string; role?: string }) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to register');
    return res.json();
  },

  login: async (payload: { email: string; password: string }) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to login');
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Session expired or unauthorized');
    return res.json();
  },

  updatePreferences: async (prefs: Partial<UserPreferences>) => {
    const res = await fetch(`${API_BASE}/auth/preferences`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(prefs)
    });
    return res.json();
  },

  // Courses & Topics
  getCourses: async (language?: string, level?: string) => {
    const params = new URLSearchParams();
    if (language) params.append('language', language);
    if (level) params.append('level', level);
    const res = await fetch(`${API_BASE}/courses?${params.toString()}`);
    return res.json();
  },

  getCourseStructure: async (courseId: string) => {
    const res = await fetch(`${API_BASE}/courses/${courseId}`);
    return res.json();
  },

  getTopicDetail: async (topicId: string) => {
    const res = await fetch(`${API_BASE}/topics/${topicId}`);
    return res.json();
  },

  // Quizzes
  getTopicQuiz: async (topicId: string) => {
    const res = await fetch(`${API_BASE}/topics/${topicId}/quiz`);
    return res.json();
  },

  submitTopicQuiz: async (topicId: string, answers: Record<string, number>, timeSpentSeconds: number) => {
    const res = await fetch(`${API_BASE}/topics/${topicId}/quiz/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers, time_spent: timeSpentSeconds })
    });
    return res.json();
  },

  // Code Sandbox
  getTopicCodingChallenge: async (topicId: string) => {
    const res = await fetch(`${API_BASE}/topics/${topicId}/coding`);
    return res.json();
  },

  runCode: async (code: string, language: string, customInput?: string) => {
    const res = await fetch(`${API_BASE}/code/run`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ code, language, custom_input: customInput })
    });
    return res.json();
  },

  submitCode: async (payload: {
    topicId: string;
    code: string;
    language: string;
    codingTimeSeconds: number;
    keystrokes: number;
    pasteEvents: number;
  }) => {
    const res = await fetch(`${API_BASE}/code/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        topicId: payload.topicId,
        code: payload.code,
        language: payload.language,
        coding_time_seconds: payload.codingTimeSeconds,
        keystrokes: payload.keystrokes,
        paste_events: payload.pasteEvents
      })
    });
    return res.json();
  },

  // Telemetry Event Tracker (Section 23)
  sendTelemetryEvent: async (event: {
    topic_id: string;
    event_type: string;
    duration?: number;
    metadata?: Record<string, any>;
  }) => {
    try {
      await fetch(`${API_BASE}/behavior/event`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(event)
      });
    } catch (e) {
      // Non-blocking telemetry
    }
  },

  // Adaptive Engine
  evaluateAdaptive: async (topicId: string, language: string) => {
    const res = await fetch(`${API_BASE}/adaptive/evaluate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ topic_id: topicId, language })
    });
    return res.json();
  },

  getCognitiveHistory: async (limit = 10) => {
    const res = await fetch(`${API_BASE}/adaptive/history?limit=${limit}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getLatestRecommendation: async () => {
    const res = await fetch(`${API_BASE}/adaptive/recommendation`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Platform Public Stats (Section 43)
  getPlatformStats: async () => {
    const res = await fetch(`${API_BASE}/stats/platform`);
    return res.json();
  },

  // Dashboard & Roadmaps (Section 44, 46)

  getDashboardSnapshot: async () => {
    const res = await fetch(`${API_BASE}/dashboard/snapshot`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getUserSnapshot: async () => {
    const res = await fetch(`${API_BASE}/dashboard/snapshot`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  getLanguageRoadmap: async (language: string) => {
    const res = await fetch(`${API_BASE}/dashboard/roadmap/${language}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  submitContentFeedback: async (topicId: string, feedback: 'yes' | 'somewhat' | 'no', comment?: string) => {
    const res = await fetch(`${API_BASE}/feedback/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ topic_id: topicId, feedback, comment })
    });
    return res.json();
  },

  // AI Learning Assistant & RAG
  askAiAssistant: async (payload: {
    question: string;
    language?: string;
    level?: string;
    topic?: string;
    cognitive_load?: string;
    tutor_mode?: string;
    code_context?: string;
  }) => {
    const res = await fetch(`${API_BASE}/ai/ask`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  requestProgressiveHint: async (payload: {
    question: string;
    code_snippet?: string;
    hint_level: number;
    topic?: string;
    language?: string;
  }) => {
    const res = await fetch(`${API_BASE}/ai/hint`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // Admin Analytics
  getAdminAnalytics: async () => {
    const res = await fetch(`${API_BASE}/admin/analytics`);
    return res.json();
  },

  getMLMetrics: async () => {
    const res = await fetch(`${API_BASE}/admin/ml-metrics`);
    return res.json();
  },

  retrainMLModel: async () => {
    const res = await fetch(`${API_BASE}/admin/retrain-ml`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to retrain ML models');
    return res.json();
  },

  reindexRAG: async () => {
    const res = await fetch(`${API_BASE}/admin/reindex-rag`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to reindex knowledge base');
    return res.json();
  },

  runSystemDiagnostics: async () => {
    const res = await fetch(`${API_BASE}/admin/run-diagnostics`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to execute system diagnostics');
    return res.json();
  },

  // Project-Based Learning & Capstones (Sections 82 & 83)
  getProjects: async (language?: string, level?: string) => {
    const params = new URLSearchParams();
    if (language) params.append('language', language);
    if (level) params.append('level', level);
    const res = await fetch(`${API_BASE}/projects?${params.toString()}`);
    return res.json();
  },

  getProjectDetail: async (projectId: string) => {
    const res = await fetch(`${API_BASE}/projects/${projectId}`);
    return res.json();
  },

  submitProject: async (projectId: string, payload: { code: string; completion_time_seconds?: number; keystrokes?: number; paste_events?: number }) => {
    const res = await fetch(`${API_BASE}/projects/${projectId}/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error((await res.json()).error || 'Failed to evaluate project');
    return res.json();
  },

  // Diagnostic Assessment (Section 109)
  getDiagnosticQuestions: async (language: string) => {
    const res = await fetch(`${API_BASE}/diagnostic/${language}/questions`);
    if (!res.ok) throw new Error('Failed to fetch diagnostic questions');
    return res.json();
  },

  submitDiagnostic: async (language: string, answers: Record<string, number>) => {
    const res = await fetch(`${API_BASE}/diagnostic/${language}/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers })
    });
    if (!res.ok) throw new Error('Failed to submit diagnostic assessment');
    return res.json();
  },

  // Global Search System (Section 111)
  globalSearch: async (query: string, language?: string) => {
    const params = new URLSearchParams({ q: query });
    if (language) params.append('language', language);
    const res = await fetch(`${API_BASE}/search?${params.toString()}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  // Bookmarking System (Section 112)
  getBookmarks: async (type?: string) => {
    const params = new URLSearchParams();
    if (type && type !== 'all') params.append('type', type);
    const res = await fetch(`${API_BASE}/bookmarks?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch bookmarks');
    return res.json();
  },

  addBookmark: async (payload: { item_type: string; item_id: string; title: string; snippet?: string; language?: string; topic_id?: string }) => {
    const res = await fetch(`${API_BASE}/bookmarks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save bookmark');
    return res.json();
  },

  deleteBookmark: async (id: string) => {
    const res = await fetch(`${API_BASE}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete bookmark');
    return res.json();
  },

  checkBookmarkStatus: async (itemType: string, itemId: string) => {
    const params = new URLSearchParams({ item_type: itemType, item_id: itemId });
    const res = await fetch(`${API_BASE}/bookmarks/check?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) return { is_bookmarked: false };
    return res.json();
  },

  // Notes System (Section 113)
  getNotes: async (query?: string, language?: string, topicId?: string) => {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (language && language !== 'all') params.append('language', language);
    if (topicId && topicId !== 'all') params.append('topic_id', topicId);
    const res = await fetch(`${API_BASE}/notes?${params.toString()}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch notes');
    return res.json();
  },

  createNote: async (payload: { language: string; course_id?: string; topic_id: string; subtopic_title?: string; title: string; content: string }) => {
    const res = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create note');
    return res.json();
  },

  updateNote: async (id: string, payload: { title?: string; content?: string; subtopic_title?: string }) => {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to update note');
    return res.json();
  },

  deleteNote: async (id: string) => {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete note');
    return res.json();
  },

  // Learning History (Section 114)
  getLearningHistory: async () => {
    const res = await fetch(`${API_BASE}/learning-history`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch learning history');
    return res.json();
  }
};
