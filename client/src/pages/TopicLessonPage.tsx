import React, { useEffect, useState, useRef } from 'react';
import { useCognitive } from '../context/CognitiveContext';
import { CognitiveLoadBanner } from '../components/CognitiveLoadBanner';
import { api } from '../services/api';
import { telemetry } from '../services/telemetry';
import {
  BookOpen,
  Code,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Terminal
} from 'lucide-react';

interface TopicLessonPageProps {
  topicId: string;
  onStartQuiz: () => void;
  onOpenCoding: () => void;
  onBackToCatalog: () => void;
}

export const TopicLessonPage: React.FC<TopicLessonPageProps> = ({
  topicId,
  onStartQuiz,
  onOpenCoding,
  onBackToCatalog
}) => {
  const { contentMode, setActiveTopicId } = useCognitive();
  const [topic, setTopic] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTopicId(topicId);
    telemetry.initTopicSession(topicId);

    const loadTopic = async () => {
      setLoading(true);
      try {
        const data = await api.getTopicDetail(topicId);
        setTopic(data);
      } catch (err) {
        console.error('Failed to load topic:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTopic();

    return () => {
      telemetry.flushSession();
    };
  }, [topicId, setActiveTopicId]);

  // Scroll Telemetry Listener
  useEffect(() => {
    const handleScroll = () => {
      telemetry.recordScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-sm">Synthesizing personalized topic lesson...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-slate-400">
        <p>Topic not found.</p>
        <button
          onClick={onBackToCatalog}
          className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
        >
          Back to Curriculum
        </button>
      </div>
    );
  }

  // Dynamic explanation selection based on predicted Cognitive Load Mode
  const getAdaptiveExplanation = () => {
    if (contentMode === 'CONCISE') {
      return topic.content_low || topic.content_standard;
    } else if (contentMode === 'SIMPLIFIED') {
      return topic.content_high || topic.content_standard;
    }
    return topic.content_medium || topic.content_standard;
  };

  return (
    <div ref={containerRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
        <button onClick={onBackToCatalog} className="hover:text-cyan-400 transition-colors">
          Curriculum
        </button>
        <span>/</span>
        <span className="text-slate-200 font-semibold">{topic.title}</span>
      </div>

      {/* Real-time Cognitive State Banner */}
      <CognitiveLoadBanner />

      {/* Topic Header Card */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase">
            Lesson {topic.order_index}
          </span>
          <span className="text-xs text-slate-400">• Comprehensive Interactive Module</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {topic.title}
        </h1>

        {/* 1. Learning Objective */}
        <div className="mt-4 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300 block mb-0.5">Learning Objective:</strong>
            <p className="leading-relaxed text-slate-300">{topic.learning_objective}</p>
          </div>
        </div>
      </div>

      {/* 2. Adaptive Explanation */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Conceptual Explanation</span>
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">
            Calibrated for: <strong className="text-cyan-300">{contentMode}</strong> Mode
          </span>
        </div>
        <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
          {getAdaptiveExplanation()}
        </div>
      </section>

      {/* 3. Syntax Reference */}
      {topic.syntax && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-amber-400" />
              <span>Standard Syntax</span>
            </h3>
            <button
              onClick={() => handleCopyCode(topic.syntax)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
            <code>{topic.syntax}</code>
          </pre>
        </section>
      )}

      {/* 4. Examples */}
      {topic.examples && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Working Code Examples</span>
            </h3>
            <button
              onClick={() => handleCopyCode(topic.examples)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
            <code>{topic.examples}</code>
          </pre>
        </section>
      )}

      {/* 5. Common Mistakes */}
      {topic.common_mistakes && (
        <section className="rounded-3xl border border-rose-950/40 bg-rose-950/10 p-6 mb-8 border-rose-500/20">
          <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Common Traps and Compiler Mistakes</span>
          </h3>
          <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
            {topic.common_mistakes}
          </div>
        </section>
      )}

      {/* 6. Practice Prompt */}
      {topic.practice_prompt && (
        <section className="rounded-3xl border border-cyan-900/40 bg-cyan-950/20 p-6 mb-10">
          <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Recommended Mental Practice</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topic.practice_prompt}
          </p>
        </section>
      )}

      {/* Action Footer: Take Assessment & Launch Coding Challenge */}
      <div className="p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to validate your understanding?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Take the 3-question assessment to calibrate your cognitive model and unlock next steps.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onStartQuiz}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Take MCQ Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCoding}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Coding Challenge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
