"""
Curriculum, Diagnostic Bank, Synonyms, and Seed Data for Python Backend Gateway
"""

COURSES = [
    {
        "id": "course-py-fund",
        "language": "python",
        "level": "beginner",
        "title": "Python Fundamentals & Control Flow",
        "description": "Master core Python syntax, conditional logic, loops, functions, and recursive paradigms.",
        "modules": [
            {
                "id": "mod-py-1",
                "title": "Basics & Control Flow",
                "order": 1,
                "topics": [
                    {
                        "id": "top-py-intro",
                        "title": "Python Syntax & Dynamic Typing",
                        "level": "beginner",
                        "status": "COMPLETED",
                        "duration_min": 15
                    },
                    {
                        "id": "top-py-loops",
                        "title": "Loops and Iteration Constructs",
                        "level": "beginner",
                        "status": "IN_PROGRESS",
                        "duration_min": 25
                    },
                    {
                        "id": "top-py-functions",
                        "title": "Functions, Scopes, and Arguments",
                        "level": "beginner",
                        "status": "LOCKED",
                        "duration_min": 30
                    },
                    {
                        "id": "top-py-recursion",
                        "title": "Recursion and Recursive Thinking",
                        "level": "intermediate",
                        "status": "LOCKED",
                        "duration_min": 35
                    }
                ]
            }
        ]
    },
    {
        "id": "course-c-systems",
        "language": "c",
        "level": "beginner",
        "title": "C Systems Programming & Memory",
        "description": "Pointers, memory management, stack vs heap, arrays, and low-level mechanics.",
        "modules": [
            {
                "id": "mod-c-1",
                "title": "Memory Architecture",
                "order": 1,
                "topics": [
                    {
                        "id": "top-c-pointers",
                        "title": "Pointers and Memory Addresses",
                        "level": "beginner",
                        "status": "IN_PROGRESS",
                        "duration_min": 30
                    }
                ]
            }
        ]
    },
    {
        "id": "course-cpp-oop",
        "language": "cpp",
        "level": "intermediate",
        "title": "C++ Modern OOP & Memory",
        "description": "Object-oriented architecture, classes, dynamic polymorphism, and smart pointers.",
        "modules": [
            {
                "id": "mod-cpp-1",
                "title": "OOP Design",
                "order": 1,
                "topics": [
                    {
                        "id": "top-cpp-classes",
                        "title": "Classes and Dynamic Polymorphism",
                        "level": "intermediate",
                        "status": "IN_PROGRESS",
                        "duration_min": 40
                    }
                ]
            }
        ]
    },
    {
        "id": "course-java-core",
        "language": "java",
        "level": "beginner",
        "title": "Java Core Principles & JVM",
        "description": "Java types, bytecode execution, OOP, collections framework, and JVM architecture.",
        "modules": [
            {
                "id": "mod-java-1",
                "title": "JVM & Types",
                "order": 1,
                "topics": [
                    {
                        "id": "top-java-basics",
                        "title": "Java Types & JVM Bytecode",
                        "level": "beginner",
                        "status": "IN_PROGRESS",
                        "duration_min": 30
                    }
                ]
            }
        ]
    }
]

TOPICS = {
    "top-py-loops": {
        "id": "top-py-loops",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "beginner",
        "title": "Loops and Iteration Constructs",
        "prerequisites": ["top-py-intro"],
        "content_standard": "In Python, iteration is governed primarily by `for` loops (iterating over collections) and `while` loops (repeating while an expression is True). The `break` keyword terminates a loop, while `continue` jumps to the next iteration.",
        "syntax": "for i in range(5):\n    if i == 2:\n        continue\n    print(f\"Index: {i}\")\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1",
        "common_mistakes": "Accidental infinite loops in `while` statements when the termination variable is not updated inside the body.",
        "sections": [
            {
                "id": "sec-1",
                "title": "1. For Loops and Iteration Protocols",
                "order_index": 1,
                "content": "Python for-loops operate directly over iterables (lists, ranges, tuples). They automate iteration without manual index incrementing.",
                "code_snippet": "for num in [10, 20, 30]:\n    print(num * 2)",
                "pitfalls": "Modifying a list while actively iterating over it causes skipped elements."
            },
            {
                "id": "sec-2",
                "title": "2. While Loops & Guard Clauses",
                "order_index": 2,
                "content": "While loops evaluate a condition before every cycle. Ensure your invariant condition advances toward termination every cycle.",
                "code_snippet": "val = 5\nwhile val > 0:\n    print(val)\n    val -= 1",
                "pitfalls": "Omitting the decrement causes an infinite loop and freezes execution."
            }
        ]
    },
    "top-py-functions": {
        "id": "top-py-functions",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "beginner",
        "title": "Functions, Scopes, and Arguments",
        "prerequisites": ["top-py-loops"],
        "content_standard": "Functions encapsulate reusable logic using the `def` keyword. Parameters receive caller arguments, and `return` passes results back to caller frames.",
        "syntax": "def calculate_area(length: float, width: float = 10.0) -> float:\n    \"\"\"Calculate rectangular area.\"\"\"\n    return length * width\n\narea = calculate_area(5.0)\nprint(area)",
        "common_mistakes": "Using mutable default arguments like `def append_to(item, basket=[])`. Mutable defaults persist state across repeated calls.",
        "sections": [
            {
                "id": "sec-fn-1",
                "title": "1. Function Definition & Parameters",
                "order_index": 1,
                "content": "Functions provide modularity. Parameters can be positional or keyword-based with default values.",
                "code_snippet": "def greet(name, greeting=\"Hello\"):\n    return f\"{greeting}, {name}!\"",
                "pitfalls": "Omitting return causes the function to evaluate implicitly to None."
            },
            {
                "id": "sec-fn-2",
                "title": "2. Scope and Stack Frames",
                "order_index": 2,
                "content": "Variables defined inside a function exist solely within its local frame, following LEGB (Local, Enclosing, Global, Built-in) lookup rules.",
                "code_snippet": "x = 10\ndef test():\n    x = 20\n    return x",
                "pitfalls": "Modifying a global variable without the global keyword raises UnboundLocalError."
            }
        ]
    },
    "top-py-recursion": {
        "id": "top-py-recursion",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "intermediate",
        "title": "Recursion and Recursive Thinking",
        "prerequisites": ["top-py-functions"],
        "content_standard": "Recursion is an algorithmic paradigm where a function calls itself to solve smaller sub-problems of identical nature, grounded by explicit base cases.",
        "syntax": "def factorial(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # 120",
        "common_mistakes": "Missing base cases cause infinite recursive branching, triggering RecursionError.",
        "sections": [
            {
                "id": "sec-rec-1",
                "title": "1. The Base Case Principle",
                "order_index": 1,
                "content": "The base case acts as the grounding anchor that halts recursive branching and initiates stack unwinding.",
                "code_snippet": "def countdown(n):\n    if n <= 0:\n        print(\"Done!\")\n        return\n    print(n)\n    countdown(n - 1)",
                "pitfalls": "Base case conditions that cannot be reached lead to infinite stack allocation."
            },
            {
                "id": "sec-rec-2",
                "title": "2. The Call Stack Mechanics",
                "order_index": 2,
                "content": "Each call pushes a frame with local variables. When base case terminates, frames resolve and return values back in LIFO order.",
                "code_snippet": "def sum_to(n):\n    if n <= 1:\n        return n\n    return n + sum_to(n - 1)",
                "pitfalls": "Deep recursion exceeding 1000 frames triggers RecursionError in Python."
            }
        ]
    }
}

QUIZZES = {
    "top-py-loops": [
        {
            "id": "mcq-py-loop-1",
            "question": "What is the output of `for i in range(1, 4): print(i, end=\" \")`?",
            "options": ["1 2 3 4", "1 2 3", "0 1 2 3", "1 4"],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "range(1, 4) produces integers from 1 up to but not including 4."
        },
        {
            "id": "mcq-py-loop-2",
            "question": "Which statement immediately exits the innermost enclosing loop in Python?",
            "options": ["continue", "break", "pass", "return"],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "break terminates the loop immediately."
        },
        {
            "id": "mcq-py-loop-3",
            "question": "What happens if a while loop condition remains True indefinitely?",
            "options": ["SyntaxError", "Infinite loop", "Garbage collection", "Process suspend"],
            "correct_index": 1,
            "difficulty": "medium",
            "explanation": "Without changing the condition variable, the loop runs forever."
        },
        {
            "id": "mcq-py-loop-4",
            "question": "What does the `continue` statement do inside a loop body?",
            "options": ["Restarts the entire loop from iteration 0", "Skips the rest of current cycle and advances to next", "Terminates execution", "Pauses for 1 second"],
            "correct_index": 1,
            "difficulty": "hard",
            "explanation": "continue jumps directly to the beginning of the next iteration."
        }
    ],
    "top-py-functions": [
        {
            "id": "mcq-py-fn-1",
            "question": "What keyword defines a function in Python?",
            "options": ["func", "def", "function", "fn"],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "def is the keyword used in Python."
        },
        {
            "id": "mcq-py-fn-2",
            "question": "What does a Python function return by default if no return statement is specified?",
            "options": ["0", "None", "False", "Empty string"],
            "correct_index": 1,
            "difficulty": "medium",
            "explanation": "Functions without explicit return implicitly evaluate to None."
        }
    ],
    "top-py-recursion": [
        {
            "id": "mcq-py-rec-1",
            "question": "What essential component halts recursive descent?",
            "options": ["Guard statement", "Base case", "Static pointer", "Yield"],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "The base case halts recursion."
        },
        {
            "id": "mcq-py-rec-2",
            "question": "What exception is raised when maximum call stack depth is exceeded?",
            "options": ["StackOverflowError", "RecursionError", "MemoryLimitException", "RuntimeWarning"],
            "correct_index": 1,
            "difficulty": "medium",
            "explanation": "Python raises RecursionError."
        }
    ]
}

CODING_CHALLENGES = {
    "top-py-loops": {
        "id": "code-py-sum-even",
        "topic_id": "top-py-loops",
        "title": "Sum of Even Numbers in Range",
        "difficulty": "easy",
        "problem_statement": "Given a positive integer N on standard input, calculate and print the sum of all positive even integers up to and including N.",
        "input_format": "A single integer N",
        "output_format": "The integer sum of even numbers",
        "constraints": "1 <= N <= 1000",
        "starter_code": {
            "python": "import sys\n\ndef sum_even(n: int) -> int:\n    total = 0\n    for i in range(2, n + 1, 2):\n        total += i\n    return total\n\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if line:\n        print(sum_even(int(line)))\n"
        },
        "test_cases": [
            {"input": "6", "expected_output": "12"},
            {"input": "10", "expected_output": "30"}
        ]
    },
    "top-py-recursion": {
        "id": "code-py-factorial",
        "topic_id": "top-py-recursion",
        "title": "Recursive Factorial Engine",
        "difficulty": "medium",
        "problem_statement": "Implement a recursive function factorial(n) that computes n! for any non-negative integer n.",
        "input_format": "A single integer N",
        "output_format": "The factorial of N",
        "constraints": "0 <= N <= 12",
        "starter_code": {
            "python": "import sys\n\ndef factorial(n: int) -> int:\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if line:\n        print(factorial(int(line)))\n"
        },
        "test_cases": [
            {"input": "5", "expected_output": "120"},
            {"input": "0", "expected_output": "1"}
        ]
    }
}

DIAGNOSTIC_QUESTIONS = [
    {
        "id": "diag-py-1",
        "language": "python",
        "category": "concept",
        "question": "What is the output of `type(5 / 2)` in Python 3?",
        "options": ["<class 'int'>", "<class 'float'>", "<class 'double'>", "<class 'number'>"],
        "correct_index": 1,
        "explanation": "Single slash division always returns a float in Python 3."
    },
    {
        "id": "diag-py-2",
        "language": "python",
        "category": "concept",
        "question": "Which of the following Python data types is mutable?",
        "options": ["tuple", "string", "list", "frozenset"],
        "correct_index": 2,
        "explanation": "Lists can be modified in place."
    },
    {
        "id": "diag-py-3",
        "language": "python",
        "category": "problem_solving",
        "question": "What will this loop output?\nfor x in [1, 2, 3]:\n    if x == 2:\n        continue\n    print(x, end=' ')",
        "options": ["1 2 3", "1 3", "2 3", "1 2"],
        "correct_index": 1,
        "explanation": "When x == 2, continue skips printing."
    },
    {
        "id": "diag-py-4",
        "language": "python",
        "category": "problem_solving",
        "question": "What is the return value of depth([1, [2, [3]]])?",
        "options": ["2", "3", "4", "1"],
        "correct_index": 1,
        "explanation": "The maximum nesting level is 3."
    },
    {
        "id": "diag-py-5",
        "language": "python",
        "category": "coding_ability",
        "question": "Which one-liner correctly filters all odd numbers from a list data?",
        "options": [
            "[x for x in data if x % 2 != 0]",
            "filter(lambda x: x % 2 == 0, data)",
            "[x if x % 2 != 0 for x in data]",
            "data.filter(x => x % 2 != 0)"
        ],
        "correct_index": 0,
        "explanation": "List comprehension syntax filters odd items correctly."
    },
    {
        "id": "diag-py-6",
        "language": "python",
        "category": "coding_ability",
        "question": "What bug exists in: def add_item(item, basket=[]): basket.append(item); return basket?",
        "options": [
            "SyntaxError on declaration",
            "The default list is created once and shared across calls",
            "append returns a new list",
            "Functions cannot return lists"
        ],
        "correct_index": 1,
        "explanation": "Default argument expressions are evaluated once when defined."
    },
    {
        "id": "diag-py-7",
        "language": "python",
        "category": "concept",
        "question": "What does the `is` operator compare in Python?",
        "options": ["Value equality", "Object memory identity", "Data type only", "Length"],
        "correct_index": 1,
        "explanation": "is checks whether references point to the exact same object in memory."
    },
    {
        "id": "diag-py-8",
        "language": "python",
        "category": "concept",
        "question": "Which built-in function returns an iterator of tuples containing index counts and values?",
        "options": ["zip()", "map()", "enumerate()", "filter()"],
        "correct_index": 2,
        "explanation": "enumerate generates (index, item) pairs."
    },
    {
        "id": "diag-py-9",
        "language": "python",
        "category": "problem_solving",
        "question": "What is the average time complexity of looking up a key in a Python dict?",
        "options": ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        "correct_index": 0,
        "explanation": "Hash tables provide average O(1) key lookup."
    },
    {
        "id": "diag-py-10",
        "language": "python",
        "category": "problem_solving",
        "question": "What is printed?\nx = [1, 2]\ny = x\ny.append(3)\nprint(x)",
        "options": ["[1, 2]", "[1, 2, 3]", "AttributeError", "[3]"],
        "correct_index": 1,
        "explanation": "Variables store references; mutating y also mutates x."
    },
    {
        "id": "diag-py-11",
        "language": "python",
        "category": "coding_ability",
        "question": "What keyword does a Python generator function use to produce values lazily?",
        "options": ["yield", "await", "produce", "return"],
        "correct_index": 0,
        "explanation": "yield transforms a function into an on-demand generator iterator."
    },
    {
        "id": "diag-py-12",
        "language": "python",
        "category": "coding_ability",
        "question": "What is the idiomatic Python construct to guarantee file cleanup?",
        "options": ["with open(...) as f:", "file.close_now()", "catch EOFError", "del f"],
        "correct_index": 0,
        "explanation": "The with statement uses the context management protocol for deterministic cleanup."
    }
]

SYNONYMS = {
    "pointer": ["address", "memory", "malloc", "dereference", "reference"],
    "memory": ["pointer", "address", "heap", "stack", "allocation"],
    "recursion": ["recursive", "base case", "call stack", "divide and conquer", "factorial"],
    "loop": ["iteration", "while", "for", "repeat", "cycle"],
    "function": ["def", "method", "procedure", "parameter", "return", "scope"]
}

PROJECTS = [
    {
        "id": "proj-py-calculator",
        "title": "CLI Scientific Calculator",
        "language": "python",
        "level": "beginner",
        "description": "Build an interactive command-line calculator parsing arithmetic expressions with robust error handling.",
        "milestones": ["Arithmetic Engine", "Input Parsing", "Division by Zero Guard"],
        "test_cases": [
            {"input": "+ 5 10", "expected": "15.0"},
            {"input": "* 4 3", "expected": "12.0"},
            {"input": "/ 10 0", "expected": "Error: Division by zero"}
        ]
    }
]
