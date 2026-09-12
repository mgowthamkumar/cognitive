import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useCognitive } from '../context/CognitiveContext';
import { api } from '../services/api';
import { telemetry } from '../services/telemetry';
import {
  Terminal,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';

interface CodingStudioProps {
  topicId?: string;
  onOpenAiDrawer: () => void;
  onBackToLesson: () => void;
}

export const CodingStudioPage: React.FC<CodingStudioProps> = ({
  topicId,
  onOpenAiDrawer,
  onBackToLesson
}) => {
  const { preferences } = useAuth();
  const { updateFromFeedback, currentLoad } = useCognitive();

  const [challenge, setChallenge] = useState<any | null>(null);
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [execResult, setExecResult] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'tests' | 'output' | 'custom'>('tests');
  const [codingStartTime, setCodingStartTime] = useState<number>(Date.now());
  const [keystrokes, setKeystrokes] = useState<number>(0);
  const [pasteEvents, setPasteEvents] = useState<number>(0);
  const [isPassed, setIsPassed] = useState<boolean>(false);

  const activeTopic = topicId || 'top-py-loops';

  useEffect(() => {
    const loadChallenge = async () => {
      setLoading(true);
      try {
        const data = await api.getTopicCodingChallenge(activeTopic);
        setChallenge(data);

        // Pre-fill starter code
        const langKey = preferences.selected_language;
        const starter = (data.starter_code && data.starter_code[langKey]) ||
          (data.starter_code && Object.values(data.starter_code)[0]) ||
          '// Write your solution here\n';
        setCode(starter as string);
        setCodingStartTime(Date.now());
        setKeystrokes(0);
        setPasteEvents(0);
        setExecResult(null);
        setIsPassed(false);
      } catch (err) {
        console.error('Failed to load coding challenge:', err);
      } finally {
        setLoading(false);
      }
    };

    loadChallenge();
  }, [activeTopic, preferences.selected_language]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
    setKeystrokes(prev => prev + 1);
    telemetry.recordKeystroke();
  };

  const handleEditorPaste = () => {
    setPasteEvents(prev => prev + 1);
    telemetry.recordPaste();
  };

  const handleRunCustom = async () => {
    if (running || !code.trim()) return;
    setRunning(true);
    setActiveTab('output');

    try {
      const res = await api.runCode(code, preferences.selected_language, customInput);
      setExecResult(res);
    } catch (err: any) {
      setExecResult({
        status: 'RUNTIME_ERROR',
        runtime_error: err.message
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitSolution = async () => {
    if (running || !code.trim()) return;
    setRunning(true);
    setActiveTab('tests');

    const durationSeconds = Math.max(1, Math.round((Date.now() - codingStartTime) / 1000));

    try {
      const res = await api.submitCode({
        topicId: activeTopic,
        code,
        language: preferences.selected_language,
        codingTimeSeconds: durationSeconds,
        keystrokes,
        pasteEvents
      });

      setExecResult(res.execution);
      setIsPassed(res.is_passed);

      if (res.adaptive_feedback) {
        updateFromFeedback(res.adaptive_feedback);
      }

      if (res.is_passed) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    } catch (err: any) {
      setExecResult({
        status: 'RUNTIME_ERROR',
        runtime_error: err.message
      });
    } finally {
      setRunning(false);
    }
  };

  const getMonacoLanguage = (lang: string) => {
    switch (lang.toLowerCase()) {
      case 'c':
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      default:
        return 'python';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-sm">Configuring sandbox compiler environment...</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400">
        <p>No coding challenge found for this topic.</p>
        <button
          onClick={onBackToLesson}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
        >
          Return to Lesson
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-5rem)] flex flex-col animate-fade-in">
      {/* Studio Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToLesson}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>{challenge.title}</span>
            </h1>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] uppercase font-mono text-cyan-400 font-bold border border-slate-700">
            {challenge.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAiDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Progressive Hints</span>
          </button>

          <button
            onClick={handleRunCustom}
            disabled={running}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Test Run</span>
          </button>

          <button
            onClick={handleSubmitSolution}
            disabled={running}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{running ? 'Executing in Sandbox...' : 'Submit Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left Column: Problem Statement & Specs (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 overflow-y-auto space-y-5 text-xs">
          <div>
            <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold mb-2">
              Problem Description
            </h2>
            <p className="text-slate-200 leading-relaxed text-xs sm:text-sm">
              {challenge.problem_statement}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-300 mb-1">Input Format</h3>
            <p className="text-slate-400">{challenge.input_format}</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-300 mb-1">Output Format</h3>
            <p className="text-slate-400">{challenge.output_format}</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-300 mb-1">Constraints</h3>
            <pre className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 text-cyan-300 font-mono text-[11px]">
              {challenge.constraints}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h3 className="font-bold text-slate-300 mb-1">Sample Input</h3>
              <pre className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 font-mono text-[11px]">
                {challenge.sample_input}
              </pre>
            </div>
            <div>
              <h3 className="font-bold text-slate-300 mb-1">Sample Output</h3>
              <pre className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-emerald-300 font-mono text-[11px]">
                {challenge.sample_output}
              </pre>
            </div>
          </div>

          {/* Telemetry Indicator */}
          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Keystrokes: {keystrokes}</span>
            <span>Paste Count: {pasteEvents}</span>
            <span>Sandbox Time Guard: 5000ms</span>
          </div>
        </div>

        {/* Right Column: Monaco Code Editor + Output Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          {/* Editor Header */}
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-cyan-400 font-semibold">
              solution.{preferences.selected_language === 'python' ? 'py' : preferences.selected_language === 'c' ? 'c' : preferences.selected_language === 'cpp' ? 'cpp' : 'java'}
            </span>
            <span className="text-slate-400 text-[11px]">
              Sandboxed Native Runner
            </span>
          </div>

          {/* Monaco Editor Container */}
          <div
            className="flex-1 min-h-[300px]"
            onPaste={handleEditorPaste}
          >
            <Editor
              height="100%"
              language={getMonacoLanguage(preferences.selected_language)}
              value={code}
              theme="vs-dark"
              onChange={handleEditorChange}
              options={{
                fontSize: 13,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                roundedSelection: true,
                padding: { top: 12, bottom: 12 }
              }}
            />
          </div>

          {/* Console / Test Results Drawer */}
          <div className="h-56 border-t border-slate-800 bg-slate-900/90 flex flex-col">
            {/* Tabs */}
            <div className="flex items-center border-b border-slate-800 px-3 bg-slate-950/60 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('tests')}
                className={`px-3 py-2 border-b-2 transition-colors ${
                  activeTab === 'tests'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Test Cases ({execResult ? `${execResult.passed_test_cases}/${execResult.total_test_cases}` : 'Ready'})
              </button>
              <button
                onClick={() => setActiveTab('output')}
                className={`px-3 py-2 border-b-2 transition-colors ${
                  activeTab === 'output'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Compiler / Runtime Log
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-3 py-2 border-b-2 transition-colors ${
                  activeTab === 'custom'
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Custom Stdin
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
              {activeTab === 'tests' && (
                <div>
                  {!execResult ? (
                    <p className="text-slate-500 italic">Click 'Submit Code' to run against public and hidden test cases.</p>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span className={`font-bold ${execResult.status === 'PASSED' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          Status: {execResult.status}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          Execution Time: {execResult.execution_time_ms}ms • Hidden Tests Passed: {execResult.hidden_passed}/{execResult.hidden_total}
                        </span>
                      </div>

                      {execResult.details?.map((d: any, idx: number) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border text-[11px] ${
                            d.passed
                              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                              : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold">
                              {d.is_hidden ? `Hidden Test Case ${idx + 1}` : `Test Case ${idx + 1}`}
                            </span>
                            <span>{d.passed ? 'PASSED ✓' : 'FAILED ✗'}</span>
                          </div>
                          {!d.is_hidden && (
                            <div className="grid grid-cols-3 gap-2 mt-1 text-[10px]">
                              <div>Input: <span className="text-slate-400">{d.input}</span></div>
                              <div>Expected: <span className="text-emerald-400">{d.expected}</span></div>
                              <div>Actual: <span className={d.passed ? 'text-emerald-400' : 'text-rose-400'}>{d.actual}</span></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'output' && (
                <div>
                  {execResult?.compilation_error ? (
                    <pre className="text-rose-400 whitespace-pre-wrap">
                      {execResult.compilation_error}
                    </pre>
                  ) : execResult?.runtime_error ? (
                    <pre className="text-rose-400 whitespace-pre-wrap">
                      {execResult.runtime_error}
                    </pre>
                  ) : execResult ? (
                    <pre className="text-emerald-400 whitespace-pre-wrap">
                      [Execution successful with exit code 0]
                    </pre>
                  ) : (
                    <p className="text-slate-500 italic">No compiler outputs yet.</p>
                  )}
                </div>
              )}

              {activeTab === 'custom' && (
                <div className="h-full flex flex-col">
                  <textarea
                    value={customInput}
                    onChange={e => setCustomInput(e.target.value)}
                    placeholder="Enter standard input data here..."
                    className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
