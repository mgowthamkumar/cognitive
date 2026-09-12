# DEVELOPMENT AUDIT: Cognitive-Load-Aware Adaptive Learning Platform

> **Audit Date**: 2026-09-12  
> **Target Version**: 2.0 (Intelligent Adaptive EdTech System)  
> **Status**: Completed Inspection & Gap Analysis

---

## 1. Executive Summary & Codebase Inspection

In accordance with **Section 41 (Development Instruction)**, a comprehensive audit of the existing codebase was conducted across all subsystems:

1. **Frontend Framework & Structure**:
   - **Stack**: React 18, TypeScript, Tailwind CSS, Vite, Monaco Editor (`@monaco-editor/react`), Lucide React icons, Recharts, Canvas Confetti.
   - **Structure**:
     - `client/src/App.tsx`: State-based single page router controlling views (`catalog`, `lesson`, `quiz`, `coding`, `dashboard`, `admin`).
     - `client/src/components/`: `Navbar`, `AiAssistantDrawer`, `AuthModal`, `CognitiveLoadBanner`.
     - `client/src/context/`: `AuthContext.tsx`, `CognitiveContext.tsx`.
     - `client/src/pages/`: `CourseCatalogPage`, `TopicLessonPage`, `QuizStationPage`, `CodingStudioPage`, `LearnerDashboardPage`, `AdminAnalyticsPage`.
     - `client/src/services/api.ts`: Central Axios-based client API layer.
2. **Backend Architecture**:
   - **Stack**: Node.js, Express, TypeScript, `tsx` runner with watch mode, JWT auth, bcryptjs.
   - **Structure**:
     - `server/src/index.ts`: Express application setup with CORS, JSON parsing, logging, and router mounting.
     - `server/src/routes/apiRoutes.ts`: Modular REST endpoints for auth, courses, topics, quizzes, code execution, telemetry, adaptive evaluation, AI copilot, and admin analytics.
     - `server/src/controllers/`: 8 controller files handling domain logic.
     - `server/src/services/codeSandbox.ts`: Isolated subprocess code execution engine with 5000ms timeout guard, Python execution, and MinGW `g++` compilation.
     - `server/src/services/adaptiveEngine.ts`: Central coordinator calculating telemetry features and querying ML microservice.
3. **Database Architecture**:
   - **Engine**: Resilient dual storage engine (`server/src/db/database.ts`). Supports `better-sqlite3` when native drivers are available with an automatic fallback to atomic JSON persistence (`server/data/platform_store.json`).
   - **Schema**: Tables for `users`, `user_preferences`, `courses`, `modules`, `topics`, `mcq_questions`, `coding_questions`, `user_progress`, `behavior_events`, `cognitive_predictions`, `recommendations`, `quiz_attempts`, `coding_attempts`.
4. **Existing ML Implementation**:
   - **Microservice**: Python FastAPI (`ml_service/app/main.py`) on port `8000`.
   - **Features**: 14 behavioral telemetry features in `features.py` (scroll time, dwell time, revisits, MCQ accuracy, coding friction, error count, hints, unusual fast completion signal).
   - **Models**: 4 supervised classifiers evaluated in `train_model.py` (Logistic Regression, Decision Tree, Random Forest, Gradient Boosting). Active champion: Random Forest (100% test & 5-fold CV F1).
   - **Real-Time Inference**: `predict.py` with feature importance contribution explanations and rapid-completion anomaly flags.
5. **Existing RAG Implementation**:
   - **Vector Store**: TF-IDF semantic vector store with metadata filtering (`ml_service/app/rag/vector_store.py`).
   - **Knowledge Base**: Structured documentation across `c/`, `cpp/`, `java/`, and `python/`.
   - **Cognitive Conditioning**: `llm_service.py` conditioning prompts by LOW (concise/fast-track), MEDIUM (balanced principles), and HIGH (analogies/simplification).
   - **Progressive Hints**: 4 tiers (conceptual clue, algorithmic strategy, pseudocode blueprint, code skeleton).
6. **Authentication Implementation**:
   - JWT tokens with bcrypt salted password hashing (`authController.ts`, `auth.ts` middleware).
   - User profile endpoints and persistent preferences.
7. **Existing Course Content**:
   - Multi-language catalog: Python, C, C++, and Java across Beginner, Intermediate, and Advanced tiers.
   - Topics include Loops, Functions, Pointers, and OOP with multi-tier content variations, code examples, MCQs, and coding challenges.
8. **Incomplete, Broken, Duplicated, or Unused Code Identified**:
   - **No Landing Page**: The site opens directly into the course catalog without an engaging, professional EdTech landing page (Hero, language showcase, how it works, features, roadmap preview, footer).
   - **Basic Topic Reader**: Topics are currently rendered as a single monolithic page rather than structured, interactive micro-sections (What, Why, Syntax, Parameters, Return, Pitfalls, Practice) with subtopic navigation.
   - **Missing Explicit Content Depth**: The backend adaptive engine outputs `SIMPLIFIED`, `BALANCED`, `CONCISE`, but lacks numerical `content_depth` (1=Quick, 2=Normal, 3=Detailed, 4=Deep) and Micro-Learning mode.
   - **Static Quiz Selection**: Quizzes currently return static questions for a topic instead of dynamic question selection based on recent mistakes and consecutive streaks.
   - **Error Classification Gap**: Sandbox returns compiler/runtime errors as raw text without classifying them into discrete categories (`SYNTAX_ERROR`, `LOGIC_ERROR`, `RUNTIME_ERROR`, `TIME_LIMIT`, `COMPILATION_ERROR`).
   - **Weak Concept Detector & Spaced Repetition**: Telemetry tracks events, but there is no dedicated Weak Concept detector table/service or spaced repetition review schedule (`review_count`, `next_review`, `retention_score`).
   - **Gamification & Badges**: Dashboard shows stats, but lacks daily learning streaks, achievement badges (First Code, Quiz Master, Debugger, Consistent Learner), and prerequisite graph navigation.

---

## 2. Current Architecture vs. Target EdTech Product Architecture

```
[ Current Architecture ]
Frontend (Vite+React): Catalog -> Topic (monolithic) -> Quiz (fixed) -> Monaco Editor -> Dashboard / Admin
Backend (Express): Basic REST APIs + Database Store + Subprocess Runner
ML Microservice (FastAPI): 14 Telemetry Features -> Random Forest -> RAG Vector Search (4-tier hints)

[ Target Architecture (v2.0) ]
Frontend (Vite+React):
  ├── Modern Landing Page (Hero, Languages, Interactive "How It Works", AI Features, Stats, Footer)
  ├── Course Explorer & Visual Roadmaps (Roadmap graph: Completed, Current, Locked, Recommended, Revision)
  ├── Structured Subtopic Learning Station (Progress tracker, Section navigator, Micro-learning mode)
  ├── Smart Adaptive Quiz Engine (Dynamic question selection, consecutive win/loss adaptation)
  ├── Monaco Coding Studio + AI Coding Assistant (5-level hints, error classification, test suite)
  ├── In-Lesson Contextual AI Tutor (8 explicit response modes: Explain, Simplify, Example, Debug, Hint, Quiz, Revise, Advanced)
  ├── Personalized Learning Command Center (Snapshot, AI Revision action, Streak, Gamification badges, Charts)
  └── Admin ML & Pedagogy Console (Prediction distribution, difficult topics, live diagnostics, retraining)

Backend Services (Express + TypeScript):
  ├── Centralized adaptiveEngine() (Temporal smoothing, confidence thresholding, content_depth, micro-learning)
  ├── Smart Question Selection Engine (Selects questions by cognitive load & past failure history)
  ├── Error-Based Learning Classifier (Parses stdout/stderr into categorized coding errors)
  ├── Weak Concept & Spaced Repetition Engine (Calculates retention scores and schedules next review dates)
  └── Prerequisite & Knowledge Graph Registry (Multi-hop concept dependency resolution)

ML & RAG Microservice (Python FastAPI):
  ├── Supervised Random Forest Classifier + Feature Importances
  ├── RAG Hybrid Semantic/Keyword Retrieval + Source Citations + Hallucination Guard Fallback
  └── Structured Context LLM Conditioner (Prompt includes User Level, Cognitive State, Depth, Weak Concepts)
```

---

## 3. Feature Gap Analysis

| Requirement Section | Specification | Current State | Target State | Priority |
| :--- | :--- | :--- | :--- | :---: |
| **43. Landing Page** | Professional EdTech landing page with Hero, Supported Languages, How It Works, AI Cards, Roadmap Preview, Stats, Footer | None (starts at catalog) | Full responsive landing page with quick-start action | **P0** |
| **44. Dashboard** | Command center: Welcome back, Continue current topic, Snapshot cards, AI Recommendation revision action, Recent activity, Language progress bars | Basic stats & charts | Complete command center redesign with instant revision trigger | **P0** |
| **45. Course Explorer** | Multi-attribute filters (Language, Level, Difficulty, Topic) with duration, topics count, progress | Language & level dropdown | Full grid explorer with dynamic search & multi-filtering | **P1** |
| **46. Visual Roadmap** | Visual node graph for Python, C, C++, Java with statuses (Completed, Current, Locked, Recommended, Revision) | Flat module list | Interactive visual step-by-step roadmap for each language | **P1** |
| **47. Topic Redesign** | Subtopic sections (What, Why, Syntax, Parameters, Pitfalls, Practice) with Prev/Next and progress | Monolithic text page | Section-based reader with completion memory & quick jump | **P0** |
| **49. Content Depth** | `content_depth` parameter (1=Quick, 2=Normal, 3=Detailed, 4=Deep) | 3 text variants | Numerical depth scaling tied to ML cognitive state | **P1** |
| **50. Micro-Learning** | 5-minute concept -> mini example -> 1 question -> feedback loop for HIGH cognitive load | Conceptual alert only | Dedicated interactive micro-step learner mode | **P1** |
| **51. Learning Modes** | Standard, Quick, Deep, Revision, Practice, AI Guided | Manual mode toggle | 6 switchable learning modes with auto-recommendation | **P1** |
| **52-53. AI Tutor UX** | Context-aware AI tutor with 8 modes (EXPLAIN, SIMPLIFY, EXAMPLE, DEBUG, HINT, QUIZ, REVISE, ADVANCED) | General RAG question | Contextual action chips with structured prompt dispatch | **P0** |
| **54. Coding Assistant** | 5 progressive hint tiers + Explain error, Debug, Optimize, Explain code, Test case generation | 4 hint tiers | 5 hint tiers + 6 editor action buttons | **P1** |
| **55-56. Smart Quiz Engine** | Dynamic question selector + dynamic difficulty adjustment (3 consecutive correct -> up, 2 wrong -> down) | Fixed question list | Adaptive selector prioritizing weak concepts & streaks | **P0** |
| **57-58. Error Learning** | Categorize errors (SYNTAX, RUNTIME, LOGIC, etc.) and recommend targeted revision | Raw console output | Structured error parser + automatic revision links | **P1** |
| **59-60. Spaced Revision** | Weak concept detector + spaced repetition (`review_count`, `next_review`, `retention_score`) | Ad-hoc recommendations | Formal spaced revision schedule with "Revise Now" | **P1** |
| **61-62. Knowledge Graph** | Prerequisite graph & concept relationship graph for multi-language curricula | Basic prerequisite ID | Full Directed Acyclic Graph (DAG) for topics & concepts | **P1** |
| **63-66. RAG Citations** | Hybrid search, source citations, hallucination fallback, structured prompt context | Vector TF-IDF | Grounded citations, confidence fallback, structured context | **P1** |
| **67-69. Gamification** | Daily streaks, achievements/badges (First Code, Quiz Master, Debugger, 7 Day Learner) | Basic XP / points | Streak tracking + unlockable badges & notifications | **P2** |
| **70-71. Progress Visuals** | Supportive cognitive load trends (Comfortable, Some difficulty, Needs revision, Improving) | Raw classification | Supportive trend charts & skill radar/progress bars | **P2** |
| **74-76. Adaptive Engine** | Centralized `adaptiveEngine()` with temporal smoothing & confidence thresholding | Simple thresholding | Central coordinator with weighted temporal smoothing | **P0** |
| **79. User Feedback** | "Was this explanation helpful?" (Yes, Somewhat, No) feedback loop | None | In-lesson and in-AI feedback buttons with DB storage | **P2** |
| **80-81. Course Content** | Rich, production-grade topic content for all 4 languages | Basic seeded topics | Expanded deep content with real-world examples & pitfalls | **P1** |

---

## 4. Bugs, Bottlenecks & Technical Debt Identified

1. **Path Formatting on Windows**: Previously fixed issue with space splitting in `verify_platform.py` child process; must ensure all new subprocess calls use relative paths or explicit quoting.
2. **Monolithic Lesson Scrolling**: Reading tracking logged scroll events across the entire page rather than per subtopic section. Breaking topics into sections allows granular dwell and comprehension tracking.
3. **Absence of User Session Boundary**: Telemetry was grouped only by `topic_id`, lacking formal `session_id` aggregation (Section 77, 78).
4. **Non-Adaptive Quiz Slicing**: When learners repeated quizzes, identical questions were served in the same order.
5. **Raw Error Messages**: Subprocess compiler errors (e.g. `g++: error: ...` or Python `IndentationError`) were dumped directly into stdout without metadata extraction.

---

## 5. Incremental Implementation Roadmap (Priority-Ordered)

### Phase 1: Core Foundation & Data Architecture (High Priority - P0)
- **Database Schema Expansion (`database.ts`, `types.ts`)**:
  - Add tables/models for `user_sessions`, `weak_concepts`, `spaced_revisions`, `achievements`, `user_achievements`, `content_feedback`.
  - Add `content_depth`, `sections`, `prerequisites`, `knowledge_nodes` to Curriculum data.
- **Centralized Adaptive Decision Engine (`adaptiveEngine.ts`)**:
  - Implement temporal smoothing (moving weighted average of last 5 predictions).
  - Add confidence thresholding (maintain mode if confidence < 0.60).
  - Output `content_depth` (1..4), `lesson_mode`, `question_difficulty`, `micro_learning_enabled`.

### Phase 2: Intelligence Subsystems (High Priority - P0/P1)
- **Smart Quiz Engine (`quizController.ts`)**: Dynamic question selection based on past mistakes and consecutive streak adjustment (3 correct -> level up, 2 wrong -> level down).
- **Error Classification System (`codeSandbox.ts`, `codeController.ts`)**: Automatic parsing of stdout/stderr into `SYNTAX_ERROR`, `TYPE_ERROR`, `LOGIC_ERROR`, `RUNTIME_ERROR`, `TIME_LIMIT`, `WRONG_OUTPUT`, `COMPILATION_ERROR` with targeted revision links.
- **Weak Concept & Spaced Revision Engine**: Automatic identification of struggling topics and scheduling next review dates.
- **Enhanced RAG & AI Copilot (`llm_service.py`, `aiController.ts`)**:
  - 8 AI Tutor modes: EXPLAIN, SIMPLIFY, EXAMPLE, DEBUG, HINT, QUIZ, REVISE, ADVANCED.
  - 5-Tier Coding hints (Conceptual, Approach, Pseudocode, Partial Code, Full Solution).
  - Grounded source citations and confidence fallback ("I couldn't find enough information...").

### Phase 3: Frontend EdTech Experience Transformation (High Priority - P0/P1)
- **Modern Landing Page (`LandingPage.tsx`)**:
  - Hero with "Learn Programming. Adapted to You." and CTA buttons.
  - Supported Languages (Python, C, C++, Java), How It Works flow (Learn -> Practice -> Analyze -> Adapt -> Improve).
  - AI Features showcase, Learning path preview (Beginner -> Intermediate -> Advanced), real dynamic platform statistics, and footer.
- **Professional Dashboard Redesign (`LearnerDashboardPage.tsx`)**:
  - Personalized header: "Welcome back, [Name]", Continue learning card with progress bar.
  - Learning Snapshot (Overall Progress, Quiz Accuracy, Coding Accuracy, Study Time, Topics Completed).
  - AI Recommendation card with direct "Start Recommended Revision" action.
  - Recent Activity stream, Language Progress bars, Daily Streak & Achievement badges.
  - Supportive Cognitive Load Trend (Comfortable, Some difficulty, Needs revision, Improving).
- **Course Explorer & Visual Roadmaps (`CourseExplorerPage.tsx`, `VisualRoadmap.tsx`)**:
  - Multi-filtering by Language, Level, Difficulty, and Topic.
  - Interactive visual roadmaps for Python, C, C++, Java with nodes indicating Completed, Current, Locked, Recommended, and Revision Required.
- **Structured Subtopic Lesson Reader (`TopicLessonPage.tsx`)**:
  - Structured sections (What, Why, Syntax, Parameters, Examples, Common Mistakes, Practice, Quiz, Challenge).
  - Next / Previous section stepper, progress percentage, and position auto-saving.
  - Interactive Micro-Learning Mode for HIGH cognitive load.
  - In-lesson AI Tutor quick action buttons (Explain, Simplify, Example, Why is this wrong?, Quiz me, Summarize).
  - User feedback widget ("Was this explanation helpful?").
- **Coding Studio Upgrade (`CodingStudioPage.tsx`)**:
  - 5-Tier progressive hint reveal modal.
  - Editor action buttons (Explain error, Hint, Debug, Optimize, Explain code, Generate test case).
  - Categorized error badges with one-click revision navigation.

### Phase 4: Full-Stack Verification & Zero-Command Launch
- Update `scripts/verify_platform.py` to test all new endpoints (dynamic quiz selection, error classification, spaced revision, 8 AI tutor modes, landing page stats).
- Verify end-to-end flow with automated testing and validate that all services continue running smoothly without manual intervention.
