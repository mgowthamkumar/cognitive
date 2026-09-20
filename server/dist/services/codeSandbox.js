"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeSandbox = exports.CodeSandboxService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
class CodeSandboxService {
    sandboxBaseDir;
    timeoutMs = 5000;
    constructor() {
        this.sandboxBaseDir = path_1.default.resolve(process.cwd(), 'scratch_sandbox');
        if (!fs_1.default.existsSync(this.sandboxBaseDir)) {
            fs_1.default.mkdirSync(this.sandboxBaseDir, { recursive: true });
        }
    }
    async evaluateCode(code, language, testCases) {
        const runId = `exec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const runDir = path_1.default.join(this.sandboxBaseDir, runId);
        fs_1.default.mkdirSync(runDir, { recursive: true });
        const startTime = Date.now();
        try {
            let rawResult;
            if (language === 'python' || language === 'py') {
                rawResult = await this.evaluatePython(runDir, code, testCases, startTime);
            }
            else if (language === 'c') {
                rawResult = await this.evaluateC(runDir, code, testCases, startTime);
            }
            else if (language === 'cpp' || language === 'c++') {
                rawResult = await this.evaluateCpp(runDir, code, testCases, startTime);
            }
            else if (language === 'java') {
                rawResult = await this.evaluateJava(runDir, code, testCases, startTime);
            }
            else {
                throw new Error(`Unsupported programming language: ${language}`);
            }
            return this.decorateResult(rawResult);
        }
        finally {
            // Clean up sandbox directory asynchronously
            try {
                fs_1.default.rmSync(runDir, { recursive: true, force: true });
            }
            catch (e) {
                // ignore clean up error
            }
        }
    }
    async evaluatePython(runDir, code, testCases, startTime) {
        const scriptPath = path_1.default.join(runDir, 'solution.py');
        fs_1.default.writeFileSync(scriptPath, code, 'utf-8');
        const details = [];
        let passedVisible = 0;
        let totalVisible = 0;
        let passedHidden = 0;
        let totalHidden = 0;
        for (const tc of testCases) {
            if (tc.is_hidden)
                totalHidden++;
            else
                totalVisible++;
            const res = await this.runProcess('python', ['solution.py'], tc.input, runDir);
            if (res.timedOut) {
                return {
                    status: 'TIME_LIMIT_EXCEEDED',
                    passed_test_cases: passedVisible,
                    total_test_cases: totalVisible,
                    hidden_passed: passedHidden,
                    hidden_total: totalHidden,
                    execution_time_ms: Date.now() - startTime,
                    runtime_error: 'Time Limit Exceeded (> 5000ms). Check for infinite loops.',
                    details
                };
            }
            if (res.exitCode !== 0) {
                return {
                    status: 'RUNTIME_ERROR',
                    passed_test_cases: passedVisible,
                    total_test_cases: totalVisible,
                    hidden_passed: passedHidden,
                    hidden_total: totalHidden,
                    execution_time_ms: Date.now() - startTime,
                    runtime_error: res.stderr || 'Runtime error during execution',
                    details
                };
            }
            const actualTrimmed = res.stdout.trim().replace(/\r\n/g, '\n');
            const expectedTrimmed = tc.expected_output.trim().replace(/\r\n/g, '\n');
            const isPassed = actualTrimmed === expectedTrimmed;
            if (isPassed) {
                if (tc.is_hidden)
                    passedHidden++;
                else
                    passedVisible++;
            }
            details.push({
                input: tc.input,
                expected: tc.expected_output,
                actual: isPassed ? actualTrimmed : actualTrimmed.substring(0, 300),
                passed: isPassed,
                is_hidden: !!tc.is_hidden
            });
        }
        const allPassed = passedVisible === totalVisible && passedHidden === totalHidden;
        return {
            status: allPassed ? 'PASSED' : 'FAILED',
            passed_test_cases: passedVisible,
            total_test_cases: totalVisible,
            hidden_passed: passedHidden,
            hidden_total: totalHidden,
            execution_time_ms: Date.now() - startTime,
            details
        };
    }
    async evaluateC(runDir, code, testCases, startTime) {
        const srcPath = path_1.default.join(runDir, 'solution.c');
        const binName = process.platform === 'win32' ? 'solution.exe' : 'solution';
        const binPath = path_1.default.join(runDir, binName);
        fs_1.default.writeFileSync(srcPath, code, 'utf-8');
        // Compile with gcc / g++
        const compileRes = await this.runProcess('g++', ['-O2', 'solution.c', '-o', binName], '', runDir);
        if (compileRes.exitCode !== 0) {
            return {
                status: 'COMPILE_ERROR',
                passed_test_cases: 0,
                total_test_cases: testCases.filter(t => !t.is_hidden).length,
                hidden_passed: 0,
                hidden_total: testCases.filter(t => t.is_hidden).length,
                execution_time_ms: Date.now() - startTime,
                compilation_error: compileRes.stderr || 'Compilation failed',
                details: []
            };
        }
        return await this.runCompiledBinary(binPath, testCases, runDir, startTime);
    }
    async evaluateCpp(runDir, code, testCases, startTime) {
        const srcPath = path_1.default.join(runDir, 'solution.cpp');
        const binName = process.platform === 'win32' ? 'solution.exe' : 'solution';
        const binPath = path_1.default.join(runDir, binName);
        fs_1.default.writeFileSync(srcPath, code, 'utf-8');
        // Compile with g++
        const compileRes = await this.runProcess('g++', ['-std=c++17', '-O2', 'solution.cpp', '-o', binName], '', runDir);
        if (compileRes.exitCode !== 0) {
            return {
                status: 'COMPILE_ERROR',
                passed_test_cases: 0,
                total_test_cases: testCases.filter(t => !t.is_hidden).length,
                hidden_passed: 0,
                hidden_total: testCases.filter(t => t.is_hidden).length,
                execution_time_ms: Date.now() - startTime,
                compilation_error: compileRes.stderr || 'C++ compilation failed',
                details: []
            };
        }
        return await this.runCompiledBinary(binPath, testCases, runDir, startTime);
    }
    async evaluateJava(runDir, code, testCases, startTime) {
        const srcPath = path_1.default.join(runDir, 'Main.java');
        fs_1.default.writeFileSync(srcPath, code, 'utf-8');
        // Attempt to compile with javac
        const compileRes = await this.runProcess('javac', ['Main.java'], '', runDir);
        if (compileRes.exitCode !== 0) {
            return {
                status: 'COMPILE_ERROR',
                passed_test_cases: 0,
                total_test_cases: testCases.filter(t => !t.is_hidden).length,
                hidden_passed: 0,
                hidden_total: testCases.filter(t => t.is_hidden).length,
                execution_time_ms: Date.now() - startTime,
                compilation_error: compileRes.stderr || 'Java compiler (javac) not found or compilation error.',
                details: []
            };
        }
        const details = [];
        let passedVisible = 0;
        let totalVisible = 0;
        let passedHidden = 0;
        let totalHidden = 0;
        for (const tc of testCases) {
            if (tc.is_hidden)
                totalHidden++;
            else
                totalVisible++;
            const res = await this.runProcess('java', ['-cp', '.', 'Main'], tc.input, runDir);
            if (res.timedOut) {
                return {
                    status: 'TIME_LIMIT_EXCEEDED',
                    passed_test_cases: passedVisible,
                    total_test_cases: totalVisible,
                    hidden_passed: passedHidden,
                    hidden_total: totalHidden,
                    execution_time_ms: Date.now() - startTime,
                    runtime_error: 'Execution timed out',
                    details
                };
            }
            const actualTrimmed = res.stdout.trim().replace(/\r\n/g, '\n');
            const expectedTrimmed = tc.expected_output.trim().replace(/\r\n/g, '\n');
            const isPassed = actualTrimmed === expectedTrimmed;
            if (isPassed) {
                if (tc.is_hidden)
                    passedHidden++;
                else
                    passedVisible++;
            }
            details.push({
                input: tc.input,
                expected: tc.expected_output,
                actual: actualTrimmed,
                passed: isPassed,
                is_hidden: !!tc.is_hidden
            });
        }
        const allPassed = passedVisible === totalVisible && passedHidden === totalHidden;
        return {
            status: allPassed ? 'PASSED' : 'FAILED',
            passed_test_cases: passedVisible,
            total_test_cases: totalVisible,
            hidden_passed: passedHidden,
            hidden_total: totalHidden,
            execution_time_ms: Date.now() - startTime,
            details
        };
    }
    async runCompiledBinary(binPath, testCases, runDir, startTime) {
        const details = [];
        let passedVisible = 0;
        let totalVisible = 0;
        let passedHidden = 0;
        let totalHidden = 0;
        const binName = process.platform === 'win32' ? '.\\solution.exe' : './solution';
        for (const tc of testCases) {
            if (tc.is_hidden)
                totalHidden++;
            else
                totalVisible++;
            const res = await this.runProcess(binName, [], tc.input, runDir);
            if (res.timedOut) {
                return {
                    status: 'TIME_LIMIT_EXCEEDED',
                    passed_test_cases: passedVisible,
                    total_test_cases: totalVisible,
                    hidden_passed: passedHidden,
                    hidden_total: totalHidden,
                    execution_time_ms: Date.now() - startTime,
                    runtime_error: 'Process timed out (> 5000ms)',
                    details
                };
            }
            if (res.exitCode !== 0) {
                return {
                    status: 'RUNTIME_ERROR',
                    passed_test_cases: passedVisible,
                    total_test_cases: totalVisible,
                    hidden_passed: passedHidden,
                    hidden_total: totalHidden,
                    execution_time_ms: Date.now() - startTime,
                    runtime_error: res.stderr || 'Segmentation fault or abnormal exit',
                    details
                };
            }
            const actualTrimmed = res.stdout.trim().replace(/\r\n/g, '\n');
            const expectedTrimmed = tc.expected_output.trim().replace(/\r\n/g, '\n');
            const isPassed = actualTrimmed === expectedTrimmed;
            if (isPassed) {
                if (tc.is_hidden)
                    passedHidden++;
                else
                    passedVisible++;
            }
            details.push({
                input: tc.input,
                expected: tc.expected_output,
                actual: isPassed ? actualTrimmed : actualTrimmed.substring(0, 300),
                passed: isPassed,
                is_hidden: !!tc.is_hidden
            });
        }
        const allPassed = passedVisible === totalVisible && passedHidden === totalHidden;
        return {
            status: allPassed ? 'PASSED' : 'FAILED',
            passed_test_cases: passedVisible,
            total_test_cases: totalVisible,
            hidden_passed: passedHidden,
            hidden_total: totalHidden,
            execution_time_ms: Date.now() - startTime,
            details
        };
    }
    runProcess(command, args, input, cwd) {
        return new Promise(resolve => {
            let stdout = '';
            let stderr = '';
            let timedOut = false;
            const safeArgs = args.map(a => (a.includes(' ') && !a.startsWith('"')) ? `"${a}"` : a);
            const safeCommand = (command.includes(' ') && !command.startsWith('"')) ? `"${command}"` : command;
            const proc = (0, child_process_1.spawn)(safeCommand, safeArgs, {
                cwd,
                windowsHide: true,
                shell: true,
                stdio: ['pipe', 'pipe', 'pipe']
            });
            const timer = setTimeout(() => {
                timedOut = true;
                try {
                    proc.kill();
                }
                catch (e) {
                    // ignore
                }
            }, this.timeoutMs);
            if (input && proc.stdin) {
                proc.stdin.write(input);
                proc.stdin.end();
            }
            else if (proc.stdin) {
                proc.stdin.end();
            }
            const MAX_OUTPUT_BYTES = 50 * 1024; // 50KB safety cap (Section 93)
            proc.stdout?.on('data', data => {
                if (stdout.length < MAX_OUTPUT_BYTES) {
                    stdout += data.toString();
                    if (stdout.length >= MAX_OUTPUT_BYTES) {
                        stdout += '\n[OUTPUT TRUNCATED: Exceeded 50KB limit]';
                        try {
                            proc.kill();
                        }
                        catch (e) { }
                    }
                }
            });
            proc.stderr?.on('data', data => {
                if (stderr.length < MAX_OUTPUT_BYTES) {
                    stderr += data.toString();
                    if (stderr.length >= MAX_OUTPUT_BYTES) {
                        stderr += '\n[STDERR TRUNCATED: Exceeded 50KB limit]';
                    }
                }
            });
            proc.on('error', err => {
                clearTimeout(timer);
                resolve({ stdout, stderr: err.message, exitCode: 1, timedOut: false });
            });
            proc.on('close', code => {
                clearTimeout(timer);
                resolve({ stdout, stderr, exitCode: code, timedOut });
            });
            proc.on('error', err => {
                clearTimeout(timer);
                resolve({ stdout, stderr: err.message, exitCode: 1, timedOut: false });
            });
        });
    }
    /**
     * Section 58: Error Classification System
     */
    classifyError(status, stderr, hasWrongOutput) {
        const errLower = (stderr || '').toLowerCase();
        if (status === 'TIME_LIMIT_EXCEEDED') {
            return {
                category: 'TIME_LIMIT',
                diagnosis: 'Execution exceeded 5000ms limit. Check for infinite loops or missing base cases in recursive calls.',
                reviewConcept: 'Loop termination conditions and algorithmic efficiency'
            };
        }
        if (status === 'COMPILE_ERROR' ||
            errLower.includes('syntaxerror') ||
            errLower.includes('parse error') ||
            errLower.includes('expected') ||
            errLower.includes('error:')) {
            if (errLower.includes('syntaxerror') || errLower.includes('invalid syntax')) {
                return {
                    category: 'SYNTAX_ERROR',
                    diagnosis: 'Language syntax error detected. Check colons (:), unclosed brackets, or indentation.',
                    reviewConcept: 'Syntax rules and language grammar'
                };
            }
            return {
                category: 'COMPILATION_ERROR',
                diagnosis: 'Source code failed to compile into executable binary. Check function declarations and header includes.',
                reviewConcept: 'Declarations, header files, and types'
            };
        }
        if (errLower.includes('typeerror') ||
            errLower.includes('incompatible type') ||
            errLower.includes('cannot convert')) {
            return {
                category: 'TYPE_ERROR',
                diagnosis: 'Type mismatch detected. You may be passing incorrect parameter types or performing unsupported operations.',
                reviewConcept: 'Data types, type casting, and function signatures'
            };
        }
        if (errLower.includes('indexerror') ||
            errLower.includes('out of bounds') ||
            errLower.includes('segmentation fault') ||
            errLower.includes('sigsegv')) {
            return {
                category: 'RUNTIME_ERROR',
                diagnosis: 'Index out-of-range or invalid memory access. Check that indices are strictly between 0 and size - 1.',
                reviewConcept: 'Array indexing and boundary validation'
            };
        }
        if (hasWrongOutput || status === 'FAILED') {
            return {
                category: 'WRONG_OUTPUT',
                diagnosis: 'Code executed cleanly but stdout output did not match test case requirements. Check edge cases and spacing.',
                reviewConcept: 'Output formatting and conditional edge cases'
            };
        }
        return {
            category: 'RUNTIME_ERROR',
            diagnosis: 'Runtime exception encountered during execution.',
            reviewConcept: 'Exception handling and input parsing'
        };
    }
    decorateResult(result) {
        if (result.status === 'PASSED')
            return result;
        const stderr = result.compilation_error || result.runtime_error || '';
        const classification = this.classifyError(result.status, stderr, result.status === 'FAILED');
        result.error_category = classification.category;
        result.error_diagnosis = classification.diagnosis;
        result.recommended_review_concept = classification.reviewConcept;
        return result;
    }
}
exports.CodeSandboxService = CodeSandboxService;
exports.codeSandbox = new CodeSandboxService();
