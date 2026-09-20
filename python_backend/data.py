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
                        "id": "top-py-fundamentals",
                        "title": "Language Fundamentals, Datatypes & Immutability",
                        "level": "beginner",
                        "status": "COMPLETED",
                        "duration_min": 20
                    },
                    {
                        "id": "top-py-operators-io",
                        "title": "Operators & Dynamic Input/Output Statements",
                        "level": "beginner",
                        "status": "IN_PROGRESS",
                        "duration_min": 25
                    },
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
                        "id": "top-py-strings",
                        "title": "In-Depth String Operations, Slicing & Algorithms",
                        "level": "beginner",
                        "status": "LOCKED",
                        "duration_min": 30
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
                    },
                    {
                        "id": "top-py-tuples-sets",
                        "title": "Tuples and Sets Data Structures",
                        "level": "intermediate",
                        "status": "LOCKED",
                        "duration_min": 30
                    },
                    {
                        "id": "top-py-modules-regex",
                        "title": "Modules, Math, Random & Regular Expressions",
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
    },
    "top-py-fundamentals": {
        "id": "top-py-fundamentals",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "beginner",
        "title": "Language Fundamentals, Datatypes & Immutability",
        "prerequisites": [],
        "content_standard": "Python was created by Guido Van Rossum in 1989 and released in 1991. It is high-level, interpreted, and dynamically typed. All fundamental types (int, float, complex, bool, str) are immutable objects in memory.",
        "syntax": "a = 15\nprint(bin(a)) # 0b1111\nprint(hex(a)) # 0xf\nx = 256; y = 256\nprint(x is y) # True (interning)",
        "common_mistakes": "Using reserved words as variable names (e.g. `def = 44` causes SyntaxError). Expecting immutable objects to modify in-place without re-assignment.",
        "sections": [
            {
                "id": "sec-py-fund-1",
                "title": "1. Python Architecture & Flavours",
                "order_index": 1,
                "content": "Guido Van Rossum developed Python borrowing functional syntax from C, OOP from C++, and scripting from Perl/Shell. PyPy uses a JIT compiler inside the PVM for massive performance speedups.",
                "code_snippet": "import sys\nprint(sys.version)",
                "pitfalls": "Confusing CPython (standard C-based runtime) with PyPy (JIT accelerated runtime)."
            },
            {
                "id": "sec-py-fund-2",
                "title": "2. The 33 Keywords & Identifier Rules",
                "order_index": 2,
                "content": "Identifiers allow letters, digits, and underscores, but cannot start with a digit. Only 3 keywords are capitalized: True, False, and None. The other 30 are strictly lowercase.",
                "code_snippet": "import keyword\nprint('Total keywords:', len(keyword.kwlist))\nprint([k for k in keyword.kwlist if k[0].isupper()])",
                "pitfalls": "Starting identifier names with numbers like 1st_var causes invalid syntax."
            },
            {
                "id": "sec-py-fund-3",
                "title": "3. Immutability & Object Interning",
                "order_index": 3,
                "content": "All fundamental data types are immutable. Small integers (-5 to 256) are interned so identical values share the exact same object in memory.",
                "code_snippet": "a = 100\nb = 100\nprint('Same object?', a is b) # True\nprint('Same content?', a == b) # True",
                "pitfalls": "Assuming `a is b` tests equality. `==` checks value, `is` checks memory reference."
            }
        ]
    },
    "top-py-operators-io": {
        "id": "top-py-operators-io",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "beginner",
        "title": "Operators & Dynamic Input/Output Statements",
        "prerequisites": ["top-py-fundamentals"],
        "content_standard": "Python supports 7 arithmetic operators including floor division `//` and exponent `**`. In Python 3, `input()` returns string data. Use `[int(x) for x in input().split()]` to read space-separated values.",
        "syntax": "x, y = [int(n) for n in input().split()]\nprint(f'x={x}, y={y}')\nmin_val = x if x < y else y",
        "common_mistakes": "Multiplying two strings (`'a' * 'b'` raises TypeError). Division by zero (`x // 0` raises ZeroDivisionError).",
        "sections": [
            {
                "id": "sec-py-op-1",
                "title": "1. Division vs Floor Division",
                "order_index": 1,
                "content": "Normal division `/` always returns a float (`10 / 2` is `5.0`). Floor division `//` truncates to lowest whole integer (`10 // 3` is `3`, but `10.0 // 3` is `3.0`).",
                "code_snippet": "print('10/2 =', 10/2)   # 5.0\nprint('10//3 =', 10//3) # 3\nprint('10.0//3 =', 10.0//3) # 3.0",
                "pitfalls": "Forgetting that float operands in `//` return float results (3.0 instead of 3)."
            },
            {
                "id": "sec-py-op-2",
                "title": "2. Dynamic Single-Line Input with Unpacking",
                "order_index": 2,
                "content": "Read multiple space-separated numbers using `split()` and list comprehension unpacking in one clean line.",
                "code_snippet": "a, b = [int(x) for x in '10 20'.split()]\nprint('Sum is:', a + b)",
                "pitfalls": "Calling int() directly on space-separated string without split() raises ValueError."
            },
            {
                "id": "sec-py-op-3",
                "title": "3. Output Customization: sep and end",
                "order_index": 3,
                "content": "The `sep` keyword defines what character separates arguments; `end` controls what character prints after the final argument.",
                "code_snippet": "print(10, 20, 30, sep='-', end='***')\nprint(40, 50, sep=':')",
                "pitfalls": "Missing default newline behavior when overriding `end` parameter."
            }
        ]
    },
    "top-py-strings": {
        "id": "top-py-strings",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "beginner",
        "title": "In-Depth String Operations, Slicing & Algorithms",
        "prerequisites": ["top-py-fundamentals"],
        "content_standard": "Strings are immutable sequences of characters supporting positive and negative indexing. Slicing with step `s[begin:end:step]` allows stride selection and full reversal with `s[::-1]`.",
        "syntax": "s = 'karthikeya'\nprint(s[0])    # 'k'\nprint(s[-1])   # 'a'\nprint(s[2:7])  # 'rthik'\nprint(s[::-1]) # reverse",
        "common_mistakes": "Attempting in-place modification: `s[0] = 'A'` raises TypeError. Using `s.index()` without try-except when substring may not exist.",
        "sections": [
            {
                "id": "sec-py-str-1",
                "title": "1. Slicing with Step & String Reversal",
                "order_index": 1,
                "content": "The slice operator takes `[start:stop:step]`. With negative step, Python traverses backwards, enabling clean one-line reversal without loops.",
                "code_snippet": "msg = 'Python Learning'\nprint(msg[::-1])",
                "pitfalls": "Slice indices never raise IndexError even if out of range, but direct indexing does."
            },
            {
                "id": "sec-py-str-2",
                "title": "2. find() vs index() and count()",
                "order_index": 2,
                "content": "`find()` returns -1 if the substring is missing. `index()` raises ValueError. `count()` returns total non-overlapping occurrences.",
                "code_snippet": "s = 'abcabc'\nprint(s.find('z'))  # -1\nprint(s.count('ab')) # 2",
                "pitfalls": "Using index() assuming it returns -1 on not found like JavaScript."
            },
            {
                "id": "sec-py-str-3",
                "title": "3. Character Testing: isalnum, isalpha, isdigit",
                "order_index": 3,
                "content": "Python provides built-in boolean validators to inspect character classes without regex overhead.",
                "code_snippet": "print('A123'.isalnum()) # True\nprint('Hello'.isalpha()) # True\nprint('99'.isdigit())    # True",
                "pitfalls": "Empty strings return False for all isalpha/isdigit checks."
            }
        ]
    },
    "top-py-tuples-sets": {
        "id": "top-py-tuples-sets",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "intermediate",
        "title": "Tuples and Sets Data Structures",
        "prerequisites": ["top-py-loops"],
        "content_standard": "Tuples are immutable ordered sequences (`(10, 20)`). Sets are mutable, unordered collections of unique elements (`{10, 20}`). Sets eliminate duplicates and support union, intersection, and difference.",
        "syntax": "t = (10, 20, 30)\ns = {10, 20, 30, 20}\nprint('Set deduplicated:', s)\nprint('Union:', {1, 2} | {2, 3})",
        "common_mistakes": "Creating single-element tuple without comma: `t = (10)` is an int, not a tuple! Must be `t = (10,)`. Indexing a set raises TypeError.",
        "sections": [
            {
                "id": "sec-py-ts-1",
                "title": "1. Tuples: Immutability & Packing",
                "order_index": 1,
                "content": "Tuples prevent accidental data modification. Single valued tuples must terminate with a comma: `t = (10,)`. Tuple packing combines variables; unpacking assigns them back.",
                "code_snippet": "t = 10, 20, 30 # packing\nx, y, z = t    # unpacking\nprint('y =', y)",
                "pitfalls": "Writing `(10)` instead of `(10,)` creates an int, not a tuple."
            },
            {
                "id": "sec-py-ts-2",
                "title": "2. Sets: Uniqueness & remove vs discard",
                "order_index": 2,
                "content": "Sets automatically deduplicate elements. Use `discard()` when an item might not exist to avoid KeyError crashes.",
                "code_snippet": "s = {10, 20, 30}\ns.discard(50) # Safe, no error\n# s.remove(50) would raise KeyError",
                "pitfalls": "Calling remove(x) on missing element crashes with KeyError; use discard(x)."
            },
            {
                "id": "sec-py-ts-3",
                "title": "3. Mathematical Set Operations",
                "order_index": 3,
                "content": "Perform union (`|`), intersection (`&`), difference (`-`), and symmetric difference (`^`) with native operators.",
                "code_snippet": "x = {1, 2, 3}\ny = {3, 4, 5}\nprint('Intersection:', x & y)\nprint('Difference:', x - y)",
                "pitfalls": "Set elements must be hashable; attempting to put a list inside a set raises TypeError: unhashable type: 'list'."
            }
        ]
    },
    "top-py-modules-regex": {
        "id": "top-py-modules-regex",
        "course_id": "course-py-fund",
        "language": "python",
        "level": "intermediate",
        "title": "Modules, Math, Random & Regular Expressions",
        "prerequisites": ["top-py-functions"],
        "content_standard": "Modules group reusable Python code. `re` provides pattern matching via compile, search, match, and fullmatch with character classes and quantifiers for validation.",
        "syntax": "import re\npattern = r'[6-9]\\d{9}'\nis_valid = bool(re.fullmatch(pattern, '9885768283'))\nprint('Valid phone?', is_valid)",
        "common_mistakes": "Using `re.match()` instead of `re.fullmatch()` for complete string validation, which allows trailing garbage characters.",
        "sections": [
            {
                "id": "sec-py-mr-1",
                "title": "1. Modules, Aliasing & __name__",
                "order_index": 1,
                "content": "Every Python file is a module. When executed directly, `__name__ == '__main__'`. Use `importlib.reload(module)` if a module is modified during a live interactive session.",
                "code_snippet": "import math as m\nprint('Pi:', m.pi)\nprint('Sqrt 16:', m.sqrt(16))",
                "pitfalls": "Circular imports between two modules leading to ImportError."
            },
            {
                "id": "sec-py-mr-2",
                "title": "2. Random Library & OTP Generation",
                "order_index": 2,
                "content": "`random.randint(0, 9)` produces random integers. We can assemble cryptographically sound one-time passwords and shuffle sequences.",
                "code_snippet": "from random import randint\nprint('6-digit OTP:', ''.join(str(randint(0, 9)) for _ in range(6)))",
                "pitfalls": "Using choice() on empty sequences raises IndexError."
            },
            {
                "id": "sec-py-mr-3",
                "title": "3. Regular Expressions: re.fullmatch & Classes",
                "order_index": 3,
                "content": "`re.fullmatch()` verifies that the entire input satisfies the pattern from start `^` to end `$`. Use `\\d` for digits and `[6-9]` for specific leading ranges.",
                "code_snippet": "import re\nmobile = '9885768283'\nmatch = re.fullmatch(r'[6-9]\\d{9}', mobile)\nprint('Valid Mobile?', match is not None)",
                "pitfalls": "Forgetting raw string prefix `r'...'` causing backslashes to be swallowed as escape codes."
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
    ],
    "top-py-fundamentals": [
        {
            "id": "mcq-py-fund-1",
            "question": "Out of the 33 reserved keywords in Python, how many begin with an uppercase letter?",
            "options": [
                "None of them (all 33 are strictly lowercase)",
                "Exactly 3: True, False, and None",
                "5 keywords: True, False, None, Class, and Def",
                "All 33 keywords start with uppercase letters"
            ],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "In Python, only True, False, and None begin with capital letters. All other 30 keywords are entirely lowercase."
        },
        {
            "id": "mcq-py-fund-2",
            "question": "What happens in Python when evaluating `a = 10; b = 10; a is b`?",
            "options": [
                "Returns False because two separate variables always get distinct memory addresses",
                "Returns True because Python interns small integers (-5 to 256) to point to the exact same object",
                "Raises a SyntaxError because `is` cannot be applied to integers",
                "Returns 0"
            ],
            "correct_index": 1,
            "difficulty": "medium",
            "explanation": "Python uses object interning for small integers (-5 to 256). Both references point to the identical memory address, so `a is b` returns True."
        }
    ],
    "top-py-operators-io": [
        {
            "id": "mcq-py-op-1",
            "question": "What is the value and type of `10.0 // 3` in Python 3?",
            "options": ["3 (int)", "3.0 (float)", "3.3333333333333335 (float)", "Raises TypeError"],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "Floor division `//` returns the floor value. If at least one operand is a float, the result is always a float (`3.0`)."
        },
        {
            "id": "mcq-py-op-2",
            "question": "What is the output of print('karthi' * False)?",
            "options": ["'karthi0'", "An empty string (prints nothing)", "Raises TypeError", "None"],
            "correct_index": 1,
            "difficulty": "medium",
            "explanation": "In Python, False has integer value 0. Multiplying a string by 0 repeats it 0 times, returning an empty string."
        }
    ],
    "top-py-strings": [
        {
            "id": "mcq-py-str-1",
            "question": "What does the slice expression `s[::-1]` evaluate to for any string `s`?",
            "options": [
                "Returns the first character",
                "Reverses the entire string backwards",
                "Raises an IndexError: step cannot be negative",
                "Returns an empty string"
            ],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "A step of -1 in slicing tells Python to traverse the sequence in reverse direction from end to start, reversing the string."
        },
        {
            "id": "mcq-py-str-2",
            "question": "What is the difference between `s.find('abc')` and `s.index('abc')` when 'abc' is absent from `s`?",
            "options": [
                "`find()` raises a ValueError, while `index()` returns -1",
                "`find()` returns -1, while `index()` raises a ValueError",
                "Both methods return None",
                "Both methods raise an IndexError"
            ],
            "correct_index": 1,
            "difficulty": "medium",
            "explanation": "In Python, `find()` returns -1 when the substring is not found, while `index()` raises a `ValueError` exception."
        }
    ],
    "top-py-tuples-sets": [
        {
            "id": "mcq-py-ts-1",
            "question": "What is the data type of the expression `t = (10)` vs `t = (10,)` in Python?",
            "options": [
                "Both are tuples",
                "`t = (10)` is int, while `t = (10,)` is tuple",
                "`t = (10)` is tuple, while `t = (10,)` is syntax error",
                "Both are integers"
            ],
            "correct_index": 1,
            "difficulty": "easy",
            "explanation": "A single value enclosed in parentheses without a trailing comma is evaluated as a normal parenthesized expression (int). A trailing comma is required to create a 1-tuple."
        },
        {
            "id": "mcq-py-ts-2",
            "question": "What happens when calling `s.remove(50)` vs `s.discard(50)` on a set `s = {10, 20}` where 50 is NOT present?",
            "options": [
                "`remove()` raises a KeyError, whereas `discard()` does nothing and raises no error",
                "`discard()` raises a KeyError, whereas `remove()` returns False",
                "Both methods raise ValueError",
                "Both methods automatically add 50 to the set"
            ],
            "correct_index": 0,
            "difficulty": "medium",
            "explanation": "`remove(x)` raises a `KeyError` if element x is missing from the set. `discard(x)` safely removes x if present, or silently does nothing if absent."
        }
    ],
    "top-py-modules-regex": [
        {
            "id": "mcq-py-reg-1",
            "question": "Which regex function verifies that the ENTIRE input string matches the specified pattern from beginning to end?",
            "options": ["re.match()", "re.search()", "re.fullmatch()", "re.findall()"],
            "correct_index": 2,
            "difficulty": "easy",
            "explanation": "`re.fullmatch()` requires the entire target string to match the regex pattern. `re.match()` only checks if the pattern matches at the beginning."
        },
        {
            "id": "mcq-py-reg-2",
            "question": "Which regular expression pattern correctly validates a 10-digit Indian mobile number starting with 6, 7, 8, or 9?",
            "options": [
                "[0-9]{10}",
                "[6-9]\\d{9}",
                "[6789][0-9]{10}",
                "\\d{10}"
            ],
            "correct_index": 1,
            "difficulty": "medium",
            "explanation": "`[6-9]` validates that the first digit is 6, 7, 8, or 9, followed by `\\d{9}` (exactly 9 more digits), making a total of 10 digits."
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
    },
    "top-py-operators-io": {
        "id": "code-py-min-ternary",
        "topic_id": "top-py-operators-io",
        "title": "Find Minimum of 3 Numbers with Ternary Operator",
        "difficulty": "easy",
        "problem_statement": "Read 3 space-separated integers A, B, and C from standard input and print the minimum value using a nested ternary conditional operator.",
        "input_format": "A single line containing three space-separated integers.",
        "output_format": "The minimum integer.",
        "constraints": "-10^6 <= A, B, C <= 10^6",
        "starter_code": {
            "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        return\n    a, b, c = [int(x) for x in raw.split()]\n    # TODO: Calculate minimum using nested ternary operator\n    min_val = a if a < b and a < c else b if b < c else c\n    print(min_val)\n\nif __name__ == '__main__':\n    solve()\n"
        },
        "test_cases": [
            {"input": "10 20 5", "expected_output": "5"},
            {"input": "30 10 20", "expected_output": "10"}
        ]
    },
    "top-py-strings": {
        "id": "code-py-str-merge",
        "topic_id": "top-py-strings",
        "title": "Alternate String Character Merger",
        "difficulty": "medium",
        "problem_statement": "Read two space-separated strings s1 and s2 from standard input. Merge them by taking characters alternately. If one string is longer than the other, append the remaining characters to the end.",
        "input_format": "Two space-separated strings on a single line.",
        "output_format": "The merged string.",
        "constraints": "1 <= len(s1), len(s2) <= 500",
        "starter_code": {
            "python": "import sys\n\ndef merge_alternate(s1: str, s2: str) -> str:\n    output = []\n    i, j = 0, 0\n    while i < len(s1) or j < len(s2):\n        if i < len(s1):\n            output.append(s1[i])\n            i += 1\n        if j < len(s2):\n            output.append(s2[j])\n            j += 1\n    return ''.join(output)\n\nif __name__ == '__main__':\n    parts = sys.stdin.read().strip().split()\n    if len(parts) >= 2:\n        print(merge_alternate(parts[0], parts[1]))\n"
        },
        "test_cases": [
            {"input": "karthi sahasra", "expected_output": "ksaarhtahsira"},
            {"input": "abc 12345", "expected_output": "a1b2c345"}
        ]
    },
    "top-py-tuples-sets": {
        "id": "code-py-dedup-list",
        "topic_id": "top-py-tuples-sets",
        "title": "Order-Preserving List Deduplication",
        "difficulty": "easy",
        "problem_statement": "Read space-separated integers from stdin and print the sequence with all duplicates removed while strictly preserving the original first-occurrence order.",
        "input_format": "A single line of space-separated integers.",
        "output_format": "Space-separated integers with duplicates eliminated.",
        "constraints": "1 <= count <= 1000",
        "starter_code": {
            "python": "import sys\n\ndef solve():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        return\n    nums = [int(x) for x in raw.split()]\n    seen = set()\n    result = []\n    for x in nums:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    print(' '.join(str(x) for x in result))\n\nif __name__ == '__main__':\n    solve()\n"
        },
        "test_cases": [
            {"input": "10 20 30 10 20 40", "expected_output": "10 20 30 40"},
            {"input": "5 5 5 5", "expected_output": "5"}
        ]
    },
    "top-py-modules-regex": {
        "id": "code-py-mobile-regex",
        "topic_id": "top-py-modules-regex",
        "title": "Mobile Number Regular Expression Validator",
        "difficulty": "medium",
        "problem_statement": "Read a mobile number string from standard input. Print 'VALID' if it contains exactly 10 digits and starts with 6, 7, 8, or 9 (optional leading 0 or +91 prefix is also accepted). Otherwise print 'INVALID'.",
        "input_format": "A single line containing the candidate phone number string.",
        "output_format": "'VALID' or 'INVALID'.",
        "constraints": "1 <= string length <= 20",
        "starter_code": {
            "python": "import sys\nimport re\n\ndef validate_phone(number: str) -> bool:\n    pattern = r'(\\+91|0)?[6-9]\\d{9}'\n    return bool(re.fullmatch(pattern, number))\n\nif __name__ == '__main__':\n    raw = sys.stdin.read().strip()\n    print('VALID' if validate_phone(raw) else 'INVALID')\n"
        },
        "test_cases": [
            {"input": "9885768283", "expected_output": "VALID"},
            {"input": "+917485920584", "expected_output": "VALID"},
            {"input": "5543210987", "expected_output": "INVALID"}
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
    },
    {
        "id": "diag-py-13",
        "language": "python",
        "category": "concept",
        "question": "What is the exact output of `10.0 // 3` in Python 3?",
        "options": ["3", "3.0", "3.3333333333333335", "TypeError"],
        "correct_index": 1,
        "explanation": "Floor division `//` performs floor arithmetic, but if at least one operand is a float (`10.0`), the result is coerced to float (`3.0`)."
    },
    {
        "id": "diag-py-14",
        "language": "python",
        "category": "problem_solving",
        "question": "What happens when evaluating `int('0b1111')` in Python?",
        "options": [
            "Returns integer 15",
            "Raises ValueError: invalid literal for int() with base 10",
            "Returns binary string '0b1111'",
            "Returns 1111"
        ],
        "correct_index": 1,
        "explanation": "`int(string)` expects a base-10 integer string by default. To parse binary strings, the base must be explicitly passed: `int('0b1111', 2)`. Calling `int('0b1111')` raises ValueError."
    },
    {
        "id": "diag-py-15",
        "language": "python",
        "category": "concept",
        "question": "How do you define a single-valued tuple containing the number 10 in Python?",
        "options": ["t = (10)", "t = (10,)", "t = tuple[10]", "t = [10]"],
        "correct_index": 1,
        "explanation": "`t = (10)` is evaluated as a grouped integer. A trailing comma `(10,)` is mandatory for Python to recognize it as a single-element tuple."
    },
    {
        "id": "diag-py-16",
        "language": "python",
        "category": "problem_solving",
        "question": "Given set `s = {10, 20}`, what is the difference between `s.remove(50)` and `s.discard(50)`?",
        "options": [
            "`remove(50)` raises a KeyError; `discard(50)` completes without error",
            "`discard(50)` raises a KeyError; `remove(50)` returns None",
            "Both methods raise a ValueError",
            "Both methods automatically insert 50 into the set"
        ],
        "correct_index": 0,
        "explanation": "In Python sets, `remove()` raises a KeyError if the element does not exist. `discard()` removes the element if present, or safely does nothing if absent."
    },
    {
        "id": "diag-py-17",
        "language": "python",
        "category": "coding_ability",
        "question": "Why does calling `calc(b=50, 100)` cause a SyntaxError in Python?",
        "options": [
            "Positional arguments cannot follow keyword arguments in a function call",
            "Python functions can only accept keyword arguments",
            "Parameter `b` must be capitalized",
            "Arguments must always be enclosed in a tuple"
        ],
        "correct_index": 0,
        "explanation": "In Python syntax, all positional arguments must precede any keyword arguments in a function call."
    },
    {
        "id": "diag-py-18",
        "language": "python",
        "category": "coding_ability",
        "question": "What types do variable-length positional arguments `*args` and keyword arguments `**kwargs` have inside a Python function?",
        "options": [
            "`*args` is a tuple, `**kwargs` is a dict",
            "`*args` is a list, `**kwargs` is a tuple",
            "`*args` is a set, `**kwargs` is a list",
            "`*args` is a generator, `**kwargs` is an object"
        ],
        "correct_index": 0,
        "explanation": "`*args` packages excess positional arguments into an immutable tuple, while `**kwargs` packages named arguments into a dictionary."
    },
    {
        "id": "diag-py-19",
        "language": "python",
        "category": "concept",
        "question": "Out of the 33 reserved keywords in Python, which ones start with a capital letter?",
        "options": [
            "True, False, None",
            "Def, Class, Return",
            "If, Elif, Else",
            "All 33 keywords are lowercase"
        ],
        "correct_index": 0,
        "explanation": "Only True, False, and None are capitalized in Python keywords. The remaining 30 are strictly lowercase."
    },
    {
        "id": "diag-py-20",
        "language": "python",
        "category": "problem_solving",
        "question": "Which regular expression pattern validates a 10-digit Indian mobile number starting with digits 6 to 9?",
        "options": [
            "re.fullmatch(r'[6-9]\\d{9}', number)",
            "re.match(r'[0-9]{10}', number)",
            "re.search(r'\\d{10}', number)",
            "re.findall(r'[6-9]{10}', number)"
        ],
        "correct_index": 0,
        "explanation": "`[6-9]` requires the first digit to be 6, 7, 8, or 9, followed by exactly 9 digits (`\\d{9}`). Using `re.fullmatch` guarantees no unvalidated prefix or suffix."
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
