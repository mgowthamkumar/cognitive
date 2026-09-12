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

  // AI Learning Assistant & RAG
  askAiAssistant: async (payload: {
    question: string;
    language?: string;
    level?: string;
    topic?: string;
    cognitive_load?: string;
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
  }
};
