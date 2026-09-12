import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CognitiveProvider, useCognitive } from './context/CognitiveContext';
import { Navbar } from './components/Navbar';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { AuthModal } from './components/AuthModal';
import { CourseCatalogPage } from './pages/CourseCatalogPage';
import { TopicLessonPage } from './pages/TopicLessonPage';
import { QuizStationPage } from './pages/QuizStationPage';
import { CodingStudioPage } from './pages/CodingStudioPage';
import { LearnerDashboardPage } from './pages/LearnerDashboardPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('catalog');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-py-loops');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentView('lesson');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        openAuthModal={() => setAuthModalOpen(true)}
        openAiDrawer={() => setAiDrawerOpen(true)}
      />

      <main className="flex-1">
        {currentView === 'catalog' && (
          <CourseCatalogPage onSelectTopic={handleSelectTopic} />
        )}

        {currentView === 'lesson' && (
          <TopicLessonPage
            topicId={selectedTopicId}
            onStartQuiz={() => setCurrentView('quiz')}
            onOpenCoding={() => setCurrentView('coding')}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'quiz' && (
          <QuizStationPage
            topicId={selectedTopicId}
            onBackToLesson={() => setCurrentView('lesson')}
            onGoToCoding={() => setCurrentView('coding')}
          />
        )}

        {currentView === 'coding' && (
          <CodingStudioPage
            topicId={selectedTopicId}
            onOpenAiDrawer={() => setAiDrawerOpen(true)}
            onBackToLesson={() => setCurrentView('lesson')}
          />
        )}

        {currentView === 'dashboard' && (
          <LearnerDashboardPage onSelectTopic={handleSelectTopic} />
        )}

        {currentView === 'admin' && (
          <AdminAnalyticsPage />
        )}
      </main>

      {/* Floating AI Copilot Trigger for Mobile/Tablet */}
      <div className="fixed bottom-5 right-5 z-30 lg:hidden">
        <button
          onClick={() => setAiDrawerOpen(true)}
          className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-purple-500/30 active:scale-95 transition-transform"
        >
          ✨
        </button>
      </div>

      {/* In-Course AI Learning Copilot Drawer */}
      <AiAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        currentTopicTitle={selectedTopicId}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Platform Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p>Cognitive-Load-Aware Adaptive Learning Engine • Built with AI/ML, RAG, and Safe Sandbox Execution</p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CognitiveProvider>
        <AppContent />
      </CognitiveProvider>
    </AuthProvider>
  );
};

export default App;
