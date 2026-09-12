export type CognitiveLoadLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type AdaptiveAction =
  | 'CONTINUE'
  | 'SIMPLIFY'
  | 'EXPAND'
  | 'REVISE'
  | 'INCREASE_DIFFICULTY'
  | 'DECREASE_DIFFICULTY'
  | 'RECOMMEND_PREREQUISITE';

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'learner' | 'admin';
  created_at: string;
}

export interface UserPreferences {
  user_id: string;
  selected_language: string;
  current_level: string;
  preferred_mode: 'standard' | 'adaptive';
}

export interface Course {
  id: string;
  language: 'python' | 'c' | 'cpp' | 'java';
  level: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  order_index: number;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
}

export interface Topic {
  id: string;
  module_id: string;
  title: string;
  order_index: number;
  learning_objective: string;
  content_standard: string;
  content_low: string;    // Concise, advanced tips, high speed
  content_medium: string; // Balanced, guided examples
  content_high: string;   // Micro-steps, plain analogies, simplified syntax
  syntax: string;
  examples: string;
  common_mistakes: string;
  practice_prompt: string;
  prerequisite_topic_id?: string;
  sections?: TopicSection[];
}

export interface MCQQuestion {
  id: string;
  topic_id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

export interface TestCase {
  input: string;
  expected_output: string;
  is_hidden?: boolean;
}

export interface CodingQuestion {
  id: string;
  topic_id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problem_statement: string;
  input_format: string;
  output_format: string;
  constraints: string;
  sample_input: string;
  sample_output: string;
  starter_code: Record<string, string>; // language -> code template
  test_cases: TestCase[];
}

export interface BehaviorEvent {
  id?: string;
  user_id: string;
  topic_id: string;
  event_type:
    | 'PAGE_VIEW'
    | 'PAGE_REVISIT'
    | 'SCROLL'
    | 'MCQ_START'
    | 'MCQ_SUBMIT'
    | 'CODE_START'
    | 'CODE_SUBMIT'
    | 'HINT_REQUEST'
    | 'AI_EXPLANATION_REQUEST'
    | 'TOPIC_COMPLETE';
  duration?: number;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface CognitivePredictionResult {
  prediction: CognitiveLoadLevel;
  confidence: number;
  probabilities: Record<string, number>;
  unusual_completion: {
    is_unusual: boolean;
    reason: string;
  };
  contributing_factors: string[];
}

export type ContentDepth = 1 | 2 | 3 | 4; // 1=Quick, 2=Normal, 3=Detailed, 4=Deep

export type LearningMode =
  | 'STANDARD'
  | 'QUICK'
  | 'DEEP'
  | 'REVISION'
  | 'PRACTICE'
  | 'AI_GUIDED';

export type CodingErrorCategory =
  | 'SYNTAX_ERROR'
  | 'TYPE_ERROR'
  | 'LOGIC_ERROR'
  | 'RUNTIME_ERROR'
  | 'TIME_LIMIT'
  | 'WRONG_OUTPUT'
  | 'COMPILATION_ERROR';

export type AiTutorMode =
  | 'EXPLAIN'
  | 'SIMPLIFY'
  | 'EXAMPLE'
  | 'DEBUG'
  | 'HINT'
  | 'QUIZ'
  | 'REVISE'
  | 'ADVANCED';

export interface TopicSection {
  id: string;
  title: string;
  order_index: number;
  content: string;
  code_snippet?: string;
  pitfalls?: string;
  mini_check?: {
    question: string;
    options: string[];
    correct_index: number;
    explanation: string;
  };
}

export interface WeakConceptRecord {
  id: string;
  user_id: string;
  concept_name: string;
  topic_id: string;
  language: string;
  error_count: number;
  failure_count: number;
  hint_count: number;
  detected_at: string;
  status: 'active' | 'resolved';
}

export interface SpacedRevisionRecord {
  id: string;
  user_id: string;
  topic_id: string;
  review_count: number;
  last_review: string;
  next_review: string;
  retention_score: number;
  status: 'pending' | 'completed';
}

export interface AchievementRecord {
  id: string;
  code: string;
  title: string;
  description: string;
  badge_icon: string;
  category: 'code' | 'quiz' | 'streak' | 'mastery';
}

export interface UserAchievementRecord {
  id: string;
  user_id: string;
  achievement_code: string;
  unlocked_at: string;
}

export interface UserSessionRecord {
  id: string;
  user_id: string;
  session_start: string;
  session_end?: string;
  duration_seconds: number;
  topics_attempted: number;
  questions_answered: number;
  coding_attempts: number;
  errors_count: number;
  hints_count: number;
  ai_requests_count: number;
  average_score: number;
}

export interface ContentFeedbackRecord {
  id: string;
  user_id: string;
  topic_id: string;
  feedback: 'yes' | 'somewhat' | 'no';
  comment?: string;
  created_at: string;
}

export interface RoadmapNode {
  topic_id: string;
  title: string;
  module_title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'COMPLETED' | 'CURRENT' | 'LOCKED' | 'RECOMMENDED' | 'REVISION_REQUIRED';
  order_index: number;
  prerequisite_id?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  order_index: number;
  hints: string[];
  is_completed?: boolean;
}

export interface ProjectRecord {
  id: string;
  title: string;
  language: 'python' | 'c' | 'cpp' | 'java';
  level: 'beginner' | 'intermediate' | 'advanced';
  is_capstone: boolean;
  description: string;
  learning_objectives: string[];
  requirements: string[];
  starter_code: string;
  test_cases: TestCase[];
  milestones: ProjectMilestone[];
  evaluation_criteria: {
    correctness_weight: number;
    code_quality_weight: number;
    complexity_weight: number;
    test_cases_weight: number;
    best_practices_weight: number;
    concept_coverage_weight: number;
  };
}

export interface ProjectEvaluationResult {
  project_id: string;
  user_id: string;
  overall_score: number;
  passed: boolean;
  correctness: number;
  code_quality: number;
  complexity: number;
  test_case_score: number;
  best_practices: number;
  concept_coverage: number;
  feedback: string;
  detailed_rubric: {
    criterion: string;
    score: number;
    max_score: number;
    feedback: string;
  }[];
  submitted_at: string;
}

export interface IntegritySignalResult {
  status: 'normal' | 'unusual' | 'needs_review';
  confidence: number;
  signals: string[];
  explanation: string;
  details: {
    completion_time_seconds: number;
    keystroke_count: number;
    paste_event_count: number;
    typing_velocity_ratio: number;
  };
}
