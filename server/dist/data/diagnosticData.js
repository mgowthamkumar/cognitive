"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialDiagnosticQuestions = void 0;
exports.initialDiagnosticQuestions = [
    // --- PYTHON DIAGNOSTIC QUESTIONS ---
    {
        id: 'diag-py-1',
        language: 'python',
        category: 'concept',
        question: 'What is the output of `type(5 / 2)` in Python 3?',
        options: ['<class \'int\'>', '<class \'float\'>', '<class \'double\'>', '<class \'number\'>'],
        correct_index: 1,
        explanation: 'In Python 3, the single slash division operator `/` always performs true division and returns a float (2.5).',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-2',
        language: 'python',
        category: 'concept',
        question: 'Which of the following Python data types is mutable?',
        options: ['tuple', 'string', 'list', 'frozenset'],
        correct_index: 2,
        explanation: 'Lists can be modified in place (items added, removed, or changed), whereas tuples, strings, and frozensets are immutable.',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-3',
        language: 'python',
        category: 'problem_solving',
        question: 'What will this loop print?\n\nnums = [1, 2, 3]\nfor x in nums:\n    if x == 2:\n        continue\n    print(x, end=" ")',
        code_snippet: 'nums = [1, 2, 3]\nfor x in nums:\n    if x == 2:\n        continue\n    print(x, end=" ")',
        options: ['1 2 3', '1 3', '2 3', '1 2'],
        correct_index: 1,
        explanation: 'When x == 2, the `continue` statement skips the remainder of the loop iteration, so only 1 and 3 are printed.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-4',
        language: 'python',
        category: 'problem_solving',
        question: 'What is the return value of `depth([1, [2, [3]]])` when calculating maximum nested depth?',
        code_snippet: 'def depth(lst):\n    if not isinstance(lst, list):\n        return 0\n    if not lst:\n        return 1\n    return 1 + max(depth(item) for item in lst)\nprint(depth([1, [2, [3]]]))',
        options: ['2', '3', '4', '1'],
        correct_index: 1,
        explanation: 'The list nesting reaches 3 levels: [1, ...], [2, ...], [3]. Hence the maximum depth is 3.',
        difficulty_weight: 3
    },
    {
        id: 'diag-py-5',
        language: 'python',
        category: 'coding_ability',
        question: 'Which one-liner correctly filters all odd numbers from a list `data`?',
        options: [
            '[x for x in data if x % 2 != 0]',
            'filter(lambda x: x % 2 == 0, data)',
            '[x if x % 2 != 0 for x in data]',
            'data.filter(x => x % 2 != 0)'
        ],
        correct_index: 0,
        explanation: '`[x for x in data if x % 2 != 0]` is the standard, idiomatic Python list comprehension for filtering odd elements.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-6',
        language: 'python',
        category: 'coding_ability',
        question: 'What bug exists in this default argument accumulator function?\n\ndef add_item(item, basket=[]):\n    basket.append(item)\n    return basket',
        code_snippet: 'def add_item(item, basket=[]):\n    basket.append(item)\n    return basket',
        options: [
            'SyntaxError on function declaration',
            'The default list is instantiated once at definition time and shared across calls',
            'append() returns a new list and must be assigned',
            'Python functions cannot return lists'
        ],
        correct_index: 1,
        explanation: 'Default argument expressions in Python are evaluated once when the function is defined, causing mutable default arguments (like `[]`) to persist state across repeated function calls.',
        difficulty_weight: 3
    },
    {
        id: 'diag-py-7',
        language: 'python',
        category: 'concept',
        question: 'What does the `is` operator compare in Python?',
        options: ['Value equality', 'Object memory identity (whether two references point to the exact same object)', 'Variable type only', 'Length of sequences'],
        correct_index: 1,
        explanation: '`==` compares object values/contents, while `is` verifies whether two references point to the exact same memory location (`id(a) == id(b)`).',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-8',
        language: 'python',
        category: 'concept',
        question: 'Which built-in Python function returns an iterator of tuples containing index counts and values?',
        options: ['zip()', 'map()', 'enumerate()', 'filter()'],
        correct_index: 2,
        explanation: '`enumerate(iterable, start=0)` produces an iterator of `(index, item)` pairs.',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-9',
        language: 'python',
        category: 'problem_solving',
        question: 'What is the average time complexity of looking up a key in a Python dict with N keys?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correct_index: 0,
        explanation: 'Python dictionaries are implemented as hash tables with open addressing, providing O(1) average time complexity for key lookup.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-10',
        language: 'python',
        category: 'problem_solving',
        question: 'What is the output of the following code?\n\nx = [1, 2]\ny = x\ny.append(3)\nprint(x)',
        code_snippet: 'x = [1, 2]\ny = x\ny.append(3)\nprint(x)',
        options: ['[1, 2]', '[1, 2, 3]', 'AttributeError', '[3]'],
        correct_index: 1,
        explanation: 'Variables in Python hold references. Assigning `y = x` aliases the list; mutating `y` directly mutates the object referenced by `x`.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-11',
        language: 'python',
        category: 'coding_ability',
        question: 'What keyword does a Python generator function use to produce values lazily?',
        options: ['yield', 'await', 'produce', 'return'],
        correct_index: 0,
        explanation: 'The `yield` keyword turns a function into a generator that pauses execution and yields values on demand via `next()`.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-12',
        language: 'python',
        category: 'coding_ability',
        question: 'What is the idiomatic Python construct to ensure a file is always closed after reading, even if exceptions occur?',
        options: [
            'Using `with open(...) as f:` context manager',
            'Calling `file.close_now()` in try block',
            'Catching `EOFError`',
            'Using `del f`'
        ],
        correct_index: 0,
        explanation: 'The `with` statement utilizes the context management protocol (`__enter__` and `__exit__`), guaranteeing file cleanup.',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-13',
        language: 'python',
        category: 'concept',
        question: 'What is the exact output of `10.0 // 3` in Python 3?',
        options: ['3', '3.0', '3.3333333333333335', 'TypeError'],
        correct_index: 1,
        explanation: 'Floor division `//` performs floor arithmetic, but if at least one operand is a float (`10.0`), the result is coerced to float (`3.0`).',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-14',
        language: 'python',
        category: 'problem_solving',
        question: 'What happens when evaluating `int("0b1111")` in Python?',
        options: [
            'Returns integer 15',
            'Raises ValueError: invalid literal for int() with base 10',
            'Returns binary string "0b1111"',
            'Returns 1111'
        ],
        correct_index: 1,
        explanation: '`int(string)` expects a base-10 integer string by default. To parse binary strings, the base must be explicitly passed: `int("0b1111", 2)`. Calling `int("0b1111")` raises ValueError.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-15',
        language: 'python',
        category: 'concept',
        question: 'How do you define a single-valued tuple containing the number 10 in Python?',
        options: ['t = (10)', 't = (10,)', 't = tuple[10]', 't = [10]'],
        correct_index: 1,
        explanation: '`t = (10)` is evaluated as a grouped integer. A trailing comma `(10,)` is mandatory for Python to recognize it as a single-element tuple.',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-16',
        language: 'python',
        category: 'problem_solving',
        question: 'Given set `s = {10, 20}`, what is the difference between `s.remove(50)` and `s.discard(50)`?',
        options: [
            '`remove(50)` raises a KeyError; `discard(50)` completes without error',
            '`discard(50)` raises a KeyError; `remove(50)` returns None',
            'Both methods raise a ValueError',
            'Both methods automatically insert 50 into the set'
        ],
        correct_index: 0,
        explanation: 'In Python sets, `remove()` raises a KeyError if the element does not exist. `discard()` removes the element if present, or safely does nothing if absent.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-17',
        language: 'python',
        category: 'coding_ability',
        question: 'Why does calling `calc(b=50, 100)` cause a SyntaxError in Python?',
        options: [
            'Positional arguments cannot follow keyword arguments in a function call',
            'Python functions can only accept keyword arguments',
            'Parameter `b` must be capitalized',
            'Arguments must always be enclosed in a tuple'
        ],
        correct_index: 0,
        explanation: 'In Python syntax, all positional arguments must precede any keyword arguments in a function call.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-18',
        language: 'python',
        category: 'coding_ability',
        question: 'What types do variable-length positional arguments `*args` and keyword arguments `**kwargs` have inside a Python function?',
        options: [
            '`*args` is a tuple, `**kwargs` is a dict',
            '`*args` is a list, `**kwargs` is a tuple',
            '`*args` is a set, `**kwargs` is a list',
            '`*args` is a generator, `**kwargs` is an object'
        ],
        correct_index: 0,
        explanation: '`*args` packages excess positional arguments into an immutable tuple, while `**kwargs` packages named arguments into a dictionary.',
        difficulty_weight: 2
    },
    {
        id: 'diag-py-19',
        language: 'python',
        category: 'concept',
        question: 'Out of the 33 reserved keywords in Python, which ones start with a capital letter?',
        options: [
            'True, False, None',
            'Def, Class, Return',
            'If, Elif, Else',
            'All 33 keywords are lowercase'
        ],
        correct_index: 0,
        explanation: 'Only True, False, and None are capitalized in Python keywords. The remaining 30 are strictly lowercase.',
        difficulty_weight: 1
    },
    {
        id: 'diag-py-20',
        language: 'python',
        category: 'problem_solving',
        question: 'Which regular expression pattern validates a 10-digit Indian mobile number starting with digits 6 to 9?',
        options: [
            're.fullmatch(r"[6-9]\\d{9}", number)',
            're.match(r"[0-9]{10}", number)',
            're.search(r"\\d{10}", number)',
            're.findall(r"[6-9]{10}", number)'
        ],
        correct_index: 0,
        explanation: '`[6-9]` requires the first digit to be 6, 7, 8, or 9, followed by exactly 9 digits (`\\d{9}`). Using `re.fullmatch` guarantees no unvalidated prefix or suffix.',
        difficulty_weight: 2
    },
    // --- C DIAGNOSTIC QUESTIONS ---
    {
        id: 'diag-c-1',
        language: 'c',
        category: 'concept',
        question: 'What does the `&` operator represent in `scanf("%d", &x);`?',
        options: ['Bitwise AND operator', 'Address-of operator passing pointer to x', 'Logical AND operator', 'String concatenation'],
        correct_index: 1,
        explanation: 'The `&` operator retrieves the memory address of variable `x`, allowing `scanf` to modify `x` directly via a pointer.',
        difficulty_weight: 1
    },
    {
        id: 'diag-c-2',
        language: 'c',
        category: 'concept',
        question: 'Where is memory allocated when calling `malloc(sizeof(int) * 10)` in C?',
        options: ['Call Stack', 'Heap', 'CPU Registers', 'BSS segment'],
        correct_index: 1,
        explanation: '`malloc()` dynamically allocates memory on the Heap segment, which persists until explicitly released with `free()`.',
        difficulty_weight: 2
    },
    {
        id: 'diag-c-3',
        language: 'c',
        category: 'problem_solving',
        question: 'What is printed by the following code snippet?\n\nint arr[] = {10, 20, 30};\nint *ptr = arr;\nprintf("%d", *(ptr + 1));',
        code_snippet: 'int arr[] = {10, 20, 30};\nint *ptr = arr;\nprintf("%d", *(ptr + 1));',
        options: ['10', '20', '30', 'Compilation Error'],
        correct_index: 1,
        explanation: 'Pointer arithmetic increments `ptr` by `1 * sizeof(int)`, pointing to index 1 of the array which holds 20.',
        difficulty_weight: 2
    },
    {
        id: 'diag-c-4',
        language: 'c',
        category: 'coding_ability',
        question: 'Which statement correctly frees dynamically allocated memory and avoids dangling pointers?',
        options: [
            'free(ptr); ptr = NULL;',
            'delete ptr;',
            'ptr = NULL; free(ptr);',
            'release(ptr);'
        ],
        correct_index: 0,
        explanation: 'Calling `free(ptr)` deallocates the heap block, and immediately setting `ptr = NULL` prevents accidental dangling pointer dereferencing.',
        difficulty_weight: 2
    },
    // --- C++ DIAGNOSTIC QUESTIONS ---
    {
        id: 'diag-cpp-1',
        language: 'cpp',
        category: 'concept',
        question: 'What is the key difference between a C++ reference (`int &ref = x;`) and a pointer (`int *ptr = &x;`)?',
        options: [
            'References can be reassigned to other variables at runtime',
            'References cannot be NULL and must be initialized upon declaration',
            'Pointers do not occupy any memory',
            'References require the `*` operator for dereferencing'
        ],
        correct_index: 1,
        explanation: 'A reference is an alias that cannot be NULL, cannot be reseated to another object, and must be bound when created.',
        difficulty_weight: 2
    },
    {
        id: 'diag-cpp-2',
        language: 'cpp',
        category: 'problem_solving',
        question: 'To achieve runtime polymorphism in C++, the base class method must be marked with which keyword?',
        options: ['static', 'inline', 'virtual', 'override'],
        correct_index: 2,
        explanation: 'The `virtual` keyword instructs the compiler to use a vtable (virtual method table) for dynamic dispatch at runtime.',
        difficulty_weight: 2
    },
    {
        id: 'diag-cpp-3',
        language: 'cpp',
        category: 'coding_ability',
        question: 'Which modern C++ smart pointer provides exclusive ownership of a dynamic heap resource?',
        options: ['std::shared_ptr', 'std::unique_ptr', 'std::weak_ptr', 'std::auto_ptr'],
        correct_index: 1,
        explanation: '`std::unique_ptr` implements strict exclusive ownership with zero overhead over a raw pointer, automatically releasing memory when it goes out of scope.',
        difficulty_weight: 2
    },
    // --- JAVA DIAGNOSTIC QUESTIONS ---
    {
        id: 'diag-java-1',
        language: 'java',
        category: 'concept',
        question: 'What is the purpose of the Java Virtual Machine (JVM)?',
        options: [
            'Compiles Java source code directly into x86 machine instructions',
            'Executes compiled Java bytecode (.class) across diverse operating systems ("Write Once, Run Anywhere")',
            'Manages CSS rendering for Java applications',
            'Hosts SQL database tables'
        ],
        correct_index: 1,
        explanation: 'The JVM abstracts the underlying hardware and OS, interpreting or JIT-compiling Java bytecode into native machine code.',
        difficulty_weight: 1
    },
    {
        id: 'diag-java-2',
        language: 'java',
        category: 'problem_solving',
        question: 'What happens when evaluating `"Hello" == new String("Hello")` in Java?',
        options: [
            'Evaluates to true because the characters are identical',
            'Evaluates to false because `==` compares reference addresses, not content',
            'Throws NullPointerException',
            'Throws ClassCastException'
        ],
        correct_index: 1,
        explanation: 'In Java, `==` tests object reference identity. Since `new String(...)` allocates a distinct heap object outside the string pool, `==` evaluates to false. Use `.equals()` for value comparison.',
        difficulty_weight: 2
    },
    {
        id: 'diag-java-3',
        language: 'java',
        category: 'coding_ability',
        question: 'Which collection implementation in Java offers O(1) average time complexity for both `put` and `get` operations?',
        options: ['TreeMap', 'HashMap', 'LinkedList', 'Vector'],
        correct_index: 1,
        explanation: '`HashMap` uses hashing and bucket array lookups to provide average O(1) time complexity for lookup, insertion, and deletion.',
        difficulty_weight: 2
    }
];
