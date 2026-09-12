"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialProjects = void 0;
exports.initialProjects = [
    // ==========================================
    // PYTHON PROJECTS (Section 82)
    // ==========================================
    {
        id: 'proj-py-beg-calc',
        title: 'CLI Scientific Calculator',
        language: 'python',
        level: 'beginner',
        is_capstone: false,
        description: 'Build an interactive command-line calculator supporting arithmetic, power, modulus, and chained expressions with robust error handling for divide-by-zero.',
        learning_objectives: [
            'Master functions and parameter passing',
            'Implement robust input validation and try-except handling',
            'Format numerical outputs cleanly'
        ],
        requirements: [
            'Support +, -, *, /, %, ** operations',
            'Handle DivisionByZero gracefully with an informative message',
            'Parse input lines formatted as "operator operand1 operand2"'
        ],
        starter_code: `def calculate(op, a, b):
    # Write your calculator implementation here
    pass

if __name__ == '__main__':
    import sys
    lines = sys.stdin.read().strip().splitlines()
    for line in lines:
        if not line: continue
        parts = line.split()
        if len(parts) == 3:
            op, a, b = parts[0], float(parts[1]), float(parts[2])
            print(calculate(op, a, b))
`,
        test_cases: [
            { input: '+ 10 25', expected_output: '35.0', is_hidden: false },
            { input: '* 7 8', expected_output: '56.0', is_hidden: false },
            { input: '/ 10 0', expected_output: 'ERROR_ZERO_DIVISION', is_hidden: true }
        ],
        milestones: [
            { id: 'm1', title: 'Basic Arithmetic', description: 'Implement add, subtract, multiply, divide', order_index: 1, hints: ['Use if-elif branches or a dictionary of operators'] },
            { id: 'm2', title: 'Error Trapping', description: 'Trap ZeroDivisionError and return "ERROR_ZERO_DIVISION"', order_index: 2, hints: ['Check if b == 0 before performing division'] },
            { id: 'm3', title: 'Exponent & Modulo', description: 'Add support for ** and %', order_index: 3, hints: ['Remember float modulo behaves properly in Python'] }
        ],
        evaluation_criteria: {
            correctness_weight: 0.30,
            code_quality_weight: 0.15,
            complexity_weight: 0.15,
            test_cases_weight: 0.20,
            best_practices_weight: 0.10,
            concept_coverage_weight: 0.10
        }
    },
    {
        id: 'proj-py-beg-guess',
        title: 'Adaptive Number Guessing Engine',
        language: 'python',
        level: 'beginner',
        is_capstone: false,
        description: 'Create a number guessing game simulation that evaluates guesses, returns directional clues (HIGHER, LOWER, CORRECT), and tracks attempt counts.',
        learning_objectives: ['While loops and state tracking', 'Conditional logic', 'Simulation algorithms'],
        requirements: [
            'Given target number and a sequence of guesses, output feedback for each guess',
            'Stop when CORRECT is reached and output the total guesses count'
        ],
        starter_code: `def run_guessing_game(target, guesses):
    # Return list of results for each guess, followed by "TOTAL: X"
    pass
`,
        test_cases: [
            { input: '42\n10 50 42', expected_output: 'HIGHER\nLOWER\nCORRECT\nTOTAL: 3', is_hidden: false }
        ],
        milestones: [
            { id: 'm1', title: 'Guess comparison', description: 'Compare guess with target', order_index: 1, hints: ['Check guess < target vs guess > target'] },
            { id: 'm2', title: 'Termination', description: 'Stop on exact match', order_index: 2, hints: ['Use break or loop condition'] }
        ],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-py-beg-todo',
        title: 'Task Manager & To-Do CLI',
        language: 'python',
        level: 'beginner',
        is_capstone: false,
        description: 'Implement a structured in-memory task manager capable of ADD, COMPLETE, LIST, and DELETE commands.',
        learning_objectives: ['Lists and dictionary manipulation', 'String parsing', 'Command dispatcher pattern'],
        requirements: [
            'Support commands: ADD <task>, DONE <index>, LIST',
            'Format LIST as numbered items with completion marks [x] or [ ]'
        ],
        starter_code: `class TodoApp:
    def __init__(self):
        self.tasks = []
    
    def process_command(self, cmd_line):
        pass
`,
        test_cases: [
            { input: 'ADD Buy milk\nADD Write code\nDONE 0\nLIST', expected_output: '0. [x] Buy milk\n1. [ ] Write code', is_hidden: false }
        ],
        milestones: [
            { id: 'm1', title: 'Task store', description: 'Create internal list of task dicts', order_index: 1, hints: ['Use [{"title": ..., "done": False}]'] },
            { id: 'm2', title: 'Formatting', description: 'Format list accurately', order_index: 2, hints: ['Enumerate over tasks'] }
        ],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-py-int-organizer',
        title: 'Automated File Extension Organizer',
        language: 'python',
        level: 'intermediate',
        is_capstone: false,
        description: 'Group simulated file paths by file extension, calculate total counts, detect duplicates, and generate categorization summaries.',
        learning_objectives: ['Dictionary aggregation', 'Path string parsing', 'Collections / defaultdict'],
        requirements: [
            'Parse incoming file names',
            'Categorize into groups: Images (.jpg, .png), Code (.py, .c, .java), Documents (.txt, .pdf)',
            'Sort extensions alphabetically in output'
        ],
        starter_code: `def organize_files(file_list):
    # Return dictionary mapping category -> sorted list of files
    pass
`,
        test_cases: [
            { input: 'app.py,photo.jpg,notes.txt,main.c', expected_output: 'Code: 2\nDocuments: 1\nImages: 1', is_hidden: false }
        ],
        milestones: [
            { id: 'm1', title: 'Extension extraction', description: 'Split string by dot or use os.path.splitext', order_index: 1, hints: ['Handle files without extension gracefully'] }
        ],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-py-int-api-client',
        title: 'Resilient REST API Mock Client',
        language: 'python',
        level: 'intermediate',
        is_capstone: false,
        description: 'Build a mock API client with exponential backoff simulation, response status mapping, and JSON response caching.',
        learning_objectives: ['HTTP response simulation', 'Retry algorithms', 'Time-based caching'],
        requirements: ['Simulate retries on 500 errors', 'Cache 200 responses to avoid duplicate fetches'],
        starter_code: `class ResilientClient:
    def __init__(self):
        self.cache = {}
    def get(self, endpoint, mock_responses):
        pass
`,
        test_cases: [
            { input: 'GET /users -> 500, 200:{"count": 42}', expected_output: 'SUCCESS: {"count": 42} (Retries: 1)', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Retry loop', description: 'Retry loop with counter', order_index: 1, hints: ['Check status code'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-py-int-expense',
        title: 'Personal Expense & Budget Tracker',
        language: 'python',
        level: 'intermediate',
        is_capstone: false,
        description: 'Track expenses across categories (Food, Utilities, Travel), compute category percentages, and flag budget overruns.',
        learning_objectives: ['Data aggregation', 'Percentage calculations', 'Threshold alerting'],
        requirements: ['Parse records: date, category, amount', 'Report total spent and top category'],
        starter_code: `def analyze_expenses(records):
    pass
`,
        test_cases: [
            { input: 'Food 40.0\nTravel 20.0\nFood 30.0', expected_output: 'TOTAL: 90.0\nTOP: Food (70.0)', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Aggregation', description: 'Aggregate by category', order_index: 1, hints: ['Use dict.get(cat, 0) + amt'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-py-adv-async',
        title: 'Concurrent Async Pipeline & Worker Pool',
        language: 'python',
        level: 'advanced',
        is_capstone: false,
        description: 'Construct a concurrent task queue simulation that schedules jobs, limits concurrency, and aggregates execution results.',
        learning_objectives: ['Concurrency concepts', 'Producer-consumer design', 'Error isolation'],
        requirements: ['Process tasks in bounded batches', 'Catch task failures without crashing the pipeline'],
        starter_code: `def run_task_pipeline(tasks, max_concurrency=2):
    pass
`,
        test_cases: [
            { input: 'task1:10,task2:20,task3:15', expected_output: 'PROCESSED: 3 tasks', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Batching', description: 'Batch task processing', order_index: 1, hints: ['Simulate async yield'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-py-adv-dataproc',
        title: 'Streaming Data Stream Processor',
        language: 'python',
        level: 'advanced',
        is_capstone: false,
        description: 'Implement a memory-efficient generator-based streaming data pipeline capable of filtering, mapping, and computing rolling statistical windows.',
        learning_objectives: ['Python generators and yield', 'Rolling window calculation', 'Memory profiling'],
        requirements: ['Use generator pipeline (zero list bloat)', 'Compute rolling moving average'],
        starter_code: `def stream_moving_average(stream, window_size=3):
    pass
`,
        test_cases: [
            { input: '1 2 3 4 5', expected_output: '2.0 3.0 4.0', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Generator', description: 'Create rolling window generator', order_index: 1, hints: ['Maintain deque of size k'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-py-adv-mlmini',
        title: 'Pure Python Linear Regression from Scratch',
        language: 'python',
        level: 'advanced',
        is_capstone: false,
        description: 'Implement simple gradient descent linear regression from mathematical first principles without external numerical libraries.',
        learning_objectives: ['Gradient descent optimization', 'Loss functions (MSE)', 'Weights and bias updates'],
        requirements: ['Calculate slope (m) and intercept (b)', 'Output predicted y for given test x'],
        starter_code: `class LinearRegressionScratch:
    def __init__(self, lr=0.01, epochs=1000):
        self.lr = lr
        self.epochs = epochs
        self.m = 0.0
        self.b = 0.0
    def fit(self, X, y):
        pass
    def predict(self, X):
        pass
`,
        test_cases: [
            { input: 'X: 1,2,3,4 y: 2,4,6,8 test: 5', expected_output: '10.0', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Gradients', description: 'Compute dm and db derivatives', order_index: 1, hints: ['dm = (-2/n) * sum(x*(y - y_hat))'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    // ==========================================
    // C PROJECTS (Section 82)
    // ==========================================
    {
        id: 'proj-c-beg-converter',
        title: 'CLI Unit Conversion Suite',
        language: 'c',
        level: 'beginner',
        is_capstone: false,
        description: 'A modular C program for high-precision conversion between temperature (C to F), metric distance (m to ft), and mass units.',
        learning_objectives: ['Functions in C', 'Formatted I/O (scanf, printf)', 'Header files and structs'],
        requirements: ['Handle C_TO_F, M_TO_FT, KG_TO_LBS', 'Format output to 2 decimal places'],
        starter_code: `#include <stdio.h>
#include <string.h>

void convert(const char* type, double val) {
    // Implement conversion logic
}

int main() {
    char type[32];
    double val;
    if (scanf("%s %lf", type, &val) == 2) {
        convert(type, val);
    }
    return 0;
}
`,
        test_cases: [
            { input: 'C_TO_F 100.0', expected_output: '212.00', is_hidden: false },
            { input: 'M_TO_FT 10.0', expected_output: '32.81', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Formulae', description: 'Implement conversion formulas', order_index: 1, hints: ['F = C * 9/5 + 32'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-c-int-cache',
        title: 'In-Memory Key-Value Cache with Hash Chaining',
        language: 'c',
        level: 'intermediate',
        is_capstone: false,
        description: 'Implement a collision-resilient hash table in C using linked-list chaining, dynamic string duplication, and complete memory free routines.',
        learning_objectives: ['Pointers and malloc/free', 'Linked list nodes', 'Hash function (djb2)'],
        requirements: ['Support SET key value, GET key, and DELETE key', 'Zero memory leaks upon cleanup'],
        starter_code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Define Node and HashTable structs here

int main() {
    // Read operations
    return 0;
}
`,
        test_cases: [
            { input: 'SET user Alice\nGET user', expected_output: 'Alice', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Hash function', description: 'Implement djb2 algorithm', order_index: 1, hints: ['hash = ((hash << 5) + hash) + c'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-c-adv-taskqueue',
        title: 'Multi-Threaded Work Queue & Ring Buffer',
        language: 'c',
        level: 'advanced',
        is_capstone: false,
        description: 'Build a circular bounded FIFO ring buffer representing a synchronized task dispatch queue with push, pop, and overflow protection.',
        learning_objectives: ['Ring buffer circular indexing', 'Thread synchronization concepts', 'Buffer overflow guards'],
        requirements: ['Fixed-size circular buffer', 'Detect QUEUE_FULL and QUEUE_EMPTY'],
        starter_code: `#include <stdio.h>
#define CAPACITY 4

typedef struct {
    int data[CAPACITY];
    int head;
    int tail;
    int count;
} RingQueue;

int main() {
    return 0;
}
`,
        test_cases: [
            { input: 'PUSH 1\nPUSH 2\nPOP\nPOP', expected_output: '1\n2', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Modulo indexing', description: 'Use (index + 1) % CAPACITY', order_index: 1, hints: ['Track count accurately'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    // ==========================================
    // C++ PROJECTS (Section 82)
    // ==========================================
    {
        id: 'proj-cpp-beg-student',
        title: 'Student Grade & Record Management System',
        language: 'cpp',
        level: 'beginner',
        is_capstone: false,
        description: 'Design an object-oriented student records system using C++ classes, vectors, encapsulation, and average GPA computation.',
        learning_objectives: ['Class encapsulation and constructors', 'std::vector', 'const member functions'],
        requirements: ['Class Student with private members', 'Compute average grade across assignments'],
        starter_code: `#include <iostream>
#include <vector>
#include <string>

class Student {
    // Implement class
};

int main() {
    return 0;
}
`,
        test_cases: [
            { input: 'Alex 85 90 95', expected_output: 'Alex: 90.00', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Class structure', description: 'Add name and grades vector', order_index: 1, hints: ['Use double for accurate GPA'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-cpp-int-matrix',
        title: 'Matrix Math Engine with Operator Overloading',
        language: 'cpp',
        level: 'intermediate',
        is_capstone: false,
        description: 'Develop a 2D Matrix mathematics engine supporting operator overloading (+, *, ==), matrix transpose, and determinant computation.',
        learning_objectives: ['Operator overloading in C++', 'Copy semantics', 'Dimension validation'],
        requirements: ['Overload operator+ and operator*', 'Verify matching dimensions before arithmetic'],
        starter_code: `#include <iostream>
#include <vector>

class Matrix {
    int rows, cols;
    std::vector<std::vector<int>> data;
public:
    // Implement constructors and operators
};

int main() {
    return 0;
}
`,
        test_cases: [
            { input: '2 2\n1 2\n3 4\n+\n2 2\n1 1\n1 1', expected_output: '2 3\n4 5', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Addition operator', description: 'Overload operator+', order_index: 1, hints: ['Check rows == other.rows'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-cpp-adv-vector',
        title: 'Custom STL Vector Implementation with Move Semantics',
        language: 'cpp',
        level: 'advanced',
        is_capstone: false,
        description: 'Recreate std::vector from scratch using templates, dynamic heap re-allocation (2x growth factor), move semantics, and RAII destruction.',
        learning_objectives: ['C++ Templates', 'Rule of 5 (copy/move constructors/assignments)', 'Memory allocation strategies'],
        requirements: ['push_back, pop_back, size, capacity, operator[]', 'Proper move constructor and destructor'],
        starter_code: `#include <iostream>

template<typename T>
class MyVector {
    T* data;
    size_t sz;
    size_t cap;
public:
    MyVector() : data(nullptr), sz(0), cap(0) {}
    ~MyVector() { delete[] data; }
    // Implement push_back and indexing
};

int main() {
    return 0;
}
`,
        test_cases: [
            { input: 'PUSH 10\nPUSH 20\nGET 1', expected_output: '20', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Dynamic resize', description: 'Double capacity when full', order_index: 1, hints: ['Allocate new buffer and copy elements'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    // ==========================================
    // JAVA PROJECTS (Section 82)
    // ==========================================
    {
        id: 'proj-java-beg-library',
        title: 'Library Catalog & Checkout System',
        language: 'java',
        level: 'beginner',
        is_capstone: false,
        description: 'Create an object-oriented Java application managing book records, patrons, checkout statuses, and overdue fine estimations.',
        learning_objectives: ['Java classes, objects, and packages', 'ArrayList and HashMap', 'Encapsulation and getters/setters'],
        requirements: ['Classes: Book, Library', 'Support CHECKOUT <id>, RETURN <id>, LIST'],
        starter_code: `import java.util.*;

class Book {
    String id;
    String title;
    boolean isCheckedOut;
}

public class LibrarySystem {
    public static void main(String[] args) {
        // Implement driver
    }
}
`,
        test_cases: [
            { input: 'ADD B1 CleanCode\nCHECKOUT B1\nSTATUS B1', expected_output: 'CHECKED_OUT', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'State management', description: 'Toggle isCheckedOut flag', order_index: 1, hints: ['Look up book by ID in Map'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-java-int-bank',
        title: 'Multi-User Banking Simulation with OOP Inheritance',
        language: 'java',
        level: 'intermediate',
        is_capstone: false,
        description: 'Model a bank with SavingsAccount (interest) and CheckingAccount (overdraft protection) inheriting from an abstract Account base class.',
        learning_objectives: ['Abstract classes and interfaces', 'Polymorphic dispatch', 'Custom exceptions (InsufficientFundsException)'],
        requirements: ['Deposit, withdraw, and transfer between accounts', 'Enforce overdraft limit on CheckingAccount'],
        starter_code: `import java.util.*;

abstract class Account {
    protected String accountId;
    protected double balance;
    abstract void withdraw(double amount) throws Exception;
}

public class BankingApp {
    public static void main(String[] args) {
    }
}
`,
        test_cases: [
            { input: 'CREATE CHECKING A1 100 50\nWITHDRAW A1 120', expected_output: 'BALANCE: -20.0', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Inheritance hierarchy', description: 'Extend Account with custom withdrawal rule', order_index: 1, hints: ['Check amount <= balance + overdraftLimit'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'proj-java-adv-eventbus',
        title: 'Concurrent Publish-Subscribe Event Bus',
        language: 'java',
        level: 'advanced',
        is_capstone: false,
        description: 'Implement a thread-safe publish-subscribe event dispatch system supporting topic-based filtering and asynchronous listener execution.',
        learning_objectives: ['Java Concurrency (ConcurrentHashMap, CopyOnWriteArrayList)', 'Observer pattern', 'Functional interfaces (Consumer)'],
        requirements: ['Support subscribe(topic, listener)', 'Support publish(topic, eventData)'],
        starter_code: `import java.util.concurrent.*;
import java.util.*;

public class EventBus {
    // Implement thread-safe event bus
    public static void main(String[] args) {
    }
}
`,
        test_cases: [
            { input: 'PUB user.signup Alice', expected_output: 'RECEIVED: user.signup -> Alice', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Thread-safe store', description: 'Map topic to list of handlers', order_index: 1, hints: ['Use ConcurrentHashMap'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    // ==========================================
    // 4 LANGUAGE CAPSTONES (Section 83)
    // ==========================================
    {
        id: 'capstone-python-ai',
        title: 'Capstone: AI-Powered Data Analysis Application',
        language: 'python',
        level: 'advanced',
        is_capstone: true,
        description: 'Synthesize your Python mastery! Ingest tabular datasets, compute statistical descriptors (mean, variance, quartiles), detect statistical outliers via IQR, and generate automated diagnostic summaries.',
        learning_objectives: [
            'End-to-end data pipeline design',
            'Mathematical statistical algorithms',
            'Modular architecture and report formatting'
        ],
        requirements: [
            'Parse multi-row numerical CSV streams',
            'Compute mean, median, standard deviation',
            'Detect outliers using 1.5 * IQR rule',
            'Output formatted executive analytics report'
        ],
        starter_code: `class DataAnalysisEngine:
    def __init__(self, data):
        self.data = sorted(data)
    
    def summary_statistics(self):
        # Return dict with mean, median, std_dev, outliers
        pass

if __name__ == '__main__':
    import sys
    nums = [float(x) for x in sys.stdin.read().split() if x]
    engine = DataAnalysisEngine(nums)
    res = engine.summary_statistics()
    print(res)
`,
        test_cases: [
            { input: '10 12 11 15 14 100', expected_output: 'MEAN: 27.0\nOUTLIERS: [100.0]', is_hidden: false }
        ],
        milestones: [
            { id: 'm1', title: 'Data Ingestion & Sorting', description: 'Clean and sort numerical inputs', order_index: 1, hints: ['Cast each token to float'] },
            { id: 'm2', title: 'Statistics Computations', description: 'Implement mean and standard deviation', order_index: 2, hints: ['Variance = sum((x - mean)**2) / N'] },
            { id: 'm3', title: 'IQR Outlier Detection', description: 'Calculate Q1, Q3, IQR = Q3 - Q1, and flag values beyond [Q1 - 1.5*IQR, Q3 + 1.5*IQR]', order_index: 3, hints: ['Q1 is at 25th percentile, Q3 at 75th percentile'] }
        ],
        evaluation_criteria: {
            correctness_weight: 0.30,
            code_quality_weight: 0.15,
            complexity_weight: 0.15,
            test_cases_weight: 0.20,
            best_practices_weight: 0.10,
            concept_coverage_weight: 0.10
        }
    },
    {
        id: 'capstone-c-minishell',
        title: 'Capstone: System-Level Unix Mini-Shell Utility',
        language: 'c',
        level: 'advanced',
        is_capstone: true,
        description: 'Synthesize your C mastery! Build an interactive command interpreter with built-in commands (cd, pwd, exit), argument tokenization, and pipeline simulation.',
        learning_objectives: ['String manipulation in C', 'Process lifecycle & memory boundaries', 'Robust exit handling'],
        requirements: ['Tokenize command line into argv array', 'Implement built-in commands cd, pwd, and exit'],
        starter_code: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Implement Mini-Shell command processor
int main() {
    return 0;
}
`,
        test_cases: [
            { input: 'pwd\necho hello', expected_output: '/root\nhello', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Tokenization', description: 'Split command by spaces into char* argv[]', order_index: 1, hints: ['Use strtok or custom scanner'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'capstone-cpp-graph',
        title: 'Capstone: High-Performance Graph & Pathfinding Engine',
        language: 'cpp',
        level: 'advanced',
        is_capstone: true,
        description: 'Synthesize your C++ mastery! Create an adjacency list directed graph with Dijkstra shortest path search, priority queue optimizations, and cycle detection.',
        learning_objectives: ['Modern C++ standard library (std::priority_queue, std::unordered_map)', 'Graph algorithms', 'Time and space optimization'],
        requirements: ['Add weighted directed edges', 'Find shortest path distance between source and destination'],
        starter_code: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>

class Graph {
    // Implement graph and dijkstra
};

int main() {
    return 0;
}
`,
        test_cases: [
            { input: 'EDGE A B 4\nEDGE B C 3\nEDGE A C 10\nPATH A C', expected_output: 'DISTANCE: 7', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Adjacency list', description: 'Store node -> vector of (neighbor, weight)', order_index: 1, hints: ['Use std::unordered_map<string, vector<pair<string, int>>>'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    },
    {
        id: 'capstone-java-ecommerce',
        title: 'Capstone: Enterprise Transaction & Order Processing Engine',
        language: 'java',
        level: 'advanced',
        is_capstone: true,
        description: 'Synthesize your Java mastery! Construct a layered enterprise architecture (Models, Repository, Service) with synchronized inventory decrement, discount rule strategies, and transaction validation.',
        learning_objectives: ['Layered enterprise software architecture', 'Design patterns (Strategy, Repository)', 'Atomic transaction rollback simulation'],
        requirements: ['Model Product, Order, Customer', 'Validate stock before committing order', 'Apply discount strategies'],
        starter_code: `import java.util.*;

public class OrderProcessingEngine {
    public static void main(String[] args) {
        // Implement enterprise order processor
    }
}
`,
        test_cases: [
            { input: 'STOCK P1 10 50.0\nORDER C1 P1 2\nTOTAL C1', expected_output: 'ORDER_SUCCESS: 100.0\nSTOCK_REMAINING: 8', is_hidden: false }
        ],
        milestones: [{ id: 'm1', title: 'Repository layer', description: 'Store inventory in memory', order_index: 1, hints: ['Synchronize or check stock before decrement'] }],
        evaluation_criteria: { correctness_weight: 0.3, code_quality_weight: 0.15, complexity_weight: 0.15, test_cases_weight: 0.2, best_practices_weight: 0.1, concept_coverage_weight: 0.1 }
    }
];
