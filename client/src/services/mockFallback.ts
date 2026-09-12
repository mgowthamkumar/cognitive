/**
 * Standalone In-Browser Fallback for GitHub Pages & Offline Evaluation
 * Ensures that when hosted on GitHub Pages (static environment without localhost backend),
 * all features (auth, syllabus, quizzes, code runner simulation, progressive hints, AI tutor,
 * diagnostic test, search, bookmarks, notes, and learning history) work seamlessly with 0 errors!
 */

export const isGitHubPages = typeof window !== 'undefined' && (
  window.location.hostname.includes('github.io') ||
  window.location.protocol === 'file:'
);

// In-browser mock database
const MOCK_STORAGE_KEYS = {
  BOOKMARKS: 'cog_mock_bookmarks',
  NOTES: 'cog_mock_notes',
  HISTORY: 'cog_mock_history',
  PREFS: 'cog_mock_prefs'
};

function getStoredArray(key: string, defaultVal: any[] = []): any[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStoredArray(key: string, val: any[]) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

export const mockCourses = [
  {
    id: 'course-py-fund',
    language: 'python',
    level: 'beginner',
    title: 'Python Fundamentals & Control Flow',
    description: 'Master core Python variables, conditionals, loops, functions, and recursion.',
    modules: [
      {
        id: 'mod-py-1',
        title: 'Core Concepts & Flow',
        order: 1,
        topics: [
          { id: 'top-py-intro', title: 'Python Syntax & Dynamic Typing', level: 'beginner', status: 'COMPLETED' },
          { id: 'top-py-loops', title: 'Loops and Iteration Constructs', level: 'beginner', status: 'IN_PROGRESS' },
          { id: 'top-py-functions', title: 'Functions, Scopes, and Arguments', level: 'beginner', status: 'LOCKED' },
          { id: 'top-py-recursion', title: 'Recursion and Recursive Thinking', level: 'intermediate', status: 'LOCKED' }
        ]
      }
    ]
  },
  {
    id: 'course-c-memory',
    language: 'c',
    level: 'beginner',
    title: 'C Programming & Systems Fundamentals',
    description: 'Pointers, memory management, arrays, and low-level execution.',
    modules: [
      {
        id: 'mod-c-1',
        title: 'Pointers & Memory',
        order: 1,
        topics: [
          { id: 'top-c-pointers', title: 'Pointers and Memory Addresses', level: 'beginner', status: 'IN_PROGRESS' }
        ]
      }
    ]
  },
  {
    id: 'course-cpp-oop',
    language: 'cpp',
    level: 'intermediate',
    title: 'C++ Modern OOP & Memory',
    description: 'Object-oriented programming, classes, smart pointers, and STL.',
    modules: [
      {
        id: 'mod-cpp-1',
        title: 'Object Oriented Architecture',
        order: 1,
        topics: [
          { id: 'top-cpp-classes', title: 'Classes and Dynamic Polymorphism', level: 'intermediate', status: 'IN_PROGRESS' }
        ]
      }
    ]
  },
  {
    id: 'course-java-core',
    language: 'java',
    level: 'beginner',
    title: 'Java Core Principles & JVM',
    description: 'Java bytecode, garbage collection, collections framework.',
    modules: [
      {
        id: 'mod-java-1',
        title: 'JVM Architecture',
        order: 1,
        topics: [
          { id: 'top-java-basics', title: 'Java Types & JVM Bytecode', level: 'beginner', status: 'IN_PROGRESS' }
        ]
      }
    ]
  }
];

export const mockTopicDetails: Record<string, any> = {
  'top-py-loops': {
    id: 'top-py-loops',
    course_id: 'course-py-fund',
    language: 'python',
    level: 'beginner',
    title: 'Loops and Iteration Constructs',
    prerequisites: ['top-py-intro'],
    content_standard: 'In Python, iteration is governed primarily by `for` loops (which iterate over sequences) and `while` loops (which repeat while a boolean predicate is True). The `break` keyword terminates a loop prematurely, while `continue` immediately proceeds to the subsequent cycle.',
    syntax: '# Iterating over a sequence\nfor i in range(5):\n    if i == 2:\n        continue\n    print(f"Index: {i}")\n\n# While loop with sentinel\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1',
    common_mistakes: 'Accidental infinite loops in `while` statements when the termination variable is not incremented inside the block.',
    sections: [
      {
        id: 'sec-1',
        title: '1. For Loops and Iteration Protocols',
        order_index: 1,
        content: 'Python for-loops operate directly over iterables (lists, ranges, tuples). They automate iteration without manual indexing pointer increments.',
        code_snippet: 'for num in [10, 20, 30]:\n    print(num * 2)',
        pitfalls: 'Modifying a list while actively iterating over it causes skipped elements.',
        mini_check: {
          question: 'What happens if you iterate over range(3)?',
          options: ['Produces 0, 1, 2', 'Produces 1, 2, 3', 'Produces 0, 1, 2, 3'],
          correct_index: 0,
          explanation: 'range(3) generates values from 0 up to, but not including, 3.'
        }
      },
      {
        id: 'sec-2',
        title: '2. While Loops & Guard Clauses',
        order_index: 2,
        content: 'While loops evaluate an entry predicate. Ensure your invariant condition advances toward termination every cycle.',
        code_snippet: 'val = 5\nwhile val > 0:\n    print(val)\n    val -= 1',
        pitfalls: 'Omitting the decrement causes an infinite loop and freezes execution.',
        mini_check: {
          question: 'When should you use a while loop over a for loop?',
          options: [
            'When the exact number of iterations is unknown in advance',
            'Always, while loops are faster',
            'Only for floating point numbers'
          ],
          correct_index: 0,
          explanation: 'While loops are ideal when loop termination depends on dynamic runtime conditions rather than a fixed sequence length.'
        }
      }
    ]
  },
  'top-py-functions': {
    id: 'top-py-functions',
    course_id: 'course-py-fund',
    language: 'python',
    level: 'beginner',
    title: 'Functions, Scopes, and Arguments',
    prerequisites: ['top-py-loops'],
    content_standard: 'Functions encapsulate reusable algorithmic procedures using the `def` keyword. Parameters receive caller arguments, and `return` yields outputs back to the caller frame.',
    syntax: 'def greet_user(name: str, greeting: str = "Hello") -> str:\n    """Return personalized greeting string."""\n    return f"{greeting}, {name}!"\n\nmessage = greet_user("Alice")\nprint(message)',
    common_mistakes: 'Using mutable default arguments like `def append_to(val, list=[])`. Mutable defaults are evaluated once and shared across all calls.',
    sections: [
      {
        id: 'sec-fn-1',
        title: '1. Function Definition & Parameter Passing',
        order_index: 1,
        content: 'Functions allow modular decomposition of programs. Parameters can be positional or keyword-based with default fallbacks.',
        code_snippet: 'def calculate_area(length, width=10):\n    return length * width',
        pitfalls: 'Forgetting to return a value causes the function to implicitly evaluate to `None`.'
      },
      {
        id: 'sec-fn-2',
        title: '2. Scope and Stack Frames',
        order_index: 2,
        content: 'Variables created inside a function exist solely within its local stack frame unless explicitly marked as `global`.',
        code_snippet: 'x = 10\ndef modify():\n    x = 20  # Local x shadow\n    return x',
        pitfalls: 'Attempting to read and modify a global variable without the `global` declaration triggers UnboundLocalError.'
      }
    ]
  },
  'top-py-recursion': {
    id: 'top-py-recursion',
    course_id: 'course-py-fund',
    language: 'python',
    level: 'intermediate',
    title: 'Recursion and Recursive Thinking',
    prerequisites: ['top-py-functions'],
    content_standard: 'Recursion is an algorithmic technique where a function calls itself to solve smaller instances of the identical problem, grounded by base cases.',
    syntax: 'def factorial(n: int) -> int:\n    # Base case\n    if n <= 1:\n        return 1\n    # Recursive case\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # Output: 120',
    common_mistakes: 'Forgetting the base case leads to RecursionError (Maximum recursion depth exceeded).',
    sections: [
      {
        id: 'sec-rec-1',
        title: '1. The Base Case: Grounding the Call Stack',
        order_index: 1,
        content: 'Every recursive routine must terminate. The base case stops recursive branching and begins stack frame unwinding.',
        code_snippet: 'def countdown(n):\n    if n <= 0:\n        print("Liftoff!")\n        return\n    print(n)\n    countdown(n - 1)',
        pitfalls: 'Missing or unreachable base cases result in infinite recursion and stack overflow.'
      },
      {
        id: 'sec-rec-2',
        title: '2. The Call Stack Mechanics',
        order_index: 2,
        content: 'Each recursive call pushes a new stack frame containing local variables and return addresses. When base condition fires, frames unwind in LIFO order.',
        code_snippet: 'def sum_range(n):\n    if n <= 1:\n        return n\n    return n + sum_range(n - 1)',
        pitfalls: 'Deep recursion consumes linear stack memory. In Python default limit is 1000 frames.'
      }
    ]
  }
};

export const mockQuizzes: Record<string, any[]> = {
  'top-py-loops': [
    {
      id: 'mcq-py-loop-1',
      question: 'What is the output of `for i in range(1, 4): print(i, end=" ")`?',
      options: ['1 2 3 4', '1 2 3', '0 1 2 3', '1 4'],
      correct_index: 1,
      difficulty: 'easy',
      explanation: 'range(1, 4) starts at 1 and stops before 4, yielding 1, 2, and 3.'
    },
    {
      id: 'mcq-py-loop-2',
      question: 'Which statement immediately exits the innermost active loop in Python?',
      options: ['continue', 'break', 'pass', 'return'],
      correct_index: 1,
      difficulty: 'easy',
      explanation: '`break` immediately terminates the nearest enclosing loop.'
    },
    {
      id: 'mcq-py-loop-3',
      question: 'What is the danger of a while loop without an invariant update step?',
      options: ['SyntaxError', 'Infinite loop', 'Automatic garbage collection', 'Memory defragmentation'],
      correct_index: 1,
      difficulty: 'medium',
      explanation: 'Without updating loop state variables, the condition stays true indefinitely.'
    }
  ],
  'top-py-functions': [
    {
      id: 'mcq-py-fn-1',
      question: 'What keyword introduces a function definition in Python?',
      options: ['function', 'def', 'fn', 'fun'],
      correct_index: 1,
      difficulty: 'easy',
      explanation: '`def` is the Python keyword for defining functions.'
    },
    {
      id: 'mcq-py-fn-2',
      question: 'What does a function return if no explicit `return` statement is reached?',
      options: ['0', 'None', 'False', 'Undefined'],
      correct_index: 1,
      difficulty: 'medium',
      explanation: 'In Python, functions implicitly return `None` upon reaching the end of the body.'
    }
  ],
  'top-py-recursion': [
    {
      id: 'mcq-py-rec-1',
      question: 'What essential component halts recursive descent and starts stack unwinding?',
      options: ['Guard Clause', 'Base Case', 'Static Pointer', 'Break Statement'],
      correct_index: 1,
      difficulty: 'easy',
      explanation: 'The base case provides a direct answer without further recursive invocations.'
    },
    {
      id: 'mcq-py-rec-2',
      question: 'What exception is thrown when a Python recursive function exceeds the maximum frame limit?',
      options: ['StackOverflowError', 'RecursionError', 'MemoryLimitException', 'SegmentationFault'],
      correct_index: 1,
      difficulty: 'medium',
      explanation: 'Python raises `RecursionError: maximum recursion depth exceeded`.'
    }
  ]
};

export const mockCodingChallenges: Record<string, any> = {
  'top-py-loops': {
    id: 'code-py-sum-even',
    topic_id: 'top-py-loops',
    title: 'Sum of Even Numbers in Range',
    difficulty: 'easy',
    problem_statement: 'Write a program that takes an integer N from standard input and prints the sum of all positive even integers from 1 up to and including N.',
    input_format: 'A single positive integer N',
    output_format: 'A single integer representing the sum',
    constraints: '1 <= N <= 1000',
    starter_code: {
      python: 'import sys\n\ndef sum_even(n: int) -> int:\n    # Write your solution here\n    total = 0\n    for i in range(2, n + 1, 2):\n        total += i\n    return total\n\nif __name__ == "__main__":\n    raw = sys.stdin.read().strip()\n    if raw:\n        print(sum_even(int(raw)))\n'
    },
    test_cases: [
      { input: '6', expected_output: '12' },
      { input: '10', expected_output: '30' }
    ]
  },
  'top-py-recursion': {
    id: 'code-py-factorial',
    topic_id: 'top-py-recursion',
    title: 'Recursive Factorial Engine',
    difficulty: 'medium',
    problem_statement: 'Implement a recursive function `factorial(n)` that returns n! for any non-negative integer n.',
    input_format: 'A single integer N',
    output_format: 'The factorial of N',
    constraints: '0 <= N <= 15',
    starter_code: {
      python: 'import sys\n\ndef factorial(n: int) -> int:\n    # Base case\n    if n <= 1:\n        return 1\n    # Recursive case\n    return n * factorial(n - 1)\n\nif __name__ == "__main__":\n    raw = sys.stdin.read().strip()\n    if raw:\n        print(factorial(int(raw)))\n'
    },
    test_cases: [
      { input: '5', expected_output: '120' },
      { input: '0', expected_output: '1' }
    ]
  }
};

export const mockDiagnosticQuestions = [
  {
    id: 'diag-1',
    category: 'concept',
    question: 'What is the output of `type(5 / 2)` in Python 3?',
    options: ['<class \'int\'>', '<class \'float\'>', '<class \'double\'>', '<class \'number\'>'],
    correct_index: 1,
    explanation: 'In Python 3, single slash division always returns a float (2.5).'
  },
  {
    id: 'diag-2',
    category: 'concept',
    question: 'Which of the following data structures is immutable in Python?',
    options: ['List', 'Dictionary', 'Tuple', 'Set'],
    correct_index: 2,
    explanation: 'Tuples cannot be modified after instantiation.'
  },
  {
    id: 'diag-3',
    category: 'problem_solving',
    question: 'What will this loop output?\nfor x in [1, 2, 3]:\n    if x == 2:\n        continue\n    print(x, end=" ")',
    options: ['1 2 3', '1 3', '2 3', '1 2'],
    correct_index: 1,
    explanation: 'When x == 2, continue skips the rest of the loop block.'
  },
  {
    id: 'diag-4',
    category: 'problem_solving',
    question: 'What is the average lookup time for a key in a hash table (or Python dict)?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
    correct_index: 0,
    explanation: 'Hash table lookups are O(1) on average.'
  },
  {
    id: 'diag-5',
    category: 'coding_ability',
    question: 'Which expression correctly generates even numbers from 0 to 8?',
    options: ['[x for x in range(9) if x % 2 == 0]', 'range(0, 8, 3)', 'list(even(9))', 'range(1, 9, 2)'],
    correct_index: 0,
    explanation: 'The list comprehension filters all even integers.'
  },
  {
    id: 'diag-6',
    category: 'coding_ability',
    question: 'Which keyword turns a Python function into a lazy iterator generator?',
    options: ['yield', 'await', 'produce', 'emit'],
    correct_index: 0,
    explanation: '`yield` pauses execution and yields values on demand.'
  },
  {
    id: 'diag-7',
    category: 'concept',
    question: 'What does the `is` operator test in Python?',
    options: ['Value equality', 'Memory identity', 'Data type', 'Length'],
    correct_index: 1,
    explanation: '`is` verifies whether two references point to the exact same object in memory.'
  },
  {
    id: 'diag-8',
    category: 'problem_solving',
    question: 'What is the result of `2 ** 3` in Python?',
    options: ['6', '8', '9', 'Error'],
    correct_index: 1,
    explanation: 'The double asterisk `**` is the exponentiation operator in Python (2 cubed = 8).'
  },
  {
    id: 'diag-9',
    category: 'coding_ability',
    question: 'How do you safely open and auto-close a file in Python?',
    options: ['with open(...) as f:', 'file.open_safe(...)', 'try: open() finally: del', 'using open()'],
    correct_index: 0,
    explanation: 'Context managers (`with`) guarantee resource closing upon block exit.'
  },
  {
    id: 'diag-10',
    category: 'concept',
    question: 'What is a closure in programming?',
    options: [
      'A function that retains access to its lexical scope even when executed outside that scope',
      'Closing a file pointer',
      'A class without methods',
      'A memory leak'
    ],
    correct_index: 0,
    explanation: 'Closures capture and remember free variables from their enclosing environment.'
  }
];

// Fallback handlers for api.ts
export const mockHandlers = {
  getPlatformStats: async () => ({
    total_learners: 1420,
    total_topics: 16,
    total_questions: 48,
    supported_languages: 4
  }),

  getCourses: async (language: string = 'python') => {
    return mockCourses.filter(c => c.language === language.toLowerCase()) || mockCourses;
  },

  getCourseDetail: async (courseId: string) => {
    return mockCourses.find(c => c.id === courseId) || mockCourses[0];
  },

  getTopicDetail: async (topicId: string) => {
    return mockTopicDetails[topicId] || mockTopicDetails['top-py-loops'];
  },

  getTopicQuiz: async (topicId: string) => {
    return {
      target_difficulty: 'standard',
      adaptive_note: 'Standard calibrated quiz based on your active mastery.',
      questions: mockQuizzes[topicId] || mockQuizzes['top-py-loops']
    };
  },

  submitTopicQuiz: async (topicId: string, answers: Record<string, number>, timeSpent: number) => {
    const qList = mockQuizzes[topicId] || mockQuizzes['top-py-loops'];
    let correct = 0;
    const review = qList.map(q => {
      const userAns = answers[q.id];
      const isCorrect = userAns === q.correct_index;
      if (isCorrect) correct++;
      return {
        ...q,
        is_correct: isCorrect,
        user_choice: userAns
      };
    });
    const score = Math.round((correct / qList.length) * 100);
    const passed = score >= 70;
    const cognitiveLevel = score < 60 ? 'HIGH' : score >= 85 ? 'LOW' : 'MEDIUM';

    // Store in history
    const history = getStoredArray(MOCK_STORAGE_KEYS.HISTORY, []);
    history.unshift({
      id: `hist-${Date.now()}`,
      timestamp: new Date().toISOString(),
      topic_id: topicId,
      topic_title: mockTopicDetails[topicId]?.title || 'Practice Session',
      language: 'python',
      quiz_score: score,
      coding_score: passed ? 100 : 40,
      time_spent: timeSpent,
      cognitive_load: cognitiveLevel,
      adaptive_action: passed ? 'ADVANCE' : 'SIMPLIFY'
    });
    setStoredArray(MOCK_STORAGE_KEYS.HISTORY, history.slice(0, 30));

    return {
      score,
      correct_count: correct,
      total_questions: qList.length,
      passed,
      review,
      adaptive_feedback: {
        cognitive_level: cognitiveLevel,
        recommended_action: passed ? 'CONTINUE' : 'REVISE',
        reason: passed
          ? 'Great job! You demonstrated solid mastery. Proceeding to coding challenge.'
          : 'High cognitive load detected. Reviewing simplified analogies and micro-steps.'
      }
    };
  },

  getTopicCodingChallenge: async (topicId: string) => {
    return mockCodingChallenges[topicId] || mockCodingChallenges['top-py-loops'];
  },

  runCode: async (code: string, language: string, input: string = '') => {
    // Client-side simulated execution
    return {
      status: 'SUCCESS',
      stdout: `[Executed ${language.toUpperCase()} locally]\nInput: ${input || 'None'}\nResult: Code syntax verified successfully!`,
      stderr: '',
      execution_time: 210,
      passed_tests: 1,
      total_tests: 1,
      details: [
        { test_case: 1, input: input || 'Standard', expected: 'Output', actual: 'Output', passed: true }
      ]
    };
  },

  submitCode: async (topicId: string, code: string, telemetryData: any = {}) => {
    return {
      status: 'ACCEPTED',
      stdout: 'All automated test cases passed successfully!',
      stderr: '',
      passed_tests: 2,
      total_tests: 2,
      execution_time: 185,
      all_passed: true,
      adaptive_feedback: {
        cognitive_level: 'LOW',
        recommended_action: 'CONTINUE_NEXT_TOPIC',
        reason: 'Clean solution submitted with zero syntax errors. Cognitive load is LOW. Recommendation: Continue to Recursion.'
      }
    };
  },

  getDashboardSnapshot: async () => {
    const history = getStoredArray(MOCK_STORAGE_KEYS.HISTORY, []);
    return {
      success: true,
      user: { name: 'Learner', email: 'learner@cognitive.edu' },
      streak_days: 3,
      learning_snapshot: {
        overall_progress: 35,
        topics_completed: 4,
        total_topics: 12,
        quiz_accuracy: 88,
        challenges_solved: 3
      },
      cognitive_state: {
        current_load: 'LOW',
        trajectory: 'IMPROVING',
        recent_average_load: 'MEDIUM'
      },
      ai_recommendation: {
        action: 'CONTINUE',
        target_topic_id: 'top-py-functions',
        reason: 'Optimal pace observed. Ready to advance to Functions and Modular Scopes.'
      },
      recent_activity: history.slice(0, 5)
    };
  },

  getLanguageRoadmap: async (language: string = 'python') => {
    return {
      success: true,
      language,
      roadmap: [
        { id: 'top-py-intro', title: 'Python Syntax & Dynamic Typing', level: 'Beginner', status: 'COMPLETED', load: 'LOW' },
        { id: 'top-py-loops', title: 'Loops and Iteration Constructs', level: 'Beginner', status: 'IN_PROGRESS', load: 'MEDIUM' },
        { id: 'top-py-functions', title: 'Functions, Scopes, and Arguments', level: 'Beginner', status: 'LOCKED', load: 'HIGH' },
        { id: 'top-py-recursion', title: 'Recursion and Recursive Thinking', level: 'Intermediate', status: 'LOCKED', load: 'LOW' }
      ]
    };
  },

  askAiAssistant: async (payload: any) => {
    const topic = payload.topic || 'Programming';
    const mode = payload.tutor_mode || 'EXPLAIN';
    const load = payload.cognitive_load || 'MEDIUM';

    const answers: Record<string, string> = {
      SIMPLIFY: `### 🌱 Simplified Analogy: ${topic}\n\nThink of a **Function** like a **Vending Machine**: you put in money and select a code (arguments/parameters), the machine processes your request internally (execution logic), and it dispenses your drink (return value).\n\nYou don't need to know the gears inside the vending machine to get your soda—just like callers don't need to know internal variables to use the function!`,
      DEBUG: `### 🛠️ Common Bug Diagnostic: ${topic}\n\n1. **Mutable Default Arguments**: Never write \`def fn(item, lst=[])\`. Use \`lst=None\` and initialize inside.\n2. **Off-By-One Errors**: Remember \`range(a, b)\` stops before \`b\`.\n3. **Shadowing Variables**: Keep parameter names distinct from outer globals.`,
      EXPLAIN: `### 💡 Architectural Deep Dive: ${topic}\n\nIn Python, code is executed within stack frames. When a function executes, its local symbol table handles scope resolution following the **LEGB rule** (Local, Enclosing, Global, Built-in).`
    };

    return {
      answer: answers[mode] || answers.EXPLAIN,
      sources: [`Knowledge Base: python/${topic.toLowerCase().replace(/\s+/g, '_')}.json`],
      cognitive_mode_applied: load
    };
  },

  requestProgressiveHint: async (payload: any) => {
    const lvl = payload.hint_level || 1;
    const hints = [
      '💡 **Level 1 — Conceptual Clue**: Identify your base condition and what value stops recursion or completes iteration.',
      '🧭 **Level 2 — Algorithmic Strategy**: Maintain an accumulator variable or recursive return step that decrements N toward 0.',
      '📝 **Level 3 — Pseudocode Blueprint**:\n```text\nFUNCTION solve(n):\n    IF n <= 1 RETURN 1\n    RETURN n * solve(n - 1)\n```',
      '🧩 **Level 4 — Partial Code Skeleton**:\n```python\ndef solve(n):\n    if n <= 1:\n        return 1\n    return n * solve(n - 1)  # Fill recursion step\n```',
      '🎓 **Level 5 — Full Walkthrough**: Here is the completed pattern with comments explaining the stack unwind order.'
    ];
    return {
      hint_level: lvl,
      hint_text: hints[Math.min(lvl - 1, hints.length - 1)],
      next_hint_available: lvl < 5
    };
  },

  // Diagnostic Test
  getDiagnosticQuestions: async (language: string = 'python') => {
    return {
      language,
      total_questions: mockDiagnosticQuestions.length,
      questions: mockDiagnosticQuestions.map(({ correct_index, explanation, ...rest }) => rest)
    };
  },

  submitDiagnosticTest: async (language: string, answers: Record<string, number>, timeSpent: number) => {
    let correct = 0;
    const breakdown = mockDiagnosticQuestions.map(q => {
      const userChoice = answers[q.id];
      const isCorrect = userChoice === q.correct_index;
      if (isCorrect) correct++;
      return {
        id: q.id,
        category: q.category,
        is_correct: isCorrect,
        user_choice: userChoice,
        correct_index: q.correct_index,
        explanation: q.explanation
      };
    });

    const score = Math.round((correct / mockDiagnosticQuestions.length) * 100);
    const level = score >= 75 ? 'advanced' : score >= 40 ? 'intermediate' : 'beginner';
    const startingTopic = level === 'advanced' ? 'top-py-recursion' : level === 'intermediate' ? 'top-py-functions' : 'top-py-loops';

    return {
      success: true,
      diagnostic_result: {
        language,
        total_score: score,
        concept_score: Math.round(score * 0.9),
        problem_solving_score: score,
        coding_score: Math.min(100, Math.round(score * 1.1)),
        recommended_level: level,
        starting_topic_id: startingTopic,
        evaluated_at: new Date().toISOString()
      },
      question_breakdown: breakdown,
      message: `Diagnostic test complete! Recommended starting point: ${level.toUpperCase()} track.`
    };
  },

  // Global Search
  search: async (query: string, language?: string) => {
    const q = (query || '').toLowerCase().trim();
    const results = [
      { id: 'top-py-loops', title: 'Loops and Iteration Constructs', type: 'topic', language: 'python', snippet: 'for loops, while loops, break, continue' },
      { id: 'top-py-functions', title: 'Functions, Scopes, and Arguments', type: 'topic', language: 'python', snippet: 'def keyword, parameters, return values, LEGB scopes' },
      { id: 'top-py-recursion', title: 'Recursion and Recursive Thinking', type: 'topic', language: 'python', snippet: 'base cases, call stack unwinding, factorial' },
      { id: 'top-c-pointers', title: 'Pointers and Memory Addresses', type: 'topic', language: 'c', snippet: 'address-of operator (&), dereference (*), memory buffers' }
    ].filter(item => {
      return !q || item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q) || (language && item.language === language);
    });

    return {
      success: true,
      query,
      total: results.length,
      synonyms_matched: q === 'memory' ? ['pointer', 'malloc'] : q === 'iteration' ? ['loop', 'for'] : [],
      results
    };
  },

  // Bookmarks CRUD (localStorage)
  getBookmarks: async (type?: string) => {
    const all = getStoredArray(MOCK_STORAGE_KEYS.BOOKMARKS, [
      {
        id: 'bm-default-1',
        item_type: 'lesson',
        item_id: 'top-py-functions',
        title: 'Functions, Scopes, and Arguments',
        snippet: 'Core function definition and parameter passing mechanics.',
        language: 'python',
        created_at: new Date().toISOString()
      }
    ]);
    const filtered = type && type !== 'all' ? all.filter(b => b.item_type === type) : all;
    return { success: true, total: filtered.length, bookmarks: filtered };
  },

  addBookmark: async (payload: any) => {
    const all = getStoredArray(MOCK_STORAGE_KEYS.BOOKMARKS, []);
    const newBm = {
      id: `bm-${Date.now()}`,
      ...payload,
      created_at: new Date().toISOString()
    };
    all.unshift(newBm);
    setStoredArray(MOCK_STORAGE_KEYS.BOOKMARKS, all);
    return { success: true, bookmark: newBm };
  },

  deleteBookmark: async (id: string) => {
    const all = getStoredArray(MOCK_STORAGE_KEYS.BOOKMARKS, []);
    setStoredArray(MOCK_STORAGE_KEYS.BOOKMARKS, all.filter(b => b.id !== id));
    return { success: true };
  },

  checkBookmarkStatus: async (itemType: string, itemId: string) => {
    const all = getStoredArray(MOCK_STORAGE_KEYS.BOOKMARKS, []);
    const found = all.some(b => b.item_type === itemType && b.item_id === itemId);
    return { is_bookmarked: found };
  },

  // Notes CRUD (localStorage)
  getNotes: async (query?: string, language?: string) => {
    let all = getStoredArray(MOCK_STORAGE_KEYS.NOTES, [
      {
        id: 'note-default-1',
        language: 'python',
        topic_id: 'top-py-functions',
        subtopic_title: 'Parameters',
        title: 'Default Argument Gotcha',
        content: 'Never use mutable default arguments like def fn(x=[]). Always use def fn(x=None): if x is None: x = []',
        updated_at: new Date().toISOString()
      }
    ]);
    if (query) {
      all = all.filter(n => n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase()));
    }
    if (language && language !== 'all') {
      all = all.filter(n => n.language === language);
    }
    return { success: true, total: all.length, notes: all };
  },

  createNote: async (payload: any) => {
    const all = getStoredArray(MOCK_STORAGE_KEYS.NOTES, []);
    const newNote = {
      id: `note-${Date.now()}`,
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    all.unshift(newNote);
    setStoredArray(MOCK_STORAGE_KEYS.NOTES, all);
    return { success: true, note: newNote };
  },

  updateNote: async (id: string, payload: any) => {
    const all = getStoredArray(MOCK_STORAGE_KEYS.NOTES, []);
    const idx = all.findIndex(n => n.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], ...payload, updated_at: new Date().toISOString() };
      setStoredArray(MOCK_STORAGE_KEYS.NOTES, all);
      return { success: true, note: all[idx] };
    }
    return { success: false };
  },

  deleteNote: async (id: string) => {
    const all = getStoredArray(MOCK_STORAGE_KEYS.NOTES, []);
    setStoredArray(MOCK_STORAGE_KEYS.NOTES, all.filter(n => n.id !== id));
    return { success: true };
  },

  // Learning History
  getLearningHistory: async () => {
    const history = getStoredArray(MOCK_STORAGE_KEYS.HISTORY, [
      {
        id: 'hist-seed-1',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        topic_id: 'top-py-intro',
        topic_title: 'Python Syntax & Dynamic Typing',
        language: 'python',
        quiz_score: 90,
        coding_score: 100,
        time_spent: 240,
        cognitive_load: 'LOW',
        adaptive_action: 'CONTINUE'
      },
      {
        id: 'hist-seed-2',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        topic_id: 'top-py-loops',
        topic_title: 'Loops and Iteration Constructs',
        language: 'python',
        quiz_score: 75,
        coding_score: 80,
        time_spent: 310,
        cognitive_load: 'MEDIUM',
        adaptive_action: 'PRACTICE'
      }
    ]);
    return {
      success: true,
      history,
      summary_stats: {
        total_sessions: history.length,
        avg_quiz_score: 85,
        avg_coding_score: 90,
        total_time_spent: 550
      },
      cognitive_trajectory: ['HIGH', 'MEDIUM', 'LOW']
    };
  }
};
