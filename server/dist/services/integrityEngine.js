"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrityEngine = exports.IntegritySignalEngine = void 0;
class IntegritySignalEngine {
    /**
     * Section 94: Non-punitive Integrity Signal Engine.
     * Analyzes interactions and classifies them into 'normal', 'unusual', or 'needs_review'.
     * Never accuses the learner of cheating.
     */
    evaluateIntegrity(telemetry) {
        const timeSec = Math.max(0.5, telemetry.completion_time_seconds || 30);
        const keys = Math.max(0, telemetry.keystrokes || 0);
        const pastes = Math.max(0, telemetry.paste_events || 0);
        const codeLen = Math.max(1, telemetry.code_length || 10);
        const signals = [];
        let anomalyScore = 0;
        // 1. Rapid Completion Signal (e.g. non-trivial code submitted in under 12 seconds)
        if (timeSec < 12 && codeLen > 80) {
            anomalyScore += 40;
            signals.push('Rapid submission timestamp relative to code volume');
        }
        else if (timeSec < 20 && codeLen > 150) {
            anomalyScore += 25;
            signals.push('Fast completion pace observed');
        }
        // 2. Typing Velocity vs Code Volume (Typing ratio)
        // If code has 200 chars but only 5 keystrokes were recorded
        const estimatedCharsTyped = keys;
        const typingRatio = estimatedCharsTyped / codeLen;
        if (typingRatio < 0.15 && codeLen > 100) {
            anomalyScore += 30;
            signals.push('External clipboard insertion detected with minimal interactive edits');
        }
        // 3. Paste Event Frequency
        if (pastes > 3 && keys < 20) {
            anomalyScore += 20;
            signals.push('Multiple batch paste events with low active typing count');
        }
        // 4. Sudden Performance Leap
        if (telemetry.previous_scores && telemetry.previous_scores.length >= 2 && telemetry.current_score) {
            const avgPrev = telemetry.previous_scores.reduce((a, b) => a + b, 0) / telemetry.previous_scores.length;
            if (avgPrev < 0.35 && telemetry.current_score >= 0.95 && timeSec < 30) {
                anomalyScore += 25;
                signals.push('Pronounced score delta from historical baseline in short timeframe');
            }
        }
        // Determine Classification Category
        let status = 'normal';
        let explanation = 'Submission exhibits standard interactive typing cadence and natural problem-solving pace.';
        if (anomalyScore >= 60) {
            status = 'needs_review';
            explanation = 'Submission metrics suggest automated or external input. Recommended for guided mentor review.';
        }
        else if (anomalyScore >= 30) {
            status = 'unusual';
            explanation = 'Unusual rapid completion or paste cadence detected. Retaining current learning mode to gather more telemetry.';
        }
        const confidence = Math.min(0.95, Math.max(0.65, 0.70 + (anomalyScore / 200)));
        return {
            status,
            confidence: Math.round(confidence * 100) / 100,
            signals,
            explanation,
            details: {
                completion_time_seconds: timeSec,
                keystroke_count: keys,
                paste_event_count: pastes,
                typing_velocity_ratio: Math.round(typingRatio * 100) / 100
            }
        };
    }
}
exports.IntegritySignalEngine = IntegritySignalEngine;
exports.integrityEngine = new IntegritySignalEngine();
