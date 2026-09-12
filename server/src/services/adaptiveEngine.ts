import { dbService } from '../db/database.js';
import {
  CognitiveLoadLevel,
  AdaptiveAction,
  CognitivePredictionResult,
  ContentDepth,
  LearningMode,
  AiTutorMode
} from '../types.js';

export interface AdaptiveEvaluationOutput {
  cognitive_level: CognitiveLoadLevel;
  confidence: number;
  recommended_action: AdaptiveAction;
  content_mode: 'CONCISE' | 'BALANCED' | 'SIMPLIFIED';
  content_depth: ContentDepth;
  lesson_mode: LearningMode;
  micro_learning_enabled: boolean;
  ai_tutor_mode: AiTutorMode;
  recommended_difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  recommend_revision: boolean;
  recommended_topic_id: string;
  reason: string;
  contributing_factors: string[];
  unusual_completion?: {
    is_unusual: boolean;
    reason: string;
  };
}

export class AdaptiveEngineService {
  private mlServiceUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';

  /**
   * Centralized Adaptive Decision Engine (Section 76)
   * Coordinates telemetry, ML prediction, temporal smoothing, confidence thresholding,
   * content depth (Section 49), micro-learning mode (Section 50), and spaced revision.
   */
  public async evaluateLearner(
    userId: string,
    topicId: string,
    language: string
  ): Promise<AdaptiveEvaluationOutput> {
    // 1. Ingest session events for this topic
    const events = dbService.getTopicBehaviorSession(userId, topicId);
    
    // 2. Feature extraction from event stream
    const telemetryFeatures = this.extractFeaturesFromEvents(events);

    // 3. Query ML Prediction service
    let predictionResult: CognitivePredictionResult;
    try {
      const resp = await fetch(`${this.mlServiceUrl}/api/ml/predict-cognitive-load`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telemetryFeatures)
      });
      if (resp.ok) {
        predictionResult = await resp.json();
      } else {
        predictionResult = this.heuristicPredict(telemetryFeatures);
      }
    } catch (e) {
      // Graceful fallback to heuristic model if python service is momentarily unreachable
      predictionResult = this.heuristicPredict(telemetryFeatures);
    }

    // 4. Temporal Smoothing (Section 75) & Confidence Thresholding (Section 74)
    const smoothedState = this.applyTemporalSmoothing(userId, predictionResult);

    // 5. Save prediction record to database
    const predId = `pred_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    dbService.saveCognitivePrediction({
      id: predId,
      user_id: userId,
      topic_id: topicId,
      cognitive_load: smoothedState.level,
      confidence: smoothedState.confidence,
      probabilities: JSON.stringify(predictionResult.probabilities),
      timestamp: new Date().toISOString(),
      factors: JSON.stringify(predictionResult.contributing_factors)
    });

    // 6. Compute Adaptive Actions & Pacing
    const currentTopic = dbService.getTopicById(topicId);
    const cognitiveLevel = smoothedState.level;

    let recommendedAction: AdaptiveAction = 'CONTINUE';
    let contentMode: 'CONCISE' | 'BALANCED' | 'SIMPLIFIED' = 'BALANCED';
    let contentDepth: ContentDepth = 2; // Normal
    let lessonMode: LearningMode = 'STANDARD';
    let microLearningEnabled = false;
    let aiTutorMode: AiTutorMode = 'EXPLAIN';
    let recommendedDifficulty: 'EASY' | 'MEDIUM' | 'HARD' = 'MEDIUM';
    let recommendRevision = false;
    let recommendedTopicId = topicId;
    let reason = '';

    if (cognitiveLevel === 'HIGH') {
      contentMode = 'SIMPLIFIED';
      contentDepth = 4; // Deep/Detailed breakdown to reduce overload
      lessonMode = 'AI_GUIDED';
      microLearningEnabled = true; // Section 50: Micro-learning mode
      aiTutorMode = 'SIMPLIFY';
      recommendedDifficulty = 'EASY';
      recommendRevision = true;

      // Track weak concept
      dbService.recordWeakConcept({
        userId,
        conceptName: currentTopic?.title || 'Programming Concepts',
        topicId,
        language,
        isFailure: true
      });

      // Schedule spaced revision
      dbService.scheduleSpacedRevision(userId, topicId, 0.45);

      if (currentTopic?.prerequisite_topic_id) {
        recommendedAction = 'RECOMMEND_PREREQUISITE';
        recommendedTopicId = currentTopic.prerequisite_topic_id;
        reason = `High cognitive load detected. We recommend reinforcing foundational concepts in "${currentTopic.prerequisite_topic_id}" before continuing.`;
      } else {
        recommendedAction = 'SIMPLIFY';
        reason = `Active learning friction detected. We have activated Micro-Learning Mode with 5-minute modular checkpoints and beginner analogies.`;
      }
    } else if (cognitiveLevel === 'LOW') {
      contentMode = 'CONCISE';
      contentDepth = 1; // Quick fast-track
      lessonMode = 'QUICK';
      microLearningEnabled = false;
      aiTutorMode = 'ADVANCED';
      recommendedDifficulty = 'HARD';
      recommendedAction = 'INCREASE_DIFFICULTY';
      recommendRevision = false;
      reason = `Outstanding progress! Your rapid pace and accuracy unlocked Advanced exercises and fast-track summaries.`;
    } else {
      // MEDIUM
      contentMode = 'BALANCED';
      contentDepth = 2; // Normal
      lessonMode = 'STANDARD';
      microLearningEnabled = false;
      aiTutorMode = 'EXPLAIN';
      recommendedDifficulty = 'MEDIUM';
      recommendedAction = 'CONTINUE';
      recommendRevision = false;
      reason = `Balanced learning pace detected. Continue at the current steady progression with progressive hints available if needed.`;
    }

    // 7. Record recommendation
    const recId = `rec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    dbService.saveRecommendation({
      id: recId,
      user_id: userId,
      recommended_action: recommendedAction,
      recommended_topic_id: recommendedTopicId,
      reason,
      timestamp: new Date().toISOString()
    });

    return {
      cognitive_level: cognitiveLevel,
      confidence: smoothedState.confidence,
      recommended_action: recommendedAction,
      content_mode: contentMode,
      content_depth: contentDepth,
      lesson_mode: lessonMode,
      micro_learning_enabled: microLearningEnabled,
      ai_tutor_mode: aiTutorMode,
      recommended_difficulty: recommendedDifficulty,
      recommend_revision: recommendRevision,
      recommended_topic_id: recommendedTopicId,
      reason,
      contributing_factors: predictionResult.contributing_factors,
      unusual_completion: predictionResult.unusual_completion
    };
  }

  /**
   * Section 74 & 75: Temporal Smoothing & Confidence Thresholding
   */
  private applyTemporalSmoothing(userId: string, currentPred: CognitivePredictionResult): { level: CognitiveLoadLevel; confidence: number } {
    // If confidence is low (< 0.60), be conservative and pull towards MEDIUM
    if (currentPred.confidence < 0.60) {
      return { level: 'MEDIUM', confidence: currentPred.confidence };
    }

    const history = dbService.getCognitivePredictionHistory(userId, 4);
    if (history.length === 0) {
      return { level: currentPred.prediction, confidence: currentPred.confidence };
    }

    const stateToNum = (state: string) => (state === 'LOW' ? 1 : state === 'HIGH' ? 3 : 2);
    const numToState = (val: number): CognitiveLoadLevel => (val < 1.6 ? 'LOW' : val > 2.4 ? 'HIGH' : 'MEDIUM');

    // Weighted average: current = 0.5, past = 0.5 distributed
    let totalWeight = 0.5;
    let weightedSum = stateToNum(currentPred.prediction) * 0.5;

    const weights = [0.25, 0.15, 0.10];
    history.slice(0, 3).forEach((rec: any, idx: number) => {
      const w = weights[idx] || 0.05;
      weightedSum += stateToNum(rec.cognitive_load) * w;
      totalWeight += w;
    });

    const smoothedVal = weightedSum / totalWeight;
    return {
      level: numToState(smoothedVal),
      confidence: currentPred.confidence
    };
  }

  private extractFeaturesFromEvents(events: any[]) {
    let scrollTime = 0;
    let topicTime = 0;
    let pageRevisits = 0;
    let mcqTime = 0;
    let codingTime = 0;
    let codingAttempts = 0;
    let codingErrors = 0;
    let hintCount = 0;
    let explanationCount = 0;
    let mcqAccuracy = 0.7;

    for (const ev of events) {
      if (ev.event_type === 'SCROLL') scrollTime += ev.duration || 10;
      if (ev.event_type === 'PAGE_REVISIT') pageRevisits += 1;
      if (ev.event_type === 'MCQ_SUBMIT') {
        mcqTime += ev.duration || 30;
        if (ev.metadata && ev.metadata.accuracy !== undefined) {
          mcqAccuracy = ev.metadata.accuracy;
        }
      }
      if (ev.event_type === 'CODE_SUBMIT') {
        codingAttempts += 1;
        codingTime += ev.duration || 60;
        if (ev.metadata && ev.metadata.has_error) codingErrors += 1;
      }
      if (ev.event_type === 'HINT_REQUEST') hintCount += 1;
      if (ev.event_type === 'AI_EXPLANATION_REQUEST') explanationCount += 1;
      topicTime += ev.duration || 5;
    }

    return {
      scroll_time: scrollTime || 40,
      topic_time: topicTime || 300,
      page_revisit_count: pageRevisits,
      mcq_time: mcqTime || 45,
      mcq_accuracy: mcqAccuracy,
      coding_time: codingTime || 120,
      coding_attempts: codingAttempts || 1,
      coding_error_count: codingErrors,
      hint_count: hintCount,
      explanation_request_count: explanationCount,
      previous_topic_score: 0.8,
      current_topic_score: mcqAccuracy,
      completion_rate: 0.9,
      unusual_completion_signal: (codingTime > 0 && codingTime < 15 && codingAttempts === 1) ? 1.0 : 0.0
    };
  }

  private heuristicPredict(f: any): CognitivePredictionResult {
    if (f.coding_error_count >= 3 || f.hint_count >= 3 || f.mcq_accuracy < 0.5) {
      return {
        prediction: 'HIGH',
        confidence: 0.88,
        probabilities: { LOW: 0.05, MEDIUM: 0.15, HIGH: 0.80 },
        unusual_completion: { is_unusual: false, reason: 'Normal pacing' },
        contributing_factors: ['Multiple errors and hints recorded']
      };
    } else if (f.mcq_accuracy >= 0.85 && f.coding_attempts <= 2 && f.hint_count === 0) {
      return {
        prediction: 'LOW',
        confidence: 0.92,
        probabilities: { LOW: 0.85, MEDIUM: 0.12, HIGH: 0.03 },
        unusual_completion: { is_unusual: false, reason: 'Normal pacing' },
        contributing_factors: ['Rapid completion and high accuracy']
      };
    } else {
      return {
        prediction: 'MEDIUM',
        confidence: 0.82,
        probabilities: { LOW: 0.15, MEDIUM: 0.75, HIGH: 0.10 },
        unusual_completion: { is_unusual: false, reason: 'Normal pacing' },
        contributing_factors: ['Balanced pacing and comprehension']
      };
    }
  }
}

export const adaptiveEngine = new AdaptiveEngineService();
