"""
Cognitive Load Prediction and Inference Service
"""
import os
import json
import joblib
import numpy as np
from typing import Dict, Any, Tuple

import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from .features import extract_features, FEATURE_NAMES, IDX_TO_CLASS, CLASS_NAMES
except (ImportError, ValueError):
    from features import extract_features, FEATURE_NAMES, IDX_TO_CLASS, CLASS_NAMES

class CognitivePredictor:
    def __init__(self, models_dir: str = None):
        if models_dir is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            models_dir = os.path.join(base_dir, "models")
        self.models_dir = models_dir
        self.model = None
        self.scaler = None
        self.metrics = {}
        self.load()

    def load(self):
        model_path = os.path.join(self.models_dir, "model.pkl")
        scaler_path = os.path.join(self.models_dir, "scaler.pkl")
        metrics_path = os.path.join(self.models_dir, "metrics.json")

        if os.path.exists(model_path) and os.path.exists(scaler_path):
            self.model = joblib.load(model_path)
            self.scaler = joblib.load(scaler_path)
        else:
            self.model = None
            self.scaler = None

        if os.path.exists(metrics_path):
            with open(metrics_path, "r", encoding="utf-8") as f:
                self.metrics = json.load(f)

    def is_ready(self) -> bool:
        return self.model is not None and self.scaler is not None

    def predict(self, raw_telemetry: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes prediction on raw learner telemetry.
        Returns:
            - prediction: LOW, MEDIUM, or HIGH
            - confidence: probability score (0.0 to 1.0)
            - probabilities: per-class distribution
            - unusual_completion: boolean & explanation
            - contributing_factors: top telemetry influences
        """
        df_features = extract_features(raw_telemetry)

        # Check anti-cheat signal (Section 7)
        unusual_signal, unusual_explanation = self._check_unusual_completion(raw_telemetry)

        if not self.is_ready():
            # Graceful rule-based fallback if ML model hasn't been trained yet
            return self._heuristic_prediction(df_features, unusual_signal, unusual_explanation)

        X_scaled = self.scaler.transform(df_features)
        y_pred = self.model.predict(X_scaled)[0]
        prediction_label = IDX_TO_CLASS.get(int(y_pred), "MEDIUM")

        if hasattr(self.model, "predict_proba"):
            probs = self.model.predict_proba(X_scaled)[0]
            confidence = float(np.max(probs))
            probabilities = {CLASS_NAMES[i]: round(float(probs[i]), 4) for i in range(len(CLASS_NAMES))}
        else:
            confidence = 0.85
            probabilities = {CLASS_NAMES[i]: 0.33 for i in range(len(CLASS_NAMES))}
            probabilities[prediction_label] = 0.85

        # Determine key contributing factors
        contributing_factors = self._explain_prediction(df_features.iloc[0].to_dict(), prediction_label)

        return {
            "prediction": prediction_label,
            "confidence": round(confidence, 4),
            "probabilities": probabilities,
            "unusual_completion": {
                "is_unusual": unusual_signal,
                "reason": unusual_explanation
            },
            "contributing_factors": contributing_factors,
            "feature_snapshot": df_features.iloc[0].to_dict()
        }

    def _check_unusual_completion(self, telemetry: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Section 7: Anti-cheating signal detection without punitive false positives.
        Flags suspiciously rapid coding completions for human review while maintaining educational integrity.
        """
        coding_time = float(telemetry.get("coding_time") or telemetry.get("codingTime") or 0.0)
        coding_attempts = int(telemetry.get("coding_attempts") or telemetry.get("codingAttempts") or 0)
        keystroke_count = int(telemetry.get("keystroke_count") or telemetry.get("keystrokes") or 50)
        paste_event_count = int(telemetry.get("paste_events") or 0)
        
        # Expected coding time for normal topics is > 60s
        if coding_time > 0 and coding_time < 12.0 and coding_attempts <= 1:
            if keystroke_count < 10 or paste_event_count > 0:
                return True, "Solution submitted within 12 seconds with minimal keystrokes / paste event. Flagged for review."
            return True, "Unusually fast completion time (< 12 seconds) detected."
        
        return False, "Normal submission pace."

    def _explain_prediction(self, features: Dict[str, float], prediction: str) -> list:
        factors = []
        if prediction == "HIGH":
            if features.get("coding_error_count", 0) >= 3:
                factors.append(f"Multiple compilation/runtime errors encountered ({int(features['coding_error_count'])})")
            if features.get("hint_count", 0) >= 2:
                factors.append(f"Frequent hint requests ({int(features['hint_count'])})")
            if features.get("mcq_accuracy", 1.0) < 0.60:
                factors.append(f"MCQ accuracy below target threshold ({int(features['mcq_accuracy']*100)}%)")
            if features.get("page_revisit_count", 0) >= 3:
                factors.append("Repeated page revisits indicating conceptual uncertainty")
            if not factors:
                factors.append("Extended dwell time and high interaction latency")
        elif prediction == "LOW":
            if features.get("mcq_accuracy", 0) >= 0.85:
                factors.append(f"High assessment accuracy ({int(features['mcq_accuracy']*100)}%)")
            if features.get("coding_attempts", 99) <= 2:
                factors.append("Swift coding execution on first or second attempt")
            if features.get("hint_count", 0) == 0:
                factors.append("Solved topic without requiring hints")
            if not factors:
                factors.append("Rapid comprehension and smooth topic navigation")
        else: # MEDIUM
            factors.append("Balanced engagement pace with standard learning progression")
            if features.get("hint_count", 0) == 1:
                factors.append("Leveraged a guided hint effectively")
        return factors

    def _heuristic_prediction(self, df_features, unusual_signal: bool, unusual_explanation: str) -> Dict[str, Any]:
        row = df_features.iloc[0].to_dict()
        errors = row.get("coding_error_count", 0)
        hints = row.get("hint_count", 0)
        mcq_acc = row.get("mcq_accuracy", 0.7)
        
        if errors >= 4 or hints >= 3 or mcq_acc < 0.50:
            pred = "HIGH"
            conf = 0.85
        elif mcq_acc >= 0.85 and errors <= 1 and hints == 0:
            pred = "LOW"
            conf = 0.88
        else:
            pred = "MEDIUM"
            conf = 0.80

        return {
            "prediction": pred,
            "confidence": conf,
            "probabilities": {"LOW": 0.1, "MEDIUM": 0.8, "HIGH": 0.1} if pred == "MEDIUM" else (
                {"LOW": 0.85, "MEDIUM": 0.1, "HIGH": 0.05} if pred == "LOW" else {"LOW": 0.05, "MEDIUM": 0.15, "HIGH": 0.80}
            ),
            "unusual_completion": {
                "is_unusual": unusual_signal,
                "reason": unusual_explanation
            },
            "contributing_factors": self._explain_prediction(row, pred),
            "feature_snapshot": row
        }

# Global singleton
predictor = CognitivePredictor()
