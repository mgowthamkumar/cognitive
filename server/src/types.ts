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
