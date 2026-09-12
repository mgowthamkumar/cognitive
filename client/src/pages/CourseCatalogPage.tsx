import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCognitive } from '../context/CognitiveContext';
import { api } from '../services/api';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Award
} from 'lucide-react';

interface CourseCatalogProps {
  onSelectTopic: (topicId: string) => void;
}

export const CourseCatalogPage: React.FC<CourseCatalogProps> = ({ onSelectTopic }) => {
  const { preferences, user } = useAuth();
  const { currentLoad, recommendedAction } = useCognitive();
  const [courses, setCourses] = useState<any[]>([]);
  const [activeCourseStructure, setActiveCourseStructure] = useState<any | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurriculum = async () => {
      setLoading(true);
      try {
        const list = await api.getCourses(preferences.selected_language, preferences.current_level);
        setCourses(list);

        if (list && list.length > 0) {
          const structure = await api.getCourseStructure(list[0].id);
          setActiveCourseStructure(structure);
        }

        if (user) {
          const me = await api.getMe();
          const progMap: Record<string, boolean> = {};
          if (me.progress) {
            me.progress.forEach((p: any) => {
              if (p.completed) progMap[p.topic_id] = true;
            });
          }
          setUserProgress(progMap);
        }
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCurriculum();
  }, [preferences.selected_language, preferences.current_level, user]);

  const langNames: Record<string, string> = {
    python: 'Python',
    c: 'C Programming',
    cpp: 'C++',
    java: 'Java'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 p-8 mb-10 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Driven Adaptive Curricula</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Master{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {langNames[preferences.selected_language] || 'Programming'}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Every topic dynamically measures your cognitive load in real-time. Whether you need
            simplified analogies or accelerated optimization challenges, your learning path adapts
            automatically.
          </p>

          <div className="flex items-center gap-4 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-400" />
              Level: <strong className="text-white capitalize">{preferences.current_level}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Engine Mode: <strong className="text-white">Active Cognitive Feedback</strong>
            </span>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
          <p className="text-sm">Assembling adaptive curriculum...</p>
        </div>
      ) : !activeCourseStructure ? (
        <div className="text-center py-16 text-slate-400">
          <p>No courses found for this language and level combination.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {activeCourseStructure.course.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {activeCourseStructure.course.description}
              </p>
            </div>
          </div>

          {/* Module & Topic Grid */}
          <div className="space-y-6">
            {activeCourseStructure.modules.map((module: any, mIdx: number) => (
              <div
                key={module.id}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                      Module {mIdx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-400">{module.description}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] text-slate-300 font-medium">
                    {module.topics.length} Lessons
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {module.topics.map((topic: any, tIdx: number) => {
                    const isCompleted = !!userProgress[topic.id];
                    const isFirst = mIdx === 0 && tIdx === 0;
                    const isRecommended =
                      recommendedAction === 'REVISE' || recommendedAction === 'RECOMMEND_PREREQUISITE'
                        ? isFirst
                        : isFirst || isCompleted;

                    return (
                      <div
                        key={topic.id}
                        onClick={() => onSelectTopic(topic.id)}
                        className={`group relative rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                          isCompleted
                            ? 'bg-slate-900/80 border-emerald-500/40 hover:border-emerald-400'
                            : 'bg-slate-950/60 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/70 shadow-lg'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono text-slate-500">
                              Topic {mIdx + 1}.{tIdx + 1}
                            </span>
                            {isCompleted ? (
                              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Mastered</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                <span>Start Lesson</span>
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {topic.title}
                          </h4>

                          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {topic.learning_objective}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                            <span>Lesson & MCQs</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>Coding Challenge</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
