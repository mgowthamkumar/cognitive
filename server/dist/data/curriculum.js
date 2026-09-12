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
        // Python Modules
        { id: 'mod-py-1', course_id: 'py-beg', title: 'Basics & Control Flow', description: 'Conditionals and loop constructs', order_index: 1 },
        { id: 'mod-py-2', course_id: 'py-beg', title: 'Modular Code with Functions', description: 'Function declarations, scope, and recursion', order_index: 2 },
        { id: 'mod-py-3', course_id: 'py-int', title: 'Compound Data Structures', description: 'Lists, dictionaries, and comprehension patterns', order_index: 3 },
        { id: 'mod-py-4', course_id: 'py-adv', title: 'OOP & Metaprogramming', description: 'Classes, decorators, and generators', order_index: 4 },
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
        // --- PYTHON TOPICS ---
        {
            id: 'top-py-loops',
            module_id: 'mod-py-1',
            title: 'Loops and Iteration Constructs',
            order_index: 1,
            learning_objective: 'Master for and while loops, iteration over ranges and sequences, and loop termination controls (break, continue, else).',
            content_standard: 'In Python, loops provide repetition without code duplication. `for item in sequence:` iterates over iterables, while `while condition:` continues until the boolean condition evaluates to False.',
            content_low: '### ⚡ Fast-Track Summary\n- `for i in range(n)`: O(1) space lazy sequence generation.\n- List comprehensions preferred over imperative loops when mapping/filtering.\n- `break` exits immediately; `continue` skips to next step; `else:` triggers only on non-break completion.',
            content_medium: '### 📘 Standard Guide\nPython supports two primary loops:\n1. **For Loop**: Best when the count or sequence is known in advance.\n2. **While Loop**: Best when looping depends on dynamic runtime conditions.\nRemember: `range(1, 5)` yields values `1, 2, 3, 4`.',
            content_high: '### 🌱 Step-by-Step Breakdown\nLet\'s take this slowly! A loop is like an automated counting machine.\n\n1. **Start small**: `for i in range(3): print(i)` will print 0, then 1, then 2.\n2. **Analogy**: Imagine checking off items on a grocery checklist one by one.\n3. **Notice**: Stop value is never included. `range(0, 5)` stops before 5!',
            syntax: 'for item in iterable:\n    # execute block\n\nwhile condition:\n    # execute block\n    # ensure condition progresses toward False!',
            examples: '# Example 1: Summing numbers with for loop\ntotal = sum(i for i in range(1, 6))\nprint("Sum 1..5:", total)\n\n# Example 2: While loop with countdown\ncount = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("Blast off!")',
            common_mistakes: '1. Infinite while loops due to missing update statements.\n2. Off-by-one errors with range(start, stop).\n3. Modifying a collection while actively looping over it.',
            practice_prompt: 'Write a loop that calculates the sum of all even numbers from 1 to 20 inclusive.',
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
                    title: '3. Controlling Flow: break and continue',
                    order_index: 3,
                    content: '`break` terminates the enclosing loop immediately. `continue` skips the remainder of the current iteration and jumps to the next.',
                    code_snippet: 'for num in range(10):\n    if num == 5:\n        break # Stop here\n    if num % 2 == 0:\n        continue # Skip evens\n    print("Odd:", num)'
                },
                {
                    id: 'sec-py-loop-4',
                    title: '4. Common Mistakes & Best Practices',
                    order_index: 4,
                    content: '1. Off-by-one errors with `range(1, 10)` which stops at 9.\n2. In-place mutation of a list while iterating over it.\n3. Forgetting accumulator step in while loops.',
                    pitfalls: 'Never do `for x in my_list: my_list.remove(x)`. It causes items to be skipped because the internal index shifts.'
                }
            ]
        },
        {
            id: 'top-py-functions',
            module_id: 'mod-py-2',
            title: 'Functions, Parameters & Scope',
            order_index: 2,
            learning_objective: 'Define modular functions, understand positional vs keyword parameters, default arguments, and variable scope.',
            content_standard: 'Functions encapsulate reusable logic using `def func_name(args):`. Python functions are first-class citizens and can be passed as arguments or returned from other functions.',
            content_low: '### ⚡ Fast-Track Summary\n- First-class citizen functions with `*args`, `**kwargs` unpacking.\n- Closure and lexical scoping (LEGB rule: Local, Enclosing, Global, Built-in).\n- Avoid mutable default arguments (`def f(x=[])`).',
            content_medium: '### 📘 Standard Guide\nDefine functions using `def`. Return values using `return`. Scope determines where a variable is accessible: local variables inside a function cannot be seen outside.',
            content_high: '### 🌱 Step-by-Step Breakdown\nA function is like a kitchen recipe or a mini-calculator:\n1. You give it ingredients (parameters).\n2. It follows steps inside its body.\n3. It serves you the final dish (return value).',
            syntax: 'def function_name(param1, param2=default_val):\n    """Docstring explanation."""\n    result = param1 + param2\n    return result',
            examples: 'def greet(name, title="Learner"):\n    return f"Welcome, {title} {name}!"\n\nprint(greet("Ada", "Dr."))\nprint(greet("Alan"))',
            common_mistakes: '1. Forgetting the `return` keyword (functions default to returning `None`).\n2. Defining mutable defaults like `def add(val, lst=[]):` which persist across calls.',
            practice_prompt: 'Create a function `is_palindrome(text)` that returns True if a given string reads the same forwards and backwards.',
            prerequisite_topic_id: 'top-py-loops',
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
                    title: '2. Parameters & Default Arguments',
                    order_index: 2,
                    content: 'Parameters accept input values. You can provide default values for optional arguments.',
                    code_snippet: 'def power(base, exponent=2):\n    return base ** exponent\n\nprint(power(4))    # 16 (default exponent 2)\nprint(power(2, 3)) # 8'
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
        {
            id: 'top-py-recursion',
            module_id: 'mod-py-2',
            title: 'Recursion and Recursive Thinking',
            order_index: 3,
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
        {
            id: 'top-py-datastruct',
            module_id: 'mod-py-3',
            title: 'Lists, Dictionaries & Comprehensions',
            order_index: 3,
            learning_objective: 'Master Python sequences, hash maps (dictionaries), set operations, and idiomatic comprehensions.',
            content_standard: 'Lists are mutable ordered arrays. Dictionaries are O(1) average lookup key-value hash maps. Comprehensions offer concise declarative mapping and filtering syntax.',
            content_low: '### ⚡ Fast-Track Summary\n- Dictionaries are hash tables with O(1) amortized access.\n- List comprehensions `[expr for x in iterable if cond]` compiled into bytecode loop with zero method lookup overhead.\n- Use `collections.defaultdict` and `collections.deque` for specialized queues.',
            content_medium: '### 📘 Standard Guide\nLists store ordered items: `[1, 2, 3]`. Dictionaries store key-value pairs: `{"name": "Python", "year": 1991}`. Access values using `.get(key, default)`.',
            content_high: '### 🌱 Step-by-Step Breakdown\n- A **List** is like a numbered to-do list.\n- A **Dictionary** is like a real phonebook: you look up a person\'s name (the key) to find their number (the value).',
            syntax: 'my_list = [1, 2, 3]\nmy_dict = {"a": 10, "b": 20}\nsquares = [x**2 for x in range(5) if x % 2 == 0]',
            examples: 'student = {"name": "Grace", "gpa": 3.9}\nif student.get("gpa", 0) > 3.5:\n    print("Dean\'s Honor Roll!")',
            common_mistakes: 'Using key lookup `dict[k]` directly when the key might not exist, causing KeyError instead of using `.get(k)`.',
            practice_prompt: 'Write a dictionary comprehension that maps numbers 1 through 5 to their cubes.',
            prerequisite_topic_id: 'top-py-functions',
            sections: [
                {
                    id: 'sec-py-ds-1',
                    title: '1. Lists & Indexing',
                    order_index: 1,
                    content: 'Lists in Python are dynamic, zero-indexed arrays that can hold mixed data types.',
                    code_snippet: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[0]) # "apple"\nprint(fruits[-1]) # "cherry" (reverse indexing)'
                },
                {
                    id: 'sec-py-ds-2',
                    title: '2. Dictionaries & Fast Key-Value Lookups',
                    order_index: 2,
                    content: 'Dictionaries use hashing to give O(1) instant lookups by key.',
                    code_snippet: 'scores = {"Alice": 95, "Bob": 82}\nprint(scores.get("Charlie", 0)) # Safe fallback 0'
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
        }
    ]
};
