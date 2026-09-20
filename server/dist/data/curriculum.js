"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialCurriculum = void 0;
exports.initialCurriculum = {
    courses: [
        // Python Courses
        { id: 'py-beg', language: 'python', level: 'beginner', title: 'Python Fundamentals', description: 'Master variables, conditionals, loops, functions, and elementary data structures in Python.', order_index: 1 },
        { id: 'py-int', language: 'python', level: 'intermediate', title: 'Intermediate Python & Data Structures', description: 'Lists, dictionaries, comprehensions, file handling, modules, and exception handling.', order_index: 2 },
        { id: 'py-adv', language: 'python', level: 'advanced', title: 'Advanced Python, OOP & Async', description: 'Object-oriented programming, iterators, generators, decorators, and asynchronous workflows.', order_index: 3 },
        // C Courses
        { id: 'c-beg', language: 'c', level: 'beginner', title: 'C Programming Foundations', description: 'Procedural foundations, data types, operators, flow control, and modular functions in C.', order_index: 1 },
        { id: 'c-int', language: 'c', level: 'intermediate', title: 'C Pointers & Memory Management', description: 'Arrays, strings, pointers, address arithmetic, and dynamic heap allocation.', order_index: 2 },
        { id: 'c-adv', language: 'c', level: 'advanced', title: 'Advanced C Systems & Data Structures', description: 'Structures, unions, file I/O, linked data structures, and the preprocessor.', order_index: 3 },
        // C++ Courses
        { id: 'cpp-beg', language: 'cpp', level: 'beginner', title: 'C++ Modern Fundamentals', description: 'Standard I/O, control flow, functions, references, and memory basics in modern C++.', order_index: 1 },
        { id: 'cpp-int', language: 'cpp', level: 'intermediate', title: 'Object-Oriented C++', description: 'Classes, constructors, encapsulation, inheritance, and runtime polymorphism.', order_index: 2 },
        { id: 'cpp-adv', language: 'cpp', level: 'advanced', title: 'Advanced C++ & STL Architecture', description: 'Templates, STL containers, iterators, lambda expressions, and smart pointers.', order_index: 3 },
        // Java Courses
        { id: 'java-beg', language: 'java', level: 'beginner', title: 'Java Core Architecture & Basics', description: 'JVM architecture, primitives, control structures, methods, and array processing.', order_index: 1 },
        { id: 'java-int', language: 'java', level: 'intermediate', title: 'Java Object-Oriented Design', description: 'Classes, encapsulation, inheritance, polymorphism, interfaces, and exceptions.', order_index: 2 },
        { id: 'java-adv', language: 'java', level: 'advanced', title: 'Advanced Java & Collections Framework', description: 'Collections framework, generics, functional streams, lambdas, and concurrency.', order_index: 3 }
    ],
    modules: [
        // Python Modules (6 Stages directly corresponding to Python1.pdf Units 1-6)
        { id: 'mod-py-1', course_id: 'py-beg', title: 'Stage 1 (Unit 1): Language Fundamentals, Types & Operators', description: 'Python history, keywords, datatypes, immutability, operators, dynamic input/output', order_index: 1 },
        { id: 'mod-py-2', course_id: 'py-beg', title: 'Stage 2 (Unit 2): Flow Control, Loops & Pattern Printing', description: 'Conditional statements, iterative loops, transfer statements, and pattern printing', order_index: 2 },
        { id: 'mod-py-3', course_id: 'py-int', title: 'Stage 3 (Unit 3): Strings, Slicing & String Algorithms', description: 'Positive/negative slicing, substring search, character testing, and string algorithms', order_index: 1 },
        { id: 'mod-py-4', course_id: 'py-int', title: 'Stage 4 (Unit 4): Lists, Matrices & Comprehensions', description: 'List methods, aliasing vs cloning, nested 2D matrices, and list comprehensions', order_index: 2 },
        { id: 'mod-py-5', course_id: 'py-int', title: 'Stage 5 (Unit 5): Tuples, Sets & Dictionaries', description: 'Tuple immutability, packing/unpacking, set uniqueness, dict methods, and comprehensions', order_index: 3 },
        { id: 'mod-py-6', course_id: 'py-adv', title: 'Stage 6 (Unit 6): Functions, Modules & Regular Expressions', description: 'Functions, *args/**kwargs, LEGB scope, recursion, random/math modules, and regex', order_index: 1 },
        // C Modules
        { id: 'mod-c-1', course_id: 'c-beg', title: 'Core Syntax & Control Flow', description: 'Variables, loops, and conditions', order_index: 1 },
        { id: 'mod-c-2', course_id: 'c-int', title: 'Pointers & Dynamic Memory', description: 'Memory addressing, malloc, and pointer math', order_index: 2 },
        { id: 'mod-c-3', course_id: 'c-adv', title: 'Structures & Systems Programming', description: 'Structs, files, and low-level memory handling', order_index: 3 },
        // C++ Modules
        { id: 'mod-cpp-1', course_id: 'cpp-beg', title: 'Language Foundations', description: 'Control structures and references', order_index: 1 },
        { id: 'mod-cpp-2', course_id: 'cpp-int', title: 'Object-Oriented C++', description: 'Encapsulation, inheritance, and virtual methods', order_index: 2 },
        { id: 'mod-cpp-3', course_id: 'cpp-adv', title: 'Standard Template Library (STL)', description: 'Vectors, maps, algorithms, and smart pointers', order_index: 3 },
        // Java Modules
        { id: 'mod-java-1', course_id: 'java-beg', title: 'Java Basics & Methods', description: 'JVM fundamentals and control structures', order_index: 1 },
        { id: 'mod-java-2', course_id: 'java-int', title: 'OOP Principles in Java', description: 'Classes, inheritance, and interfaces', order_index: 2 },
        { id: 'mod-java-3', course_id: 'java-adv', title: 'Collections & Streams API', description: 'Generics, functional pipelines, and streams', order_index: 3 }
    ],
    topics: [
        // --- PYTHON TOPICS (Stage 1 to 6 - Units 1 to 6 of Python1.pdf) ---
        // Stage 1 (Unit 1): Language Fundamentals & Types
        {
            id: 'top-py-fundamentals',
            module_id: 'mod-py-1',
            title: 'Language Fundamentals, Datatypes & Immutability',
            order_index: 1,
            learning_objective: 'Understand Python history, 11 core features, 6 flavours, 14 built-in datatypes, object identity (id/type), and immutability.',
            content_standard: 'Python was created by Guido Van Rossum in 1989 and released in 1991. It is high-level, interpreted, and dynamically typed. All fundamental types (int, float, complex, bool, str) are immutable objects in memory.',
            content_low: '### ⚡ Fast-Track Summary\n- 11 features: simple, freeware, platform-independent (PVM), interpreted, dynamically typed, extensible, embedded, rich library.\n- Flavours: CPython (standard), Jython (JVM), IronPython (.NET), PyPy (JIT speed).\n- 14 types: int, float, complex, bool, str, bytes, bytearray, range, list, tuple, set, frozenset, dict, None.\n- Immutability: fundamental objects cannot be modified in place; `id(x)` reflects memory location; `is` checks address, `==` checks value.',
            content_medium: '### 📘 Standard Guide\nPython handles memory automatically via PVM. Identifiers cannot start with digits. Only 3 of 33 keywords are capitalized: `True`, `False`, `None`.\nBase conversions: `bin()`, `oct()`, `hex()`. Fundamental types are immutable: modifying a variable rebinds it to a new object.',
            content_high: '### 🌱 Step-by-Step Breakdown\n1. **High-Level**: You don\'t worry about low-level memory allocation or pointers.\n2. **Dynamic Typing**: Write `x = 10` (integer) or `x = "Hello"` (string); Python determines types automatically.\n3. **Analogy**: Variables are sticky labels on boxes, not the boxes themselves!',
            syntax: '# Base conversion\na = 15\nprint(bin(a)) # 0b1111\nprint(hex(a)) # 0xf\n\n# Identity vs Equality\nx = 256; y = 256\nprint(x is y) # True (object interning)',
            examples: '# Check memory address and type\na = 10\nprint(type(a), id(a))\na = a + 1\nprint(type(a), id(a)) # New memory address created!',
            common_mistakes: '1. Using reserved words as variable names (e.g. `def = 44` causes SyntaxError).\n2. Expecting immutable objects to change in-place without assignment.',
            practice_prompt: 'Write a script that demonstrates integer base conversion from decimal to binary, octal, and hexadecimal.',
            sections: [
                {
                    id: 'sec-py-fund-1',
                    title: '1. Python Architecture & Flavours',
                    order_index: 1,
                    content: 'Guido Van Rossum developed Python borrowing functional syntax from C, OOP from C++, and scripting from Perl/Shell. PyPy uses a JIT compiler inside the PVM for massive performance speedups.',
                    code_snippet: 'import sys\nprint(sys.version)',
                    mini_check: {
                        question: 'Which flavour of Python runs on the Java Virtual Machine (JVM)?',
                        options: ['CPython', 'Jython', 'IronPython', 'PyPy'],
                        correct_index: 1,
                        explanation: 'Jython (originally JPython) is designed to run seamlessly on the Java Virtual Machine.'
                    }
                },
                {
                    id: 'sec-py-fund-2',
                    title: '2. The 33 Keywords & Identifier Rules',
                    order_index: 2,
                    content: 'Identifiers allow letters, digits, and underscores, but cannot start with a digit. Only 3 keywords are capitalized: True, False, and None. The other 30 are strictly lowercase.',
                    code_snippet: 'import keyword\nprint("Total keywords:", len(keyword.kwlist))\nprint([k for k in keyword.kwlist if k[0].isupper()])',
                    pitfalls: 'Using identifiers like `2total` or keywords like `class` as variable names will trigger immediate SyntaxErrors.'
                },
                {
                    id: 'sec-py-fund-3',
                    title: '3. Immutability & Object Interning',
                    order_index: 3,
                    content: 'All fundamental data types are immutable. Small integers (-5 to 256) are interned so identical values share the exact same object in memory.',
                    code_snippet: 'a = 100\nb = 100\nprint("Same object?", a is b) # True\nprint("Same content?", a == b) # True'
                }
            ]
        },
        // Stage 1 (Unit 1): Operators & Dynamic I/O
        {
            id: 'top-py-operators-io',
            module_id: 'mod-py-1',
            title: 'Operators & Dynamic Input/Output Statements',
            order_index: 2,
            learning_objective: 'Master arithmetic, floor division, bitwise operations, ternary operators, single-line multiple inputs, and formatted print output.',
            content_standard: 'Python supports 7 arithmetic operators including floor division `//` and exponent `**`. In Python 3, `input()` returns string data. Use `[int(x) for x in input().split()]` to read space-separated values.',
            content_low: '### ⚡ Fast-Track Summary\n- Division `/` always returns float; `//` returns integer floor if both operands are int, or float floor if either is float.\n- Bitwise `~x = -(x + 1)` (two\'s complement).\n- Ternary: `val = a if cond else b` (supports nesting).\n- `print(*args, sep=" ", end="\\n")`.\n- Format: `f"{val:.2f}"` or `"{0} {1}".format(a, b)`.',
            content_medium: '### 📘 Standard Guide\n1. Single line multiple inputs: `a, b = [int(x) for x in input().split()]`.\n2. String repetition `*` requires integer count: `\'hello\' * 3`.\n3. `print()` parameters: `sep=","` alters argument delimiter; `end=" "` prevents newline.',
            content_high: '### 🌱 Step-by-Step Breakdown\n1. **Floor Division**: `10 // 3` gives 3 (chops off decimals).\n2. **Ternary Operator**: `result = "Pass" if score >= 50 else "Fail"` reads like an English sentence!\n3. **Input Tokenization**: `.split()` cuts a long input string into separate words.',
            syntax: '# Reading multiple integers\nx, y = [int(n) for n in input("Enter 2 numbers: ").split()]\n\n# Formatted output\nprint("x={}, y={}".format(x, y))\nprint(x, y, sep="::", end="\\n")',
            examples: '# Nested ternary for min of 3 numbers\na, b, c = 10, 20, 5\nmin_val = a if a < b and a < c else b if b < c else c\nprint("Minimum:", min_val)',
            common_mistakes: '1. Multiplying two strings (`"a" * "b"` raises TypeError).\n2. Division by zero (`x // 0` raises ZeroDivisionError).',
            practice_prompt: 'Write a program to read 3 numbers in a single line and print their average formatted to 2 decimal places.',
            prerequisite_topic_id: 'top-py-fundamentals',
            sections: [
                {
                    id: 'sec-py-op-1',
                    title: '1. Division vs Floor Division',
                    order_index: 1,
                    content: 'Normal division `/` always returns a float (`10 / 2` is `5.0`). Floor division `//` truncates to the lowest whole integer (`10 // 3` is `3`, but `10.0 // 3` is `3.0`).',
                    code_snippet: 'print("10/2 =", 10/2)   # 5.0\nprint("10//3 =", 10//3) # 3\nprint("10.0//3 =", 10.0//3) # 3.0',
                    mini_check: {
                        question: 'What is the value of `10.0 // 3`?',
                        options: ['3', '3.0', '3.33', 'Error'],
                        correct_index: 1,
                        explanation: 'When either operand is a float, floor division returns a floating point number (3.0).'
                    }
                },
                {
                    id: 'sec-py-op-2',
                    title: '2. Dynamic Single-Line Input with Unpacking',
                    order_index: 2,
                    content: 'Read multiple space-separated numbers using `split()` and list comprehension unpacking in one clean line.',
                    code_snippet: 'a, b = [int(x) for x in "10 20".split()]\nprint("Sum is:", a + b)'
                },
                {
                    id: 'sec-py-op-3',
                    title: '3. Output Customization: sep and end',
                    order_index: 3,
                    content: 'The `sep` keyword defines what character separates arguments; `end` controls what character prints after the final argument.',
                    code_snippet: 'print(10, 20, 30, sep="-", end="***")\nprint(40, 50, sep=":")\n# Output: 10-20-30***40:50'
                }
            ]
        },
        // Stage 2 (Unit 2): Flow Control & Conditionals
        {
            id: 'top-py-flow-control',
            module_id: 'mod-py-2',
            title: 'Flow Control, Conditionals & Transfer Statements',
            order_index: 1,
            learning_objective: 'Master if-elif-else branching, indentation syntax, transfer statements (break, continue, pass), and variable deletion with del vs None.',
            content_standard: 'In Python, flow control statements determine execution paths. Python uses colons and 4-space indentation instead of braces. Transfer statements include break, continue, pass, and del.',
            content_low: '### ⚡ Fast-Track Summary\n- Indentation-based block syntax; no `switch` or `goto`.\n- `pass` is syntactic no-op; `del x` unbinds name; `x = None` retains name.\n- Short-circuit boolean evaluation: `x and y`, `x or y`.',
            content_medium: '### 📘 Standard Guide\n1. Use `if-elif-else` for multi-condition branching.\n2. `pass` acts as a placeholder for unfinished functions or empty blocks.\n3. `del x` deletes the variable from memory; calling `x` afterwards raises `NameError`.',
            content_high: '### 🌱 Step-by-Step Breakdown\n1. **Branching**: Like a fork in the road. If condition is True, turn left; else turn right.\n2. **Pass**: Like an "Under Construction" sign—lets Python drive by smoothly without crashing!\n3. **Del vs None**: `del x` throws away the box and label; `x = None` puts an empty note in the box.',
            syntax: 'if condition1:\n    # block 1\nelif condition2:\n    # block 2\nelse:\n    # fallback block\n\n# Placeholder\nif is_admin:\n    pass\n\n# Deletion\nx = 100\ndel x',
            examples: '# Grade evaluator\nscore = 85\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")',
            common_mistakes: '1. Inconsistent indentation mixing tabs and spaces.\n2. Confusing `del x` (removes variable) with `x = None` (keeps variable with None value).',
            practice_prompt: 'Write a program to evaluate whether a student passed (marks >= 40 in all 3 subjects and average >= 50).',
            prerequisite_topic_id: 'top-py-operators-io',
            sections: [
                {
                    id: 'sec-py-fc-1',
                    title: '1. Conditional Branching with if-elif-else',
                    order_index: 1,
                    content: 'Python uses indentation to demarcate code blocks following an `if`, `elif`, or `else:` header. Evaluation stops at the first branch whose condition is True.',
                    code_snippet: 'x = 15\nif x > 20:\n    print("Large")\nelif x > 10:\n    print("Medium")\nelse:\n    print("Small")',
                    mini_check: {
                        question: 'What character initiates a code block in Python conditional statements?',
                        options: ['Semicolon (;)', 'Colon (:)', 'Curly brace ({)', 'Arrow (->)'],
                        correct_index: 1,
                        explanation: 'In Python, a colon (:) marks the end of the header line and initiates the indented block.'
                    }
                },
                {
                    id: 'sec-py-fc-2',
                    title: '2. The pass Statement as a Syntactic Placeholder',
                    order_index: 2,
                    content: '`pass` is a null statement in Python. When executed, nothing happens, but it prevents IndentationError when a statement block is syntactically required.',
                    code_snippet: 'def future_function():\n    pass # Will implement tomorrow\n\nfor i in range(5):\n    if i == 2:\n        pass # Do nothing for 2\n    print(i)'
                },
                {
                    id: 'sec-py-fc-3',
                    title: '3. del Statement vs None Assignment',
                    order_index: 3,
                    content: '`del x` removes the variable name `x` entirely from the local/global namespace. In contrast, `x = None` retains the name, simply referencing the singleton `None` object.',
                    code_snippet: 'a = 10\na = None # a still exists\nprint(a) # prints None\n\nb = 20\ndel b # b is destroyed\n# print(b) would raise NameError: name \'b\' is not defined',
                    pitfalls: 'Calling `del` on a variable does not necessarily delete the object immediately if another reference still points to it (reference counting garbage collection).'
                }
            ]
        },
        // Stage 2 (Unit 2): Loops & Pattern Printing
        {
            id: 'top-py-loops',
            module_id: 'mod-py-2',
            title: 'Loops, Iteration Constructs & Pattern Printing',
            order_index: 2,
            learning_objective: 'Master for and while loops, iteration over ranges and sequences, loop else clauses, and geometric pattern printing techniques.',
            content_standard: 'In Python, loops provide repetition without code duplication. `for item in sequence:` iterates over iterables, while `while condition:` continues until the boolean condition evaluates to False.',
            content_low: '### ⚡ Fast-Track Summary\n- `for i in range(n)`: O(1) space lazy sequence generation.\n- List comprehensions preferred over imperative loops when mapping/filtering.\n- `break` exits immediately; `continue` skips to next step; `else:` triggers only on non-break completion.',
            content_medium: '### 📘 Standard Guide\nPython supports two primary loops:\n1. **For Loop**: Best when the count or sequence is known in advance.\n2. **While Loop**: Best when looping depends on dynamic runtime conditions.\nRemember: `range(1, 5)` yields values `1, 2, 3, 4`.',
            content_high: '### 🌱 Step-by-Step Breakdown\nLet\'s take this slowly! A loop is like an automated counting machine.\n\n1. **Start small**: `for i in range(3): print(i)` will print 0, then 1, then 2.\n2. **Analogy**: Imagine checking off items on a grocery checklist one by one.\n3. **Notice**: Stop value is never included. `range(0, 5)` stops before 5!',
            syntax: 'for item in iterable:\n    # execute block\n\nwhile condition:\n    # execute block\n    # ensure condition progresses toward False!',
            examples: '# Example 1: Right-angled number triangle\nn = 4\nfor i in range(1, n + 1):\n    print(" ".join([str(i)] * i))\n\n# Example 2: While loop with countdown\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Blast off!")',
            common_mistakes: '1. Infinite while loops due to missing update statements.\n2. Off-by-one errors with range(start, stop).\n3. Modifying a collection while actively looping over it.',
            practice_prompt: 'Write a loop that calculates the sum of all even numbers from 1 to 20 inclusive.',
            prerequisite_topic_id: 'top-py-flow-control',
            sections: [
                {
                    id: 'sec-py-loop-1',
                    title: '1. What is a Loop?',
                    order_index: 1,
                    content: 'In programming, repetition is everywhere. A loop allows you to execute a specific block of instructions repeatedly without copy-pasting code.',
                    code_snippet: 'for i in range(3):\n    print("Hello learner!")',
                    mini_check: {
                        question: 'How many times will `for i in range(3)` print the message?',
                        options: ['2 times', '3 times', '4 times'],
                        correct_index: 1,
                        explanation: 'range(3) produces 0, 1, 2 which is exactly 3 iterations.'
                    }
                },
                {
                    id: 'sec-py-loop-2',
                    title: '2. For vs While Loops',
                    order_index: 2,
                    content: 'Use a `for` loop when you have a collection or known range. Use a `while` loop when looping depends on a runtime boolean condition.',
                    code_snippet: '# While loop countdown\nenergy = 3\nwhile energy > 0:\n    print("Running...")\n    energy -= 1',
                    pitfalls: 'Always ensure your while loop has a condition that eventually turns False, otherwise your program will freeze in an infinite loop!'
                },
                {
                    id: 'sec-py-loop-3',
                    title: '3. Controlling Flow: break, continue, and loop else',
                    order_index: 3,
                    content: '`break` terminates the enclosing loop immediately. `continue` skips to the next iteration. An `else:` block on a loop runs only if the loop finishes naturally without breaking.',
                    code_snippet: 'for num in range(10):\n    if num == 5:\n        break\n    if num % 2 == 0:\n        continue\n    print("Odd:", num)\nelse:\n    print("Done!")'
                },
                {
                    id: 'sec-py-loop-4',
                    title: '4. Pattern Printing with Loops',
                    order_index: 4,
                    content: 'Pattern printing reinforces nested loop logic and string multiplication. Using `" ".join([str(i)] * i)` or nested `for j in range(i)` prints geometric formations.',
                    code_snippet: '# Number triangle\nfor i in range(1, 5):\n    for j in range(i):\n        print(i, end=" ")\n    print()'
                }
            ]
        },
        // Stage 3 (Unit 3): Strings & Slicing
        {
            id: 'top-py-strings',
            module_id: 'mod-py-3',
            title: 'In-Depth String Operations, Slicing & Algorithms',
            order_index: 1,
            learning_objective: 'Master positive/negative string slicing, substring searching (find vs index), character validation methods, and string algorithms.',
            content_standard: 'Strings are immutable sequences of characters supporting forward (positive) and backward (negative) indexing. Slicing with step `s[begin:end:step]` allows stride selection and full reversal with `s[::-1]`.',
            content_low: '### ⚡ Fast-Track Summary\n- Slicing: `s[begin:end:step]`. Default begin=0, end=len, step=1. Negative step reverses.\n- Searching: `s.find()` returns -1 on failure; `s.index()` raises ValueError.\n- Methods: `strip()`, `split()`, `rsplit()`, `join()`, `replace()`.\n- Checks: `isalnum()`, `isalpha()`, `isdigit()`, `islower()`, `isupper()`, `isspace()`.',
            content_medium: '### 📘 Standard Guide\n1. Slicing never raises IndexError: `s[3:1000]` returns up to string end.\n2. Reversal idiom: `reversed_s = s[::-1]`.\n3. Replace: `s.replace("old", "new")` creates a new string without mutating original.',
            content_high: '### 🌱 Step-by-Step Breakdown\n1. **Indexing**: First letter is `s[0]`, last letter is `s[-1]`.\n2. **Slicing**: Like cutting slices of a loaf of bread: `s[1:4]` takes slice from index 1 up to 3.\n3. **Reverse**: `s[::-1]` flips the entire word backwards instantly!',
            syntax: 's = "karthikeya"\nprint(s[0])    # \'k\'\nprint(s[-1])   # \'a\'\nprint(s[2:7])  # \'rthik\'\nprint(s[::-1]) # reverse',
            examples: '# Alternate string merge\ns1 = "karthi"\ns2 = "sahasra"\nmerged = []\ni, j = 0, 0\nwhile i < len(s1) or j < len(s2):\n    if i < len(s1): merged.append(s1[i]); i += 1\n    if j < len(s2): merged.append(s2[j]); j += 1\nprint("Merged:", "".join(merged))',
            common_mistakes: '1. Attempting in-place modification: `s[0] = "A"` raises TypeError.\n2. Using `s.index()` without try-except when substring may not exist.',
            practice_prompt: 'Write a program to reverse the internal characters of each word in a given sentence.',
            prerequisite_topic_id: 'top-py-loops',
            sections: [
                {
                    id: 'sec-py-str-1',
                    title: '1. Slicing with Step & String Reversal',
                    order_index: 1,
                    content: 'The slice operator takes `[start:stop:step]`. With negative step, Python traverses backwards, enabling clean one-line reversal without loops.',
                    code_snippet: 'msg = "Python Learning"\nprint(msg[::-1]) # gninraeL nohtyP'
                },
                {
                    id: 'sec-py-str-2',
                    title: '2. find() vs index() and count()',
                    order_index: 2,
                    content: '`find()` returns -1 if the substring is missing. `index()` raises ValueError. `count()` returns total non-overlapping occurrences.',
                    code_snippet: 's = "abcabc"\nprint(s.find("z"))  # -1\nprint(s.count("ab")) # 2'
                },
                {
                    id: 'sec-py-str-3',
                    title: '3. Character Testing: isalnum, isalpha, isdigit',
                    order_index: 3,
                    content: 'Python provides built-in boolean validators to inspect character classes without regex overhead.',
                    code_snippet: 'print("A123".isalnum()) # True\nprint("Hello".isalpha()) # True\nprint("99".isdigit())    # True'
                }
            ]
        },
        // Stage 4 (Unit 4): Lists & Comprehensions
        {
            id: 'top-py-lists',
            module_id: 'mod-py-4',
            title: 'List Data Structure, Matrices & Comprehensions',
            order_index: 1,
            learning_objective: 'Master list operations (append, insert, extend, pop, remove, sort), aliasing vs cloning ([:], copy()), 2D nested matrices, and list comprehensions.',
            content_standard: 'Lists are mutable ordered collections supporting dynamic resizing. Aliasing (`b = a`) shares references, whereas cloning (`b = a[:]` or `a.copy()`) creates independent copies. List comprehensions provide concise filtering and transformation.',
            content_low: '### ⚡ Fast-Track Summary\n- `append(x)` (single item) vs `extend(it)` (unpacks iterable) vs `insert(i, x)`.\n- Aliasing shares memory pointer; `copy()` or `[:]` clones shallowly; `copy.deepcopy()` for nested lists.\n- List comprehensions `[f(x) for x in seq if cond]` are byte-code optimized.',
            content_medium: '### 📘 Standard Guide\n1. Mutability: `lst[0] = 99` changes list in place.\n2. Removing: `remove(val)` deletes first occurrence (raises ValueError if absent); `pop()` deletes and returns last element.\n3. 2D grids: `matrix[r][c]` accesses row and column.',
            content_high: '### 🌱 Step-by-Step Breakdown\n1. **List**: A numbered shopping list. You can cross items out, add items to the bottom, or reorder them.\n2. **Aliasing**: Giving a second key to the same house. If someone changes the sofa, both key-holders see it!\n3. **Cloning**: Building an identical house. Changes inside do not affect the other.',
            syntax: '# Methods\nnums = [1, 2, 3]\nnums.append(4)\nnums.extend([5, 6])\n\n# Cloning\nclone = nums[:]\n\n# 2D Matrix & Comprehension\nmatrix = [[1, 2], [3, 4]]\nsquares = [x**2 for x in range(1, 6) if x % 2 != 0]',
            examples: '# Matrix Transpose\nmatrix = [[1, 2, 3], [4, 5, 6]]\ntransposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]\nprint("Transposed:", transposed)',
            common_mistakes: '1. Modifying aliased lists assuming they are independent copies.\n2. Calling `sort()` and expecting a return value (`lst.sort()` returns None!).',
            practice_prompt: 'Write a program to transpose a 2D matrix using list comprehension.',
            prerequisite_topic_id: 'top-py-strings',
            sections: [
                {
                    id: 'sec-py-list-1',
                    title: '1. Adding & Removing Elements: append vs extend',
                    order_index: 1,
                    content: '`append(x)` inserts `x` as a single object at the end of the list. `extend(iterable)` iterates through `iterable` and appends each element individually.',
                    code_snippet: 'a = [1, 2]\na.append([3, 4]) # [1, 2, [3, 4]]\nb = [1, 2]\nb.extend([3, 4]) # [1, 2, 3, 4]',
                    mini_check: {
                        question: 'What is the length of `a` after `a = [1, 2]; a.append([3, 4])`?',
                        options: ['3', '4', '2', 'Error'],
                        correct_index: 0,
                        explanation: 'append([3, 4]) adds the nested list as a single 3rd element, so len(a) is 3.'
                    }
                },
                {
                    id: 'sec-py-list-2',
                    title: '2. Aliasing vs Cloning: The Shallow Copy Trap',
                    order_index: 2,
                    content: 'Aliasing (`y = x`) assigns the same object reference. To modify a list without mutating the original, clone it via slicing `x[:]` or `x.copy()`.',
                    code_snippet: 'x = [10, 20]\ny = x      # Aliasing\nz = x.copy() # Cloning\nx[0] = 99\nprint("y[0]:", y[0]) # 99 (modified!)\nprint("z[0]:", z[0]) # 10 (untouched!)'
                },
                {
                    id: 'sec-py-list-3',
                    title: '3. 2D Matrices & List Comprehensions',
                    order_index: 3,
                    content: 'List comprehensions `[expr for item in seq if cond]` replace multi-line loops with fast, expressive syntax.',
                    code_snippet: 'evens = [x for x in range(10) if x % 2 == 0]\nmatrix = [[1, 2], [3, 4]]\nflat = [val for row in matrix for val in row]\nprint("Flattened:", flat)'
                }
            ]
        },
        // Stage 5 (Unit 5): Tuples & Sets
        {
            id: 'top-py-tuples-sets',
            module_id: 'mod-py-5',
            title: 'Tuples and Sets Data Structures',
            order_index: 1,
            learning_objective: 'Understand tuple immutability, packing/unpacking, set uniqueness, discard vs remove, and mathematical set operations.',
            content_standard: 'Tuples are immutable ordered sequences (`(10, 20)`). Sets are mutable, unordered collections of unique elements (`{10, 20}`). Sets eliminate duplicates and support union, intersection, and difference.',
            content_low: '### ⚡ Fast-Track Summary\n- Tuples: read-only lists, memory-efficient, single-item tuple requires comma `(10,)`.\n- Sets: hash-table backed, O(1) membership `in`, unordered, unindexed.\n- Set operations: `|` (union), `&` (intersection), `-` (difference), `^` (symmetric difference).\n- `s.discard(x)` does not crash if x missing; `s.remove(x)` raises KeyError.',
            content_medium: '### 📘 Standard Guide\n1. Use tuples when data is fixed (e.g. coordinates, database rows).\n2. Use sets when duplicates must be eliminated.\n3. Empty set requires `set()`; `{}` creates an empty dictionary.',
            content_high: '### 🌱 Step-by-Step Breakdown\n- **Tuple**: An engraved stone tablet. You cannot add or erase words.\n- **Set**: A guest list with a strict doorman. If a name is already on the list, duplicate entries are thrown away.',
            syntax: '# Tuples\nt = (10, 20, 30)\na, b, c = t # unpacking\n\n# Sets\ns = {10, 20, 30, 20}\nprint(s) # {10, 20, 30}',
            examples: '# Set operations\nA = {1, 2, 3, 4}\nB = {3, 4, 5, 6}\nprint("Union:", A | B)\nprint("Intersection:", A & B)\nprint("Difference:", A - B)',
            common_mistakes: '1. Creating single-element tuple without comma: `t = (10)` is an int, not a tuple! Must be `t = (10,)`.\n2. Attempting indexing on a set (`s[0]` raises TypeError).',
            practice_prompt: 'Given a list of numbers with duplicates, use a set to print all unique elements in sorted order.',
            prerequisite_topic_id: 'top-py-lists',
            sections: [
                {
                    id: 'sec-py-ts-1',
                    title: '1. Tuples: Immutability & Packing',
                    order_index: 1,
                    content: 'Tuples prevent accidental data modification. Single valued tuples must terminate with a comma: `t = (10,)`. Tuple packing combines variables; unpacking assigns them back.',
                    code_snippet: 't = 10, 20, 30 # packing\nx, y, z = t    # unpacking\nprint("y =", y)'
                },
                {
                    id: 'sec-py-ts-2',
                    title: '2. Sets: Uniqueness & remove vs discard',
                    order_index: 2,
                    content: 'Sets automatically deduplicate elements. Use `discard()` when an item might not exist to avoid KeyError crashes.',
                    code_snippet: 's = {10, 20, 30}\ns.discard(50) # Safe, no error\n# s.remove(50) would raise KeyError'
                },
                {
                    id: 'sec-py-ts-3',
                    title: '3. Mathematical Set Operations',
                    order_index: 3,
                    content: 'Perform union (`|`), intersection (`&`), difference (`-`), and symmetric difference (`^`) with native operators.',
                    code_snippet: 'x = {1, 2, 3}\ny = {3, 4, 5}\nprint("Common:", x & y) # {3}\nprint("Only in x:", x - y) # {1, 2}'
                }
            ]
        },
        // Stage 5 (Unit 5): Dictionaries
        {
            id: 'top-py-dictionaries',
            module_id: 'mod-py-5',
            title: 'Dictionary Data Structure & Hash Tables',
            order_index: 2,
            learning_objective: 'Understand key-value mappings, immutable key constraints, dict methods (get, pop, items, setdefault), frequency counters, and dictionary comprehensions.',
            content_standard: 'Dictionaries store key-value associations backed by hash tables with O(1) average lookup. Keys must be hashable and unique. Use `get(k, default)` to avoid KeyError.',
            content_low: '### ⚡ Fast-Track Summary\n- Keys must be immutable (str, int, tuple). Values can be any type.\n- `.setdefault(k, d)` returns existing value or sets default.\n- Dict comprehensions: `{k: v for k, v in ...}`.\n- In Python 3.7+, insertion order is guaranteed preserved.',
            content_medium: '### 📘 Standard Guide\n1. Access with `d.get(key, fallback)` to avoid KeyError crashes.\n2. Frequency counting pattern: `freq[ch] = freq.get(ch, 0) + 1`.\n3. Iterate pairs with `for k, v in d.items():`.\n4. Keys must be hashable: lists cannot be keys, but tuples can.',
            content_high: '### 🌱 Step-by-Step Breakdown\n1. **Dictionary**: Like a real dictionary or phone book. You look up a word (key) to get its definition (value).\n2. **Safe Lookup**: Asking "Does room 101 have a key?" instead of blindly opening the door.',
            syntax: 'd = {"apple": 5, "banana": 3}\nprint(d.get("orange", 0)) # Safe fallback 0\nd["orange"] = 7\nfor k, v in d.items():\n    print(f"{k}: {v}")',
            examples: '# Frequency count of words\ntext = "hello world hello python"\nfreq = {}\nfor word in text.split():\n    freq[word] = freq.get(word, 0) + 1\nprint(freq)',
            common_mistakes: '1. Using a mutable list as a dictionary key (`d[[1, 2]] = "val"` raises TypeError: unhashable type).\n2. Using `d[k]` when k might not exist instead of `d.get(k)`.',
            practice_prompt: 'Write a program that takes a sentence and counts the frequency of each unique word using a dictionary.',
            prerequisite_topic_id: 'top-py-tuples-sets',
            sections: [
                {
                    id: 'sec-py-dict-1',
                    title: '1. Keys, Values & Hashability Rules',
                    order_index: 1,
                    content: 'Dictionary keys must be immutable and hashable (integers, strings, floats, tuples). Values can be of any type, including mutable lists or nested dictionaries.',
                    code_snippet: 'd = {1: "one", "pi": 3.14, (0, 0): "origin"}\nprint(d[(0, 0)]) # "origin"',
                    mini_check: {
                        question: 'Which of the following can be used as a dictionary key in Python?',
                        options: ['[1, 2] (list)', '{1, 2} (set)', '(1, 2) (tuple)', '{"a": 1} (dict)'],
                        correct_index: 2,
                        explanation: 'Tuples are immutable and hashable, making them valid dictionary keys. Lists, sets, and dicts are mutable and unhashable.'
                    }
                },
                {
                    id: 'sec-py-dict-2',
                    title: '2. Safe Lookups & Methods: get, setdefault, pop',
                    order_index: 2,
                    content: '`get(key, default)` returns the default value without raising KeyError if the key is missing. `setdefault(key, val)` returns the current value, or sets and returns `val` if missing.',
                    code_snippet: 'scores = {"Alice": 95}\nprint(scores.get("Bob", 0)) # 0\nscores.setdefault("Bob", 80)\nprint(scores["Bob"]) # 80'
                },
                {
                    id: 'sec-py-dict-3',
                    title: '3. Frequency Counting & Dict Comprehensions',
                    order_index: 3,
                    content: 'The idiom `d[x] = d.get(x, 0) + 1` builds frequency maps in O(N) time. Dict comprehensions `{k: v for ...}` construct mappings declaratively.',
                    code_snippet: 'squares = {x: x**2 for x in range(1, 6)}\nprint(squares) # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}'
                }
            ]
        },
        // Stage 6 (Unit 6): Functions & Scope
        {
            id: 'top-py-functions',
            module_id: 'mod-py-6',
            title: 'Functions, Parameters & Scope (LEGB)',
            order_index: 1,
            learning_objective: 'Define modular functions, understand positional vs keyword parameters, default arguments, *args/**kwargs, and the LEGB variable scope rule.',
            content_standard: 'Functions encapsulate reusable logic using `def func_name(args):`. Python functions are first-class citizens and can be passed as arguments or returned from other functions.',
            content_low: '### ⚡ Fast-Track Summary\n- First-class citizen functions with `*args` (tuple) and `**kwargs` (dict) unpacking.\n- Closure and lexical scoping (LEGB rule: Local, Enclosing, Global, Built-in).\n- Avoid mutable default arguments (`def f(x=[])`).',
            content_medium: '### 📘 Standard Guide\nDefine functions using `def`. Return values using `return`. Scope determines where a variable is accessible: local variables inside a function cannot be seen outside unless declared `global`.',
            content_high: '### 🌱 Step-by-Step Breakdown\nA function is like a kitchen recipe or a mini-calculator:\n1. You give it ingredients (parameters).\n2. It follows steps inside its body.\n3. It serves you the final dish (return value).',
            syntax: 'def function_name(param1, *args, param2=default_val, **kwargs):\n    """Docstring explanation."""\n    result = param1 + param2\n    return result',
            examples: 'def greet(name, title="Learner"):\n    return f"Welcome, {title} {name}!"\n\nprint(greet("Ada", "Dr."))\nprint(greet("Alan"))',
            common_mistakes: '1. Forgetting the `return` keyword (functions default to returning `None`).\n2. Defining mutable defaults like `def add(val, lst=[]):` which persist across calls.',
            practice_prompt: 'Create a function `is_palindrome(text)` that returns True if a given string reads the same forwards and backwards.',
            prerequisite_topic_id: 'top-py-dictionaries',
            sections: [
                {
                    id: 'sec-py-func-1',
                    title: '1. What is a Function?',
                    order_index: 1,
                    content: 'A function is a named block of code that performs a specific task. Instead of rewriting the same 10 lines of code across your project, you call the function.',
                    code_snippet: 'def calculate_area(width, height):\n    return width * height'
                },
                {
                    id: 'sec-py-func-2',
                    title: '2. Parameters, *args, and **kwargs',
                    order_index: 2,
                    content: 'Parameters accept input values. `*args` collects extra positional arguments into a tuple; `**kwargs` collects extra keyword arguments into a dictionary.',
                    code_snippet: 'def show_info(title, *tags, **details):\n    print("Title:", title)\n    print("Tags tuple:", tags)\n    print("Details dict:", details)\n\nshow_info("Python", "dev", "ai", author="Guido", year=1991)'
                },
                {
                    id: 'sec-py-func-3',
                    title: '3. Variable Scope & LEGB Rule',
                    order_index: 3,
                    content: 'Scope determines variable visibility. Python looks up names in LEGB order: Local -> Enclosing -> Global -> Built-in. Variables declared inside a function are local.',
                    pitfalls: 'A common trap is defining `def append_to(item, target_list=[]):`. Default values are evaluated ONCE when the function is defined, making mutable defaults shared across all calls!'
                }
            ]
        },
        // Stage 6 (Unit 6): Recursion
        {
            id: 'top-py-recursion',
            module_id: 'mod-py-6',
            title: 'Recursion and Recursive Thinking',
            order_index: 2,
            learning_objective: 'Understand base cases, recursive decomposition, call stacks, and recursive function execution in Python.',
            content_standard: 'Recursion occurs when a function calls itself directly or indirectly to solve a smaller instance of the same problem. Every recursive function requires at least one base case to terminate execution.',
            content_low: '### ⚡ Fast-Track Summary\n- Base case: Halting condition preventing stack overflow (RecursionError).\n- Python recursion depth limit: default 1000 frames (`sys.getrecursionlimit()`).\n- Tail call optimization (TCO) is NOT supported in CPython; prefer memoization (`functools.lru_cache`) for recursive algorithms.',
            content_medium: '### 📘 Standard Guide\nA recursive function has two key elements:\n1. **Base Case**: The simplest scenario that returns immediately without calling the function again.\n2. **Recursive Step**: Calling the function with inputs closer to the base case.',
            content_high: '### 🌱 Step-by-Step Breakdown\nImagine Russian nesting dolls (Matryoshka):\n1. To open doll #5, you open doll #4, then #3, then #2, then #1.\n2. Doll #1 is the tiniest solid doll (the **Base Case**).\n3. Once you reach the center, you put them all back together! That is exactly how the computer\'s call stack works.',
            syntax: 'def recursive_func(n):\n    if n <= 1: # Base case\n        return 1\n    return n * recursive_func(n - 1) # Recursive step',
            examples: '# Example 1: Factorial\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint("5! =", factorial(5)) # 120',
            common_mistakes: '1. Forgetting the base case, leading to RecursionError: maximum recursion depth exceeded.\n2. Failing to shrink the input argument towards the base case on each call.',
            practice_prompt: 'Write a recursive function `fibonacci(n)` that calculates the nth Fibonacci number.',
            prerequisite_topic_id: 'top-py-functions',
            sections: [
                {
                    id: 'sec-py-rec-1',
                    title: '1. What is Recursion?',
                    order_index: 1,
                    content: 'Recursion is a programming technique where a function solves a problem by breaking it into smaller sub-problems and calling itself.',
                    code_snippet: 'def countdown(n):\n    if n <= 0:\n        print("Blast off!")\n        return\n    print(n)\n    countdown(n - 1)'
                },
                {
                    id: 'sec-py-rec-2',
                    title: '2. The Call Stack & Base Cases',
                    order_index: 2,
                    content: 'Every recursive invocation allocates a new stack frame containing local variables and return addresses. The base case halts this accumulation.',
                    pitfalls: 'Without a base case, the function will consume all stack memory, causing Python to terminate with `RecursionError: maximum recursion depth exceeded`.'
                },
                {
                    id: 'sec-py-rec-3',
                    title: '3. Classic Recursive Pattern: Factorial',
                    order_index: 3,
                    content: 'The factorial of n (n!) is n * (n - 1)!. The base case is 0! = 1 and 1! = 1.',
                    code_snippet: 'def fact(n):\n    if n <= 1:\n        return 1\n    return n * fact(n - 1)'
                }
            ]
        },
        // Stage 6 (Unit 6): Modules, Math, Random & Regex
        {
            id: 'top-py-modules-regex',
            module_id: 'mod-py-6',
            title: 'Modules, Math, Random & Regular Expressions',
            order_index: 3,
            learning_objective: 'Understand module aliasing, reloading, random/math functions, and regular expression pattern matching with `re` module.',
            content_standard: 'Modules group reusable Python code. `re` provides pattern matching via compile, search, match, and finditer with character classes and quantifiers for validation.',
            content_low: '### ⚡ Fast-Track Summary\n- `import module as alias` for aliasing; `from importlib import reload` to reload dynamic changes.\n- `random`: `randint(a, b)` (inclusive int), `uniform(a, b)` (float), `choice(seq)`.\n- Regex: `re.fullmatch()` validates entire string; `re.findall()` extracts all occurrences.\n- Classes: `\\d` (digit), `\\w` (word char), `\\s` (space). Anchors: `^` (start), `$` (end).',
            content_medium: '### 📘 Standard Guide\n1. Modules avoid code duplication.\n2. `random.randint(100000, 999999)` generates a 6-digit OTP.\n3. Regex: `re.fullmatch(r"[6-9]\\d{9}", phone)` validates a 10-digit Indian phone number.',
            content_high: '### 🌱 Step-by-Step Breakdown\n- A **Module** is a toolbox you import with one command.\n- **Regular Expressions** are like specialized search filters. Instead of checking every character manually, you specify a pattern like "starts with 7, 8, or 9 and has 10 digits"!',
            syntax: 'import re\npattern = r"[6-9]\\d{9}"\nis_valid = bool(re.fullmatch(pattern, "9885768283"))\nprint("Valid phone?", is_valid)',
            examples: '# Generate random 6-digit OTP\nfrom random import randint\notp = "".join(str(randint(0, 9)) for _ in range(6))\nprint("Generated OTP:", otp)',
            common_mistakes: '1. Using `re.match()` instead of `re.fullmatch()` for phone/email validation, allowing trailing garbage characters.\n2. Forgetting that `re.search()` stops at the first match.',
            practice_prompt: 'Write a regex pattern to validate vehicle registration numbers in the format `TS07EA7777`.',
            prerequisite_topic_id: 'top-py-functions',
            sections: [
                {
                    id: 'sec-py-mr-1',
                    title: '1. Modules, Aliasing & __name__',
                    order_index: 1,
                    content: 'Every Python file is a module. When executed directly, `__name__ == "__main__"`. Use `importlib.reload(module)` if a module is modified during a live interactive session.',
                    code_snippet: 'import math as m\nprint("Pi:", m.pi)\nprint("Square root of 16:", m.sqrt(16))'
                },
                {
                    id: 'sec-py-mr-2',
                    title: '2. Random Library & OTP Generation',
                    order_index: 2,
                    content: '`random.randint(0, 9)` produces random integers. We can assemble cryptographically sound one-time passwords and shuffle sequences.',
                    code_snippet: 'from random import randint\nprint("6-digit OTP:", "".join(str(randint(0, 9)) for _ in range(6)))'
                },
                {
                    id: 'sec-py-mr-3',
                    title: '3. Regular Expressions: re.fullmatch & Classes',
                    order_index: 3,
                    content: '`re.fullmatch()` verifies that the entire input satisfies the pattern from start `^` to end `$`. Use `\\d` for digits and `[6-9]` for specific leading ranges.',
                    code_snippet: 'import re\nmobile = "9885768283"\nmatch = re.fullmatch(r"[6-9]\\d{9}", mobile)\nprint("Valid Mobile?", match is not None)'
                }
            ]
        },
        // --- C TOPICS ---
        {
            id: 'top-c-pointers',
            module_id: 'mod-c-2',
            title: 'Pointers and Memory Addressing',
            order_index: 1,
            learning_objective: 'Understand pointers, memory addresses (& operator), dereferencing (* operator), and pointer arithmetic in C.',
            content_standard: 'In C, memory is a linear array of byte addresses. A pointer variable stores an address in memory. The `&` operator gets the address; the `*` operator accesses the value at that address.',
            content_low: '### ⚡ Fast-Track Summary\n- Pointers store 64-bit/32-bit hardware memory addresses.\n- Pointer arithmetic scales automatically by `sizeof(T)`: `ptr + 1` advances by `sizeof(*ptr)` bytes.\n- Avoid undefined behavior: never dereference NULL, uninitialized, or freed pointers.',
            content_medium: '### 📘 Standard Guide\n1. `int *p = &x;` stores address of x into p.\n2. `*p = 50;` changes x to 50.\n3. Pointers allow functions to modify caller variables via pass-by-reference simulation.',
            content_high: '### 🌱 Step-by-Step Breakdown\nDon\'t panic! Pointers are just street addresses:\n- `x` is your friend living in house #42.\n- `&x` is writing down the note: "House #42".\n- `p = &x` means `p` holds the note.\n- `*p` means visiting house #42 to see or change what is inside.',
            syntax: 'int value = 42;\nint *ptr = &value; // ptr stores address\n*ptr = 99;         // dereference: updates value to 99',
            examples: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x=%d, y=%d\\n", x, y);\n    return 0;\n}',
            common_mistakes: '1. Dereferencing uninitialized pointers (`int *p; *p = 10;` causes crash).\n2. Confusing `*` in variable declaration with `*` dereference in expressions.',
            practice_prompt: 'Write a C function `reverse_array(int *arr, int size)` using pointer arithmetic instead of array indexing.',
            sections: [
                {
                    id: 'sec-c-ptr-1',
                    title: '1. What is a Memory Address?',
                    order_index: 1,
                    content: 'Every variable you declare in C resides at a specific physical location in RAM known as a memory address. You can print it using the `&` address-of operator.',
                    code_snippet: 'int x = 10;\nprintf("Value: %d, Address: %p\\n", x, (void*)&x);'
                },
                {
                    id: 'sec-c-ptr-2',
                    title: '2. Declaring and Dereferencing Pointers',
                    order_index: 2,
                    content: 'A pointer is simply a variable whose value IS another memory address. The asterisk `*` serves two distinct roles: in declaration it marks a pointer type; in statements it dereferences.',
                    code_snippet: 'int num = 100;\nint *p = &num; // p points to num\n*p = 250;      // modifies num directly\nprintf("%d\\n", num); // prints 250'
                },
                {
                    id: 'sec-c-ptr-3',
                    title: '3. Pointer Arithmetic',
                    order_index: 3,
                    content: 'Adding 1 to a pointer doesn\'t simply add 1 byte; it advances by the size of the data type it points to. For an `int*`, `p + 1` advances by 4 bytes.',
                    pitfalls: 'Never access memory after calling `free()` (dangling pointer) or dereference a pointer initialized without an address (wild pointer).'
                }
            ]
        },
        {
            id: 'top-c-malloc',
            module_id: 'mod-c-2',
            title: 'Dynamic Memory Allocation (malloc & free)',
            order_index: 2,
            learning_objective: 'Allocate heap memory dynamically with malloc/calloc, avoid memory leaks with free(), and handle allocation failures.',
            content_standard: 'Stack memory has a fixed size and lifetime tied to function execution. Dynamic memory allocation (`malloc`, `calloc`, `realloc`, `free`) requests memory from the system heap at runtime.',
            content_low: '### ⚡ Fast-Track Summary\n- Heap allocation managed via `malloc(size_t)`. Always pair with `free(ptr)`.\n- Check for `NULL` to guard against Out-Of-Memory (OOM) conditions.\n- Use Valgrind/ASan to detect heap leaks and buffer overflows.',
            content_medium: '### 📘 Standard Guide\n1. `int *arr = malloc(n * sizeof(int));`\n2. Always verify `if (arr == NULL)` before writing.\n3. Always call `free(arr); arr = NULL;` when finished.',
            content_high: '### 🌱 Step-by-Step Breakdown\nStack memory is like a small desk: it is fast, but you cannot change its size while working. The Heap is like a storage warehouse: you ask for as much space as you need with `malloc`, but you must remember to return the keys with `free`!',
            syntax: 'int *ptr = (int *)malloc(10 * sizeof(int));\nif (ptr == NULL) { /* handle error */ }\nfree(ptr);\nptr = NULL;',
            examples: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = malloc(5 * sizeof(int));\n    if (!arr) return 1;\n    for(int i=0; i<5; i++) arr[i] = i * 10;\n    free(arr);\n    return 0;\n}',
            common_mistakes: '1. Forgetting to free allocated memory, causing cumulative leaks.\n2. Double-freeing memory.',
            practice_prompt: 'Write a C program that dynamically allocates an array of N integers, reads them, and frees the array.',
            prerequisite_topic_id: 'top-c-pointers',
            sections: [
                {
                    id: 'sec-c-malloc-1',
                    title: '1. Stack vs Heap Memory',
                    order_index: 1,
                    content: 'Variables created inside functions live on the stack and disappear when the function exits. When you need memory that outlives a function or has a size only known at runtime, you allocate from the heap.'
                },
                {
                    id: 'sec-c-malloc-2',
                    title: '2. Safe malloc() and free() Protocol',
                    order_index: 2,
                    content: 'Always multiply the element count by `sizeof(type)`. Always check for NULL return.',
                    code_snippet: 'int *data = malloc(100 * sizeof(int));\nif (data == NULL) {\n    fprintf(stderr, "Memory allocation failed!\\n");\n    exit(1);\n}\n// Use data...\nfree(data);\ndata = NULL;'
                }
            ]
        },
        // --- C++ TOPICS ---
        {
            id: 'top-cpp-oop',
            module_id: 'mod-cpp-2',
            title: 'Classes, Objects & Encapsulation',
            order_index: 1,
            learning_objective: 'Construct C++ classes with private/public encapsulation, constructors, member functions, and object instantiation.',
            content_standard: 'Classes in C++ define user-defined types combining data members and methods. Access specifiers (public, private, protected) enforce encapsulation and protect class invariants.',
            content_low: '### ⚡ Fast-Track Summary\n- Enforces encapsulation and RAII (Resource Acquisition Is Initialization).\n- Prefer member initializer lists in constructors to prevent default construction overhead.\n- Follow the Rule of Five: destructor, copy constructor, copy assignment, move constructor, move assignment.',
            content_medium: '### 📘 Standard Guide\nDeclare fields `private` and provide `public` methods (getters/setters/actions). Constructors initialize objects automatically upon instantiation.',
            content_high: '### 🌱 Step-by-Step Breakdown\nThink of a Class like a blueprint for an automobile:\n1. The blueprint defines what a car has (speed, fuel) and what it does (drive, brake).\n2. An Object is the real car manufactured from that blueprint.\n3. `private` prevents unauthorized passengers from tampering with the engine while running!',
            syntax: 'class BankAccount {\nprivate:\n    double balance;\npublic:\n    BankAccount(double initial_bal) : balance(initial_bal) {}\n    void deposit(double amount) { balance += amount; }\n    double getBalance() const { return balance; }\n};',
            examples: '#include <iostream>\n\nclass Counter {\nprivate:\n    int count;\npublic:\n    Counter() : count(0) {}\n    void increment() { count++; }\n    int get() const { return count; }\n};\n\nint main() {\n    Counter c;\n    c.increment();\n    std::cout << "Count: " << c.get() << std::endl;\n    return 0;\n}',
            common_mistakes: '1. Forgetting the closing semicolon `;` after the class definition body.\n2. Exposing internal mutable pointers/references from private state.',
            practice_prompt: 'Create a C++ `Rectangle` class with private `width` and `height`, and public methods `area()` and `perimeter()`.',
            sections: [
                {
                    id: 'sec-cpp-oop-1',
                    title: '1. Encapsulation & Access Specifiers',
                    order_index: 1,
                    content: 'Encapsulation binds data and functions together while hiding internal implementation details using `private`, `public`, and `protected`.',
                    code_snippet: 'class Wallet {\nprivate:\n    int cash;\npublic:\n    Wallet(int amount) : cash(amount) {}\n    int getCash() const { return cash; }\n};'
                },
                {
                    id: 'sec-cpp-oop-2',
                    title: '2. Member Initializer Lists',
                    order_index: 2,
                    content: 'Always prefer member initialization lists in constructors (`: cash(amount)`) over assigning inside the constructor body, as it avoids redundant default initialization.'
                }
            ]
        },
        // --- JAVA TOPICS ---
        {
            id: 'top-java-oop',
            module_id: 'mod-java-2',
            title: 'Classes, Objects & Inheritance',
            order_index: 1,
            learning_objective: 'Understand Java class hierarchies, method overriding, `extends` keyword, and polymorphic behavior.',
            content_standard: 'In Java, all non-primitive types derive from `java.lang.Object`. Inheritance allows derived classes to inherit state and behavior from a superclass using the `extends` keyword.',
            content_low: '### ⚡ Fast-Track Summary\n- Single inheritance for classes; multiple inheritance via interfaces.\n- Dynamic method dispatch via bytecode `invokevirtual`.\n- Always decorate overridden methods with `@Override` for compile-time signature verification.',
            content_medium: '### 📘 Standard Guide\nSuperclasses define common behavior. Subclasses use `extends SuperClass` to inherit or override methods using `@Override`. Call superclass constructors with `super()`.',
            content_high: '### 🌱 Step-by-Step Breakdown\nInheritance is like family traits:\n1. A Parent Class (`Animal`) knows how to breathe and sleep.\n2. A Child Class (`Dog`) inherits breathing and sleeping automatically, but adds its own special ability: barking!\n3. This saves you from having to rewrite code over and over.',
            syntax: 'class Animal {\n    void speak() {\n        System.out.println("Animal sound");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void speak() {\n        System.out.println("Woof!");\n    }\n}',
            examples: 'public class Main {\n    public static void main(String[] args) {\n        Animal myPet = new Dog();\n        myPet.speak(); // Prints "Woof!" via polymorphism\n    }\n}',
            common_mistakes: '1. Forgetting that Java does NOT allow multiple class inheritance (`class C extends A, B` is illegal).\n2. Omitting `@Override` annotation.',
            practice_prompt: 'Design a `Vehicle` base class and a `Car` subclass in Java that overrides a `startEngine()` method.',
            sections: [
                {
                    id: 'sec-java-oop-1',
                    title: '1. Inheritance Fundamentals',
                    order_index: 1,
                    content: 'Inheritance models an "IS-A" relationship between classes. A subclass inherits accessible members from its superclass.',
                    code_snippet: 'class Employee {\n    double salary = 50000;\n}\nclass Engineer extends Employee {\n    double bonus = 10000;\n}'
                },
                {
                    id: 'sec-java-oop-2',
                    title: '2. Method Overriding & Polymorphism',
                    order_index: 2,
                    content: 'Polymorphism allows an object of a derived class to be treated as an instance of its parent type while invoking the overridden child implementation at runtime.'
                }
            ]
        }
    ],
    mcqQuestions: [
        // Python Loop MCQs
        {
            id: 'mcq-py-loop-1',
            topic_id: 'top-py-loops',
            difficulty: 'easy',
            question: 'What is the exact output of list(range(1, 5)) in Python?',
            options: ['[1, 2, 3, 4, 5]', '[1, 2, 3, 4]', '[0, 1, 2, 3, 4]', '[2, 3, 4, 5]'],
            correct_index: 1,
            explanation: 'range(start, stop) generates integers from start up to but NOT including stop. Thus range(1, 5) yields 1, 2, 3, 4.'
        },
        {
            id: 'mcq-py-loop-2',
            topic_id: 'top-py-loops',
            difficulty: 'medium',
            question: 'Under what condition will the else: block attached to a Python for loop execute?',
            options: [
                'Whenever the loop encounters a break statement',
                'Only if the loop terminates normally without hitting a break',
                'If an exception is raised inside the loop',
                'It executes on every single iteration'
            ],
            correct_index: 1,
            explanation: 'In Python, a loop else: clause runs only when the loop completes its iteration naturally without being interrupted by a break statement.'
        },
        {
            id: 'mcq-py-loop-3',
            topic_id: 'top-py-loops',
            difficulty: 'hard',
            question: 'What happens if you mutate a list while iterating over it using a standard for loop (e.g. nums.remove(x))?',
            options: [
                'Python raises a ConcurrentModificationError immediately',
                'Elements will be silently skipped or processed out of order due to index shifting',
                'Python creates an immutable copy automatically behind the scenes',
                'The loop restarts from the beginning'
            ],
            correct_index: 1,
            explanation: 'Mutating a list in-place shifts the internal index pointer, causing the loop to skip consecutive items without raising an error.'
        },
        {
            id: 'mcq-py-loop-4',
            topic_id: 'top-py-loops',
            difficulty: 'easy',
            question: 'What keyword is used to skip the rest of the current loop iteration and move to the next?',
            options: ['pass', 'continue', 'break', 'skip'],
            correct_index: 1,
            explanation: 'continue skips the rest of the current loop cycle and advances to the next iteration.'
        },
        {
            id: 'mcq-py-loop-5',
            topic_id: 'top-py-loops',
            difficulty: 'medium',
            question: 'How many times will a while loop with condition while False: execute?',
            options: ['0 times', '1 time', 'Infinite times', 'Raises SyntaxError'],
            correct_index: 0,
            explanation: 'Since the boolean condition evaluates to False at the outset, the body is never entered (0 times).'
        },
        // Python Functions MCQs
        {
            id: 'mcq-py-func-1',
            topic_id: 'top-py-functions',
            difficulty: 'easy',
            question: 'What is the default return value of a Python function that does not include an explicit return statement?',
            options: ['0', 'None', 'False', '"" (empty string)'],
            correct_index: 1,
            explanation: 'In Python, functions implicitly return None if no return statement is reached.'
        },
        {
            id: 'mcq-py-func-2',
            topic_id: 'top-py-functions',
            difficulty: 'medium',
            question: 'What occurs when a mutable object like a list is used as a default argument (def add(item, lst=[]))?',
            options: [
                'A fresh new list is instantiated each time the function is called',
                'The same list instance is reused across multiple function calls',
                'Python raises a MutableDefaultWarning at compile time',
                'The function arguments become read-only'
            ],
            correct_index: 1,
            explanation: 'Default arguments are evaluated once at function definition time, meaning mutable defaults persist mutations across subsequent calls.'
        },
        {
            id: 'mcq-py-func-3',
            topic_id: 'top-py-functions',
            difficulty: 'hard',
            question: 'In Python lexical scoping, what is the correct resolution order defined by the LEGB rule?',
            options: [
                'Local, Enclosing, Global, Built-in',
                'Local, Explicit, General, Base',
                'Lexical, Environment, Global, Binary',
                'Loop, Enclosing, Global, Built-in'
            ],
            correct_index: 0,
            explanation: 'Python checks Local scope first, then Enclosing closures, Global module variables, and finally Built-ins.'
        },
        // Python Recursion MCQs
        {
            id: 'mcq-py-rec-1',
            topic_id: 'top-py-recursion',
            difficulty: 'easy',
            question: 'What is the primary role of a base case in a recursive function?',
            options: [
                'To speed up CPU clock speed',
                'To terminate the recursion and prevent an infinite call loop',
                'To initialize global variables',
                'To convert the function to an async generator'
            ],
            correct_index: 1,
            explanation: 'Without a base case, a recursive function calls itself indefinitely until it exceeds the call stack memory limit.'
        },
        {
            id: 'mcq-py-rec-2',
            topic_id: 'top-py-recursion',
            difficulty: 'medium',
            question: 'What exception does Python raise when a recursive function exceeds its maximum recursion depth limit?',
            options: [
                'StackMemoryError',
                'OutOfMemoryError',
                'RecursionError',
                'InfiniteLoopException'
            ],
            correct_index: 2,
            explanation: 'Python raises `RecursionError: maximum recursion depth exceeded` when the call stack reaches the recursion limit.'
        },
        {
            id: 'mcq-py-rec-3',
            topic_id: 'top-py-recursion',
            difficulty: 'hard',
            question: 'Does standard CPython support Tail Call Optimization (TCO) for recursive functions?',
            options: [
                'Yes, if compiled with the -O flag',
                'No, CPython does not optimize tail calls; every recursive call allocates a stack frame',
                'Yes, for all functions with a single return statement',
                'Only for generator functions'
            ],
            correct_index: 1,
            explanation: 'CPython intentionally omits Tail Call Optimization to preserve complete stack traces for debugging and inspection.'
        },
        // Unit 1 Fundamentals MCQs
        {
            id: 'mcq-py-fund-1',
            topic_id: 'top-py-fundamentals',
            difficulty: 'easy',
            question: 'Out of the 33 reserved keywords in Python, how many begin with an uppercase letter?',
            options: [
                'None of them (all 33 are strictly lowercase)',
                'Exactly 3: True, False, and None',
                '5 keywords: True, False, None, Class, and Def',
                'All 33 keywords start with uppercase letters'
            ],
            correct_index: 1,
            explanation: 'In Python, only True, False, and None begin with capital letters. All other 30 keywords are entirely lowercase.'
        },
        {
            id: 'mcq-py-fund-2',
            topic_id: 'top-py-fundamentals',
            difficulty: 'medium',
            question: 'What happens in Python when you evaluate `a = 10; b = 10; a is b`?',
            options: [
                'Returns False because two separate variables always get distinct memory addresses',
                'Returns True because Python interns small integers (-5 to 256) to point to the exact same object',
                'Raises a SyntaxError because `is` cannot be applied to integers',
                'Returns 0'
            ],
            correct_index: 1,
            explanation: 'Python uses object interning for small integers (-5 to 256). Both references point to the identical memory address, so `a is b` returns True.'
        },
        {
            id: 'mcq-py-fund-3',
            topic_id: 'top-py-fundamentals',
            difficulty: 'hard',
            question: 'What is the output of evaluating `a = (1, 2, [3, 4]); a[2].append(5); print(a)` in Python?',
            options: [
                'Raises TypeError because tuples are immutable',
                '(1, 2, [3, 4, 5])',
                '(1, 2, [3, 4])',
                'Raises AttributeError: tuple object has no append'
            ],
            correct_index: 1,
            explanation: 'While the tuple itself cannot be rebound to point to different objects, mutable elements contained within the tuple (like lists) CAN be mutated in-place.'
        },
        // Unit 2 Operators & I/O MCQs
        {
            id: 'mcq-py-op-1',
            topic_id: 'top-py-operators-io',
            difficulty: 'easy',
            question: 'What is the value and type of `10.0 // 3` in Python 3?',
            options: ['3 (int)', '3.0 (float)', '3.3333333333333335 (float)', 'Raises TypeError'],
            correct_index: 1,
            explanation: 'Floor division `//` returns the floor value. If at least one operand is a float, the result is always a float (`3.0`).'
        },
        {
            id: 'mcq-py-op-2',
            topic_id: 'top-py-operators-io',
            difficulty: 'medium',
            question: 'What is the output of print("karthi" * False)?',
            options: ['"karthi0"', 'An empty string (prints nothing)', 'Raises TypeError', 'None'],
            correct_index: 1,
            explanation: 'In Python, False has integer value 0. Multiplying a string by 0 repeats it 0 times, returning an empty string.'
        },
        {
            id: 'mcq-py-op-3',
            topic_id: 'top-py-operators-io',
            difficulty: 'hard',
            question: 'What does the bitwise complement `~10` evaluate to in Python (using 2\'s complement)?',
            options: ['-10', '-11', '11', '9'],
            correct_index: 1,
            explanation: 'In Python, the bitwise complement formula is `~x = -(x + 1)`. Thus `~10 = -(10 + 1) = -11`.'
        },
        // Unit 3 Strings MCQs
        {
            id: 'mcq-py-str-1',
            topic_id: 'top-py-strings',
            difficulty: 'easy',
            question: 'What does the slice expression `s[::-1]` evaluate to for any string `s`?',
            options: [
                'Returns the first character',
                'Reverses the entire string backwards',
                'Raises an IndexError: step cannot be negative',
                'Returns an empty string'
            ],
            correct_index: 1,
            explanation: 'A step of -1 in slicing tells Python to traverse the sequence in reverse direction from end to start, reversing the string.'
        },
        {
            id: 'mcq-py-str-2',
            topic_id: 'top-py-strings',
            difficulty: 'medium',
            question: 'What is the difference between `s.find("abc")` and `s.index("abc")` when "abc" is absent from `s`?',
            options: [
                '`find()` raises a ValueError, while `index()` returns -1',
                '`find()` returns -1, while `index()` raises a ValueError',
                'Both methods return None',
                'Both methods raise an IndexError'
            ],
            correct_index: 1,
            explanation: '`find()` returns -1 safely if the substring is not found, whereas `index()` raises a `ValueError`.'
        },
        {
            id: 'mcq-py-str-3',
            topic_id: 'top-py-strings',
            difficulty: 'hard',
            question: 'What is the value of `"karthikeya"[1:9:2]`?',
            options: ['"athi"', '"krhk"', '"atke"', '"rthk"'],
            correct_index: 0,
            explanation: 'Starting at index 1 ("a"), stepping by 2 picks indices 1 ("a"), 3 ("t"), 5 ("h"), 7 ("i") up to index 9, producing "athi".'
        },
        // Unit 5 Tuples & Sets MCQs
        {
            id: 'mcq-py-ts-1',
            topic_id: 'top-py-tuples-sets',
            difficulty: 'easy',
            question: 'What is the type of `t = (10)` vs `t = (10,)` in Python?',
            options: [
                'Both are of type tuple',
                '`(10)` is an int, while `(10,)` is a tuple',
                '`(10)` is a tuple, while `(10,)` causes a SyntaxError',
                'Both are of type list'
            ],
            correct_index: 1,
            explanation: 'Parentheses around a single value without a comma are treated as standard mathematical grouping. Single-item tuples must end with a comma: `(10,)`.'
        },
        {
            id: 'mcq-py-ts-2',
            topic_id: 'top-py-tuples-sets',
            difficulty: 'medium',
            question: 'What happens when calling `s.remove(50)` vs `s.discard(50)` on a set `s = {10, 20}` where 50 is NOT present?',
            options: [
                '`remove()` raises a KeyError, whereas `discard()` does nothing and raises no error',
                '`discard()` raises a KeyError, whereas `remove()` returns False',
                'Both methods raise ValueError',
                'Both methods automatically add 50 to the set'
            ],
            correct_index: 0,
            explanation: '`remove(x)` raises a `KeyError` if element x is missing from the set. `discard(x)` safely removes x if present, or silently does nothing if absent.'
        },
        {
            id: 'mcq-py-ts-3',
            topic_id: 'top-py-tuples-sets',
            difficulty: 'hard',
            question: 'What does the symmetric difference operator `^` return for two sets `A = {1, 2, 3}` and `B = {3, 4, 5}`?',
            options: ['{3}', '{1, 2, 4, 5}', '{1, 2, 3, 4, 5}', '{}'],
            correct_index: 1,
            explanation: 'Symmetric difference (`A ^ B`) returns elements present in either A or B, but NOT in both (excluding the intersection {3}), which gives {1, 2, 4, 5}.'
        },
        // Unit 6 Regex MCQs
        {
            id: 'mcq-py-reg-1',
            topic_id: 'top-py-modules-regex',
            difficulty: 'easy',
            question: 'Which regex function verifies that the ENTIRE input string matches the specified pattern from beginning to end?',
            options: ['re.match()', 're.search()', 're.fullmatch()', 're.findall()'],
            correct_index: 2,
            explanation: '`re.fullmatch()` requires the entire target string to match the regex pattern. `re.match()` only checks if the pattern matches at the beginning.'
        },
        {
            id: 'mcq-py-reg-2',
            topic_id: 'top-py-modules-regex',
            difficulty: 'medium',
            question: 'Which regular expression pattern correctly validates a 10-digit Indian mobile number starting with 6, 7, 8, or 9?',
            options: [
                '[0-9]{10}',
                '[6-9]\\d{9}',
                '[6789][0-9]{10}',
                '\\d{10}'
            ],
            correct_index: 1,
            explanation: '`[6-9]` validates that the first digit is 6, 7, 8, or 9, followed by `\\d{9}` (exactly 9 more digits), making a total of 10 digits.'
        },
        {
            id: 'mcq-py-reg-3',
            topic_id: 'top-py-modules-regex',
            difficulty: 'hard',
            question: 'In the Python `re` module, what is the difference between `re.match()` and `re.search()`?',
            options: [
                '`match()` searches anywhere in the string, while `search()` matches only at the start',
                '`match()` checks for a match only at the beginning of the string, while `search()` scans through the entire string for the first match',
                'There is zero difference',
                '`match()` returns a list while `search()` returns a boolean'
            ],
            correct_index: 1,
            explanation: '`re.match()` only checks if the pattern matches at the beginning of the string. `re.search()` scans through the entire string to find the first location where the pattern matches.'
        },
        // Stage 2 Flow Control MCQs
        {
            id: 'mcq-py-fc-1',
            topic_id: 'top-py-flow-control',
            difficulty: 'easy',
            question: 'What is the purpose of the `pass` statement in Python?',
            options: [
                'Terminates program execution immediately',
                'Acts as a syntactic null placeholder (does nothing)',
                'Skips the current loop iteration',
                'Raises a PassException'
            ],
            correct_index: 1,
            explanation: '`pass` is a syntactic no-op null statement used when a statement is required syntactically but no code needs to execute.'
        },
        {
            id: 'mcq-py-fc-2',
            topic_id: 'top-py-flow-control',
            difficulty: 'medium',
            question: 'What is the key difference between `del x` and `x = None` in Python?',
            options: [
                '`del x` unbinds the variable name from namespace entirely, while `x = None` rebinds the variable to the None object',
                '`del x` sets x to 0, while `x = None` causes a SyntaxError',
                'Both statements perform the exact same operation',
                '`x = None` deletes the variable from memory while `del x` does not'
            ],
            correct_index: 0,
            explanation: '`del x` deletes the variable name itself from the namespace (accessing x afterwards raises NameError). `x = None` retains the name and points it to the singleton None object.'
        },
        {
            id: 'mcq-py-fc-3',
            topic_id: 'top-py-flow-control',
            difficulty: 'hard',
            question: 'Which of the following control structures does NOT exist in standard Python 3.8 and earlier?',
            options: [
                'while-else construct',
                'switch-case and do-while statements',
                'nested if-elif-else',
                'for-in iteration'
            ],
            correct_index: 1,
            explanation: 'Standard Python does not have `switch-case` (until match-case in 3.10) or `do-while` loop constructs.'
        },
        // Stage 4 Lists MCQs
        {
            id: 'mcq-py-list-1',
            topic_id: 'top-py-lists',
            difficulty: 'easy',
            question: 'What is the output of `a = [1, 2]; a.append([3, 4]); print(len(a))`?',
            options: ['4', '3', '2', 'Raises TypeError'],
            correct_index: 1,
            explanation: '`append([3, 4])` appends the nested list as a single 3rd element: `[1, 2, [3, 4]]`, so `len(a)` is 3. To unpack, `extend()` is used.'
        },
        {
            id: 'mcq-py-list-2',
            topic_id: 'top-py-lists',
            difficulty: 'medium',
            question: 'If `l1 = [10, 20]` and `l2 = l1`, what happens when you execute `l1[0] = 99`?',
            options: [
                'Only l1[0] becomes 99 because assignments copy by value',
                'Both l1[0] and l2[0] become 99 because l2 is an alias referencing the same memory object',
                'Python raises an UnboundAssignmentError',
                'l2 is automatically deleted'
            ],
            correct_index: 1,
            explanation: 'Assignment `l2 = l1` creates an alias (both reference identical memory address). Mutating `l1` in-place alters `l2` as well.'
        },
        {
            id: 'mcq-py-list-3',
            topic_id: 'top-py-lists',
            difficulty: 'hard',
            question: 'Which syntax creates a true independent clone (shallow copy) of a list `l1`?',
            options: [
                '`l2 = l1[:]` or `l2 = l1.copy()`',
                '`l2 = l1`',
                '`l2 = list.clone(l1)`',
                '`l2 = l1.duplicate()`'
            ],
            correct_index: 0,
            explanation: 'Both slice notation `l1[:]` and the `.copy()` method create a shallow clone with independent memory from the original list.'
        },
        // Stage 5 Dictionaries MCQs
        {
            id: 'mcq-py-dict-1',
            topic_id: 'top-py-dictionaries',
            difficulty: 'easy',
            question: 'Why does `d = {}; d[[1, 2]] = "data"` raise a TypeError?',
            options: [
                'Dictionaries do not allow bracket notation',
                'Lists are mutable and unhashable, making them invalid as dictionary keys',
                'Dictionaries can only hold string keys',
                'Square brackets are reserved for tuples'
            ],
            correct_index: 1,
            explanation: 'Dictionary keys must be hashable and immutable (integers, strings, floats, tuples). Lists are mutable, so Python raises `TypeError: unhashable type: \'list\'`.'
        },
        {
            id: 'mcq-py-dict-2',
            topic_id: 'top-py-dictionaries',
            difficulty: 'medium',
            question: 'What is the safe idiom to look up a key `k` in dictionary `d` with a fallback 0 if missing?',
            options: ['d[k] or 0', 'd.get(k, 0)', 'd.find(k, 0)', 'd.lookup(k, 0)'],
            correct_index: 1,
            explanation: '`d.get(key, default)` safely returns default if the key is missing instead of raising a KeyError.'
        },
        {
            id: 'mcq-py-dict-3',
            topic_id: 'top-py-dictionaries',
            difficulty: 'hard',
            question: 'What does `d.setdefault("count", 0)` do if "count" does NOT exist in `d`?',
            options: [
                'Raises a KeyError',
                'Returns None without modifying d',
                'Inserts "count": 0 into d and returns 0',
                'Returns True'
            ],
            correct_index: 2,
            explanation: '`setdefault(key, default)` checks for key existence; if absent, it inserts `key: default` and returns `default`.'
        },
        // C Pointer MCQs
        {
            id: 'mcq-c-ptr-1',
            topic_id: 'top-c-pointers',
            difficulty: 'easy',
            question: 'Which operator in C is used to obtain the memory address of a variable?',
            options: ['*', '&', '->', '%'],
            correct_index: 1,
            explanation: 'The address-of operator & returns the hexadecimal memory address of its operand.'
        },
        {
            id: 'mcq-c-ptr-2',
            topic_id: 'top-c-pointers',
            difficulty: 'medium',
            question: 'If int *p points to an integer array, what does *(p + 2) evaluate to?',
            options: [
                'The address of the 2nd element',
                'The value stored at array index 2 (the 3rd element)',
                'The value of *p plus 2 bytes',
                'Causes a compilation error'
            ],
            correct_index: 1,
            explanation: '*(p + 2) is equivalent to p[2]. Pointer arithmetic scales by sizeof(int), accessing the element at index 2.'
        },
        {
            id: 'mcq-c-ptr-3',
            topic_id: 'top-c-pointers',
            difficulty: 'hard',
            question: 'What is the danger of a dangling pointer in C?',
            options: [
                'It causes an immediate compile-time syntax error',
                'It points to memory that has already been deallocated, risking corruption or crashes',
                'It consumes infinite RAM on the stack',
                'It prevents the OS from launching new threads'
            ],
            correct_index: 1,
            explanation: 'A dangling pointer still references memory after free() has released it. Accessing it triggers undefined behavior.'
        },
        // C++ OOP MCQs
        {
            id: 'mcq-cpp-oop-1',
            topic_id: 'top-cpp-oop',
            difficulty: 'easy',
            question: 'By default, what is the access level of members in a C++ class if no specifier is given?',
            options: ['public', 'private', 'protected', 'internal'],
            correct_index: 1,
            explanation: 'In C++ classes, members default to private. (In structs, they default to public).'
        },
        {
            id: 'mcq-cpp-oop-2',
            topic_id: 'top-cpp-oop',
            difficulty: 'medium',
            question: 'Why should class members be initialized using member initializer lists rather than assignment in the constructor body?',
            options: [
                'It avoids calling default constructors before re-assignment, improving performance',
                'Member initializer lists are required by the OS kernel',
                'It automatically makes members const',
                'There is zero difference in performance or semantics'
            ],
            correct_index: 0,
            explanation: 'Initialization lists initialize members directly, avoiding redundant default construction followed by assignment.'
        },
        // Java OOP MCQs
        {
            id: 'mcq-java-oop-1',
            topic_id: 'top-java-oop',
            difficulty: 'easy',
            question: 'Which keyword in Java is used by a class to inherit from a superclass?',
            options: ['implements', 'extends', 'inherits', 'super'],
            correct_index: 1,
            explanation: 'The extends keyword is used to establish class inheritance in Java.'
        },
        {
            id: 'mcq-java-oop-2',
            topic_id: 'top-java-oop',
            difficulty: 'medium',
            question: 'Can a class in Java inherit directly from multiple concrete classes using extends?',
            options: [
                'Yes, separated by commas (class C extends A, B)',
                'No, Java supports single class inheritance to avoid the diamond problem',
                'Yes, if both classes are marked abstract',
                'Only in Java 21+'
            ],
            correct_index: 1,
            explanation: 'Java supports single class inheritance for simplicity; multiple inheritance is achieved through interfaces.'
        }
    ],
    codingQuestions: [
        // Python Coding Challenge 0 (Stage 1: Integer Base Conversion & Identity Inspector)
        {
            id: 'code-py-base-conversion',
            topic_id: 'top-py-fundamentals',
            title: 'Integer Base Conversion & Identity Inspector',
            difficulty: 'easy',
            problem_statement: 'Read a single non-negative decimal integer N from standard input. Output its binary (using bin()), octal (using oct()), and hexadecimal (using hex()) representations on a single line separated by spaces.',
            input_format: 'A single non-negative integer N.',
            output_format: 'Three space-separated strings: binary, octal, and hexadecimal representations.',
            constraints: '0 <= N <= 10^9',
            sample_input: '15',
            sample_output: '0b1111 0o17 0xf',
            starter_code: {
                python: 'import sys\n\ndef solve():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        return\n    n = int(raw)\n    # Output binary, octal, and hex\n    print(f"{bin(n)} {oct(n)} {hex(n)}")\n\nif __name__ == "__main__":\n    solve()'
            },
            test_cases: [
                { input: '15', expected_output: '0b1111 0o17 0xf', is_hidden: false },
                { input: '0', expected_output: '0b0 0o0 0x0', is_hidden: false },
                { input: '255', expected_output: '0b11111111 0o377 0xff', is_hidden: true },
                { input: '100', expected_output: '0b1100100 0o144 0x64', is_hidden: true }
            ]
        },
        // Python Coding Challenge 1 (Loops)
        {
            id: 'code-py-sum-evens',
            topic_id: 'top-py-loops',
            title: 'Sum of Even Integers',
            difficulty: 'easy',
            problem_statement: 'Read space-separated integers from standard input and compute the total sum of only the even integers in the sequence.',
            input_format: 'A single line containing space-separated integers.',
            output_format: 'A single integer representing the sum of even numbers.',
            constraints: '1 <= numbers count <= 1000, -10^5 <= num <= 10^5',
            sample_input: '1 2 3 4 5 6',
            sample_output: '12',
            starter_code: {
                python: 'import sys\n\ndef solve():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        print(0)\n        return\n    numbers = [int(x) for x in input_data.split()]\n    # TODO: Calculate sum of even integers\n    even_sum = 0\n    \n    print(even_sum)\n\nif __name__ == "__main__":\n    solve()'
            },
            test_cases: [
                { input: '1 2 3 4 5 6', expected_output: '12', is_hidden: false },
                { input: '2 4 6 8 10', expected_output: '30', is_hidden: false },
                { input: '1 3 5 7 9', expected_output: '0', is_hidden: true },
                { input: '-2 -4 5 7', expected_output: '-6', is_hidden: true }
            ]
        },
        // Python Coding Challenge 2 (Functions)
        {
            id: 'code-py-palindrome',
            topic_id: 'top-py-functions',
            title: 'Palindrome Validator',
            difficulty: 'medium',
            problem_statement: 'Read a string from stdin and determine if it is a palindrome (reads the same forward and backwards), ignoring case and non-alphanumeric characters. Print "TRUE" or "FALSE".',
            input_format: 'A single line containing an input string.',
            output_format: '"TRUE" or "FALSE".',
            constraints: '1 <= string length <= 1000',
            sample_input: 'A man, a plan, a canal: Panama',
            sample_output: 'TRUE',
            starter_code: {
                python: 'import sys\n\ndef is_palindrome(s: str) -> bool:\n    # TODO: Implement palindrome validation\n    return False\n\nif __name__ == "__main__":\n    text = sys.stdin.read().strip()\n    print("TRUE" if is_palindrome(text) else "FALSE")'
            },
            test_cases: [
                { input: 'A man, a plan, a canal: Panama', expected_output: 'TRUE', is_hidden: false },
                { input: 'race a car', expected_output: 'FALSE', is_hidden: false },
                { input: 'Was it a car or a cat I saw?', expected_output: 'TRUE', is_hidden: true },
                { input: 'hello', expected_output: 'FALSE', is_hidden: true }
            ]
        },
        // C Coding Challenge (Pointers)
        {
            id: 'code-c-reverse-array',
            topic_id: 'top-c-pointers',
            title: 'In-Place Pointer Swap',
            difficulty: 'medium',
            problem_statement: 'Given two integers A and B separated by space, swap their values in memory using pointers and print them swapped.',
            input_format: 'Two integers A and B separated by space.',
            output_format: 'The two integers swapped, separated by a space.',
            constraints: '-10^6 <= A, B <= 10^6',
            sample_input: '15 42',
            sample_output: '42 15',
            starter_code: {
                c: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    // TODO: swap values using pointers\n}\n\nint main() {\n    int a, b;\n    if (scanf("%d %d", &a, &b) == 2) {\n        swap(&a, &b);\n        printf("%d %d\\n", a, b);\n    }\n    return 0;\n}'
            },
            test_cases: [
                { input: '15 42', expected_output: '42 15', is_hidden: false },
                { input: '100 -50', expected_output: '-50 100', is_hidden: false },
                { input: '0 0', expected_output: '0 0', is_hidden: true },
                { input: '-999 999', expected_output: '999 -999', is_hidden: true }
            ]
        },
        // Python Coding Challenge 3 (Recursion - Section 117)
        {
            id: 'code-py-factorial',
            topic_id: 'top-py-recursion',
            title: 'Recursive Factorial Engine',
            difficulty: 'easy',
            problem_statement: 'Read an integer N from standard input (0 <= N <= 12) and print its factorial (N!) calculated using a recursive function.',
            input_format: 'A single non-negative integer N.',
            output_format: 'The factorial of N.',
            constraints: '0 <= N <= 12',
            sample_input: '5',
            sample_output: '120',
            starter_code: {
                python: 'import sys\n\ndef factorial(n: int) -> int:\n    # TODO: Implement recursive factorial with base case\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nif __name__ == "__main__":\n    raw = sys.stdin.read().strip()\n    if raw:\n        n = int(raw)\n        print(factorial(n))'
            },
            test_cases: [
                { input: '5', expected_output: '120', is_hidden: false },
                { input: '0', expected_output: '1', is_hidden: false },
                { input: '3', expected_output: '6', is_hidden: false },
                { input: '7', expected_output: '5040', is_hidden: true }
            ]
        },
        // Python Coding Challenge 4 (Nested Ternary Operator)
        {
            id: 'code-py-min-ternary',
            topic_id: 'top-py-operators-io',
            title: 'Find Minimum of 3 Numbers with Ternary Operator',
            difficulty: 'easy',
            problem_statement: 'Read 3 space-separated integers A, B, and C from standard input and print the minimum value using a nested ternary conditional operator.',
            input_format: 'A single line containing three space-separated integers.',
            output_format: 'The minimum integer.',
            constraints: '-10^6 <= A, B, C <= 10^6',
            sample_input: '10 20 5',
            sample_output: '5',
            starter_code: {
                python: 'import sys\n\ndef solve():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        return\n    a, b, c = [int(x) for x in raw.split()]\n    # TODO: Calculate minimum using nested ternary operator\n    min_val = a if a < b and a < c else b if b < c else c\n    print(min_val)\n\nif __name__ == "__main__":\n    solve()'
            },
            test_cases: [
                { input: '10 20 5', expected_output: '5', is_hidden: false },
                { input: '30 10 20', expected_output: '10', is_hidden: false },
                { input: '-10 -20 -30', expected_output: '-30', is_hidden: true },
                { input: '7 7 7', expected_output: '7', is_hidden: true }
            ]
        },
        // Python Coding Challenge 5 (Alternate String Merge)
        {
            id: 'code-py-str-merge',
            topic_id: 'top-py-strings',
            title: 'Alternate String Character Merger',
            difficulty: 'medium',
            problem_statement: 'Read two space-separated strings s1 and s2 from standard input. Merge them by taking characters alternately. If one string is longer than the other, append the remaining characters to the end.',
            input_format: 'Two space-separated strings on a single line.',
            output_format: 'The merged string.',
            constraints: '1 <= len(s1), len(s2) <= 500',
            sample_input: 'karthi sahasra',
            sample_output: 'ksaarhtahsira',
            starter_code: {
                python: 'import sys\n\ndef merge_alternate(s1: str, s2: str) -> str:\n    # TODO: Merge characters alternatively and append remainder\n    output = []\n    i, j = 0, 0\n    while i < len(s1) or j < len(s2):\n        if i < len(s1):\n            output.append(s1[i])\n            i += 1\n        if j < len(s2):\n            output.append(s2[j])\n            j += 1\n    return "".join(output)\n\nif __name__ == "__main__":\n    parts = sys.stdin.read().strip().split()\n    if len(parts) >= 2:\n        print(merge_alternate(parts[0], parts[1]))'
            },
            test_cases: [
                { input: 'karthi sahasra', expected_output: 'ksaarhtahsira', is_hidden: false },
                { input: 'abc 12345', expected_output: 'a1b2c345', is_hidden: false },
                { input: 'hello world', expected_output: 'hweolrllod', is_hidden: true },
                { input: 'a z', expected_output: 'az', is_hidden: true }
            ]
        },
        // Python Coding Challenge 6 (Order-Preserving Deduplication)
        {
            id: 'code-py-dedup-list',
            topic_id: 'top-py-tuples-sets',
            title: 'Order-Preserving List Deduplication',
            difficulty: 'easy',
            problem_statement: 'Read space-separated integers from stdin and print the sequence with all duplicates removed while strictly preserving the original first-occurrence order.',
            input_format: 'A single line of space-separated integers.',
            output_format: 'Space-separated integers with duplicates eliminated.',
            constraints: '1 <= count <= 1000',
            sample_input: '10 20 30 10 20 40',
            sample_output: '10 20 30 40',
            starter_code: {
                python: 'import sys\n\ndef solve():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        return\n    nums = [int(x) for x in raw.split()]\n    # TODO: Deduplicate while preserving first occurrence order\n    seen = set()\n    result = []\n    for x in nums:\n        if x not in seen:\n            seen.add(x)\n            result.append(x)\n    print(" ".join(str(x) for x in result))\n\nif __name__ == "__main__":\n    solve()'
            },
            test_cases: [
                { input: '10 20 30 10 20 40', expected_output: '10 20 30 40', is_hidden: false },
                { input: '5 5 5 5', expected_output: '5', is_hidden: false },
                { input: '1 2 3 4', expected_output: '1 2 3 4', is_hidden: true },
                { input: '9 8 7 8 9 6', expected_output: '9 8 7 6', is_hidden: true }
            ]
        },
        // Python Coding Challenge 7 (Regex Mobile Validator)
        {
            id: 'code-py-mobile-regex',
            topic_id: 'top-py-modules-regex',
            title: 'Mobile Number Regular Expression Validator',
            difficulty: 'medium',
            problem_statement: 'Read a mobile number string from standard input. Print "VALID" if it contains exactly 10 digits and starts with 6, 7, 8, or 9 (optional leading 0 or +91 prefix is also accepted). Otherwise print "INVALID".',
            input_format: 'A single line containing the candidate phone number string.',
            output_format: '"VALID" or "INVALID".',
            constraints: '1 <= string length <= 20',
            sample_input: '9885768283',
            sample_output: 'VALID',
            starter_code: {
                python: 'import sys\nimport re\n\ndef validate_phone(number: str) -> bool:\n    # TODO: Validate with re.fullmatch\n    pattern = r"(\\+91|0)?[6-9]\\d{9}"\n    return bool(re.fullmatch(pattern, number))\n\nif __name__ == "__main__":\n    raw = sys.stdin.read().strip()\n    print("VALID" if validate_phone(raw) else "INVALID")'
            },
            test_cases: [
                { input: '9885768283', expected_output: 'VALID', is_hidden: false },
                { input: '+917485920584', expected_output: 'VALID', is_hidden: false },
                { input: '07435637732', expected_output: 'VALID', is_hidden: true },
                { input: '5543210987', expected_output: 'INVALID', is_hidden: true },
                { input: '9885768283abc', expected_output: 'INVALID', is_hidden: true }
            ]
        },
        // Python Coding Challenge 8 (Stage 2: Right-Angled Number Triangle Pattern)
        {
            id: 'code-py-pattern-triangle',
            topic_id: 'top-py-flow-control',
            title: 'Right-Angled Number Triangle Generator',
            difficulty: 'easy',
            problem_statement: 'Read an integer N (1 <= N <= 9) from stdin and print a right-angled number triangle with N rows, where row i contains the number i repeated i times separated by a space.',
            input_format: 'A single integer N.',
            output_format: 'N lines representing the number triangle.',
            constraints: '1 <= N <= 9',
            sample_input: '4',
            sample_output: '1\n2 2\n3 3 3\n4 4 4 4',
            starter_code: {
                python: 'import sys\n\ndef print_pattern(n: int):\n    # TODO: Generate right-angled number triangle\n    for i in range(1, n + 1):\n        print(" ".join([str(i)] * i))\n\nif __name__ == "__main__":\n    raw = sys.stdin.read().strip()\n    if raw:\n        print_pattern(int(raw))'
            },
            test_cases: [
                { input: '4', expected_output: '1\n2 2\n3 3 3\n4 4 4 4', is_hidden: false },
                { input: '1', expected_output: '1', is_hidden: false },
                { input: '3', expected_output: '1\n2 2\n3 3 3', is_hidden: true },
                { input: '5', expected_output: '1\n2 2\n3 3 3\n4 4 4 4\n5 5 5 5 5', is_hidden: true }
            ]
        },
        // Python Coding Challenge 9 (Stage 4: 2D Matrix Transpose Comprehension)
        {
            id: 'code-py-matrix-transpose',
            topic_id: 'top-py-lists',
            title: 'Matrix Transpose via List Comprehension',
            difficulty: 'medium',
            problem_statement: 'Read input where the first line gives R (rows) and C (columns), followed by R lines of C space-separated integers. Print the transposed matrix (C rows with R integers each) using list comprehension.',
            input_format: 'Line 1: R and C. Next R lines: C space-separated integers.',
            output_format: 'C lines of R space-separated integers representing the transposed matrix.',
            constraints: '1 <= R, C <= 50',
            sample_input: '2 3\n1 2 3\n4 5 6',
            sample_output: '1 4\n2 5\n3 6',
            starter_code: {
                python: 'import sys\n\ndef solve():\n    lines = sys.stdin.read().strip().split("\\n")\n    if not lines or not lines[0]:\n        return\n    r, c = [int(x) for x in lines[0].split()]\n    matrix = []\n    for i in range(1, r + 1):\n        matrix.append([int(x) for x in lines[i].split()])\n    # TODO: Transpose using list comprehension\n    transposed = [[matrix[i][j] for i in range(r)] for j in range(c)]\n    for row in transposed:\n        print(" ".join(str(x) for x in row))\n\nif __name__ == "__main__":\n    solve()'
            },
            test_cases: [
                { input: '2 3\n1 2 3\n4 5 6', expected_output: '1 4\n2 5\n3 6', is_hidden: false },
                { input: '2 2\n10 20\n30 40', expected_output: '10 30\n20 40', is_hidden: false },
                { input: '1 3\n7 8 9', expected_output: '7\n8\n9', is_hidden: true },
                { input: '3 1\n1\n2\n3', expected_output: '1 2 3', is_hidden: true }
            ]
        },
        // Python Coding Challenge 10 (Stage 5: Word Frequency Counter with Dictionary)
        {
            id: 'code-py-word-frequency',
            topic_id: 'top-py-dictionaries',
            title: 'Word Frequency Counter using Dictionary',
            difficulty: 'medium',
            problem_statement: 'Read a line of words from standard input. Count the frequency of each unique word (case-insensitive) and print each word and its count in alphabetical order formatted as "word: count".',
            input_format: 'A single line containing space-separated words.',
            output_format: 'Alphabetically sorted lines in format "word: count".',
            constraints: '1 <= word count <= 500',
            sample_input: 'apple banana apple Orange banana apple',
            sample_output: 'apple: 3\nbanana: 2\norange: 1',
            starter_code: {
                python: 'import sys\n\ndef solve():\n    raw = sys.stdin.read().strip()\n    if not raw:\n        return\n    words = raw.lower().split()\n    # TODO: Build frequency dictionary and print sorted\n    freq = {}\n    for w in words:\n        freq[w] = freq.get(w, 0) + 1\n    for w in sorted(freq.keys()):\n        print(f"{w}: {freq[w]}")\n\nif __name__ == "__main__":\n    solve()'
            },
            test_cases: [
                { input: 'apple banana apple Orange banana apple', expected_output: 'apple: 3\nbanana: 2\norange: 1', is_hidden: false },
                { input: 'to be or not to be', expected_output: 'be: 2\nnot: 1\nor: 1\nto: 2', is_hidden: false },
                { input: 'python Python PYTHON', expected_output: 'python: 3', is_hidden: true },
                { input: 'cat dog bird', expected_output: 'bird: 1\ncat: 1\ndog: 1', is_hidden: true }
            ]
        }
    ]
};
