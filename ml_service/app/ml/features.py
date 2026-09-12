"""
Cognitive Load Feature Schema and Preprocessing Pipeline
"""
from typing import List, Dict, Any
import numpy as np
import pandas as pd

FEATURE_NAMES: List[str] = [
    "scroll_time",
    "topic_time",
    "page_revisit_count",
    "mcq_time",
    "mcq_accuracy",
    "coding_time",
    "coding_attempts",
    "coding_error_count",
    "hint_count",
    "explanation_request_count",
    "previous_topic_score",
    "current_topic_score",
    "completion_rate",
    "unusual_completion_signal",
]

TARGET_NAME: str = "cognitive_load"
CLASS_NAMES: List[str] = ["LOW", "MEDIUM", "HIGH"]
CLASS_TO_IDX: Dict[str, int] = {"LOW": 0, "MEDIUM": 1, "HIGH": 2}
IDX_TO_CLASS: Dict[int, str] = {0: "LOW", 1: "MEDIUM", 2: "HIGH"}

def extract_features(raw_data: Dict[str, Any]) -> pd.DataFrame:
    """
    Extracts, validates, and aligns raw telemetry dictionary into a standard feature DataFrame.
    Provides robust fallbacks for any missing or null telemetry signals.
    """
    row = {
        "scroll_time": float(raw_data.get("scroll_time") or raw_data.get("scrollTime") or 0.0),
        "topic_time": float(raw_data.get("topic_time") or raw_data.get("topicTime") or 0.0),
        "page_revisit_count": int(raw_data.get("page_revisit_count") or raw_data.get("pageRevisits") or 0),
        "mcq_time": float(raw_data.get("mcq_time") or raw_data.get("mcqTime") or 0.0),
        "mcq_accuracy": float(raw_data.get("mcq_accuracy") or raw_data.get("mcqAccuracy") or 0.0),
        "coding_time": float(raw_data.get("coding_time") or raw_data.get("codingTime") or 0.0),
        "coding_attempts": int(raw_data.get("coding_attempts") or raw_data.get("codingAttempts") or 0),
        "coding_error_count": int(raw_data.get("coding_error_count") or raw_data.get("errorCount") or 0),
        "hint_count": int(raw_data.get("hint_count") or raw_data.get("hintCount") or 0),
        "explanation_request_count": int(raw_data.get("explanation_request_count") or raw_data.get("explanationCount") or 0),
        "previous_topic_score": float(raw_data.get("previous_topic_score") or raw_data.get("previousScore") or 0.75),
        "current_topic_score": float(raw_data.get("current_topic_score") or raw_data.get("currentScore") or 0.0),
        "completion_rate": float(raw_data.get("completion_rate") or raw_data.get("completionRate") or 0.0),
        "unusual_completion_signal": float(raw_data.get("unusual_completion_signal") or raw_data.get("unusualSignal") or 0.0),
    }

    # Range clamping & sanitization
    row["mcq_accuracy"] = max(0.0, min(1.0, row["mcq_accuracy"]))
    row["previous_topic_score"] = max(0.0, min(1.0, row["previous_topic_score"]))
    row["current_topic_score"] = max(0.0, min(1.0, row["current_topic_score"]))
    row["completion_rate"] = max(0.0, min(1.0, row["completion_rate"]))
    row["unusual_completion_signal"] = 1.0 if row["unusual_completion_signal"] > 0.5 else 0.0

    return pd.DataFrame([row], columns=FEATURE_NAMES)
