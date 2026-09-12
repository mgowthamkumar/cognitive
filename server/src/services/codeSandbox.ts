import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { TestCase } from '../types.js';

export interface ExecutionResult {
  status: 'PASSED' | 'FAILED' | 'COMPILE_ERROR' | 'RUNTIME_ERROR' | 'TIME_LIMIT_EXCEEDED';
  passed_test_cases: number;
  total_test_cases: number;
  hidden_passed: number;
  hidden_total: number;
  execution_time_ms: number;
  compilation_error?: string;
  runtime_error?: string;
  details: {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    is_hidden: boolean;
  }[];
}

export class CodeSandboxService {
  private sandboxBaseDir: string;
  private timeoutMs = 5000;

  constructor() {
    this.sandboxBaseDir = path.resolve(process.cwd(), 'scratch_sandbox');
    if (!fs.existsSync(this.sandboxBaseDir)) {
      fs.mkdirSync(this.sandboxBaseDir, { recursive: true });
    }
  }

  public async evaluateCode(
    code: string,
    language: string,
    testCases: TestCase[]
  ): Promise<ExecutionResult> {
    const runId = `exec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const runDir = path.join(this.sandboxBaseDir, runId);
    fs.mkdirSync(runDir, { recursive: true });

    const startTime = Date.now();
    try {
      if (language === 'python' || language === 'py') {
        return await this.evaluatePython(runDir, code, testCases, startTime);
      } else if (language === 'c') {
        return await this.evaluateC(runDir, code, testCases, startTime);
      } else if (language === 'cpp' || language === 'c++') {
        return await this.evaluateCpp(runDir, code, testCases, startTime);
      } else if (language === 'java') {
        return await this.evaluateJava(runDir, code, testCases, startTime);
      } else {
        throw new Error(`Unsupported programming language: ${language}`);
      }
    } finally {
      // Clean up sandbox directory asynchronously
      try {
        fs.rmSync(runDir, { recursive: true, force: true });
      } catch (e) {
        // ignore clean up error
      }
    }
  }

  private async evaluatePython(
    runDir: string,
    code: string,
    testCases: TestCase[],
    startTime: number
  ): Promise<ExecutionResult> {
    const scriptPath = path.join(runDir, 'solution.py');
    fs.writeFileSync(scriptPath, code, 'utf-8');

    const details: ExecutionResult['details'] = [];
    let passedVisible = 0;
    let totalVisible = 0;
    let passedHidden = 0;
    let totalHidden = 0;

    for (const tc of testCases) {
      if (tc.is_hidden) totalHidden++;
      else totalVisible++;

      const res = await this.runProcess('python', [scriptPath], tc.input, runDir);
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
        if (tc.is_hidden) passedHidden++;
        else passedVisible++;
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

  private async evaluateC(
    runDir: string,
    code: string,
    testCases: TestCase[],
    startTime: number
  ): Promise<ExecutionResult> {
    const srcPath = path.join(runDir, 'solution.c');
    const binPath = path.join(runDir, 'solution.exe');
    fs.writeFileSync(srcPath, code, 'utf-8');

    // Compile with gcc / g++
    const compileRes = await this.runProcess('g++', ['-O2', srcPath, '-o', binPath], '', runDir);
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

  private async evaluateCpp(
    runDir: string,
    code: string,
    testCases: TestCase[],
    startTime: number
  ): Promise<ExecutionResult> {
    const srcPath = path.join(runDir, 'solution.cpp');
    const binPath = path.join(runDir, 'solution.exe');
    fs.writeFileSync(srcPath, code, 'utf-8');

    // Compile with g++
    const compileRes = await this.runProcess('g++', ['-std=c++17', '-O2', srcPath, '-o', binPath], '', runDir);
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

  private async evaluateJava(
    runDir: string,
    code: string,
    testCases: TestCase[],
    startTime: number
  ): Promise<ExecutionResult> {
    const srcPath = path.join(runDir, 'Main.java');
    fs.writeFileSync(srcPath, code, 'utf-8');

    // Attempt to compile with javac
    const compileRes = await this.runProcess('javac', [srcPath], '', runDir);
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

    const details: ExecutionResult['details'] = [];
    let passedVisible = 0;
    let totalVisible = 0;
    let passedHidden = 0;
    let totalHidden = 0;

    for (const tc of testCases) {
      if (tc.is_hidden) totalHidden++;
      else totalVisible++;

      const res = await this.runProcess('java', ['-cp', runDir, 'Main'], tc.input, runDir);
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
        if (tc.is_hidden) passedHidden++;
        else passedVisible++;
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

  private async runCompiledBinary(
    binPath: string,
    testCases: TestCase[],
    runDir: string,
    startTime: number
  ): Promise<ExecutionResult> {
    const details: ExecutionResult['details'] = [];
    let passedVisible = 0;
    let totalVisible = 0;
    let passedHidden = 0;
    let totalHidden = 0;

    for (const tc of testCases) {
      if (tc.is_hidden) totalHidden++;
      else totalVisible++;

      const res = await this.runProcess(binPath, [], tc.input, runDir);
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
        if (tc.is_hidden) passedHidden++;
        else passedVisible++;
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

  private runProcess(
    command: string,
    args: string[],
    input: string,
    cwd: string
  ): Promise<{ stdout: string; stderr: string; exitCode: number | null; timedOut: boolean }> {
    return new Promise(resolve => {
      let stdout = '';
      let stderr = '';
      let timedOut = false;

      const proc = spawn(command, args, {
        cwd,
        windowsHide: true,
        shell: true,
        stdio: ['pipe', 'pipe', 'pipe']
      });

      const timer = setTimeout(() => {
        timedOut = true;
        try {
          proc.kill();
        } catch (e) {
          // ignore
        }
      }, this.timeoutMs);

      if (input && proc.stdin) {
        proc.stdin.write(input);
        proc.stdin.end();
      } else if (proc.stdin) {
        proc.stdin.end();
      }

      proc.stdout?.on('data', data => {
        stdout += data.toString();
      });

      proc.stderr?.on('data', data => {
        stderr += data.toString();
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
}

export const codeSandbox = new CodeSandboxService();
