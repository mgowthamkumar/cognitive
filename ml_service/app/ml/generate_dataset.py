"""
Synthetic Dataset Generator for Cognitive Load Prediction Model
Generates balanced, realistic behavioral telemetry traces for:
- LOW Cognitive Load
- MEDIUM Cognitive Load
- HIGH Cognitive Load
- Edge cases including unusually fast completions (anti-cheat telemetry)
"""
import os
import numpy as np
import pandas as pd
from typing import Tuple

try:
    from .features import FEATURE_NAMES, TARGET_NAME
except (ImportError, ValueError):
    from features import FEATURE_NAMES, TARGET_NAME

def generate_cognitive_dataset(n_samples: int = 3600, random_state: int = 42) -> pd.DataFrame:
    np.random.seed(random_state)
    per_class = n_samples // 3

    records = []

    # 1. LOW Cognitive Load (Confident, fluid, high mastery)
    for _ in range(per_class):
        # Realistic student comfortable with the material
        is_fast_expert = np.random.rand() < 0.12
        scroll_time = np.random.normal(loc=45.0, scale=15.0) if not is_fast_expert else np.random.normal(loc=18.0, scale=6.0)
        topic_time = np.random.normal(loc=260.0, scale=60.0) if not is_fast_expert else np.random.normal(loc=90.0, scale=25.0)
        page_revisit_count = np.random.choice([0, 1, 2], p=[0.75, 0.20, 0.05])
        mcq_time = np.random.normal(loc=55.0, scale=18.0)
        mcq_accuracy = np.clip(np.random.normal(loc=0.92, scale=0.07), 0.75, 1.0)
        coding_time = np.random.normal(loc=140.0, scale=40.0) if not is_fast_expert else np.random.normal(loc=25.0, scale=10.0)
        coding_attempts = np.random.choice([1, 2], p=[0.82, 0.18])
        coding_error_count = np.random.choice([0, 1], p=[0.85, 0.15])
        hint_count = np.random.choice([0, 1], p=[0.92, 0.08])
        explanation_request_count = np.random.choice([0, 1], p=[0.90, 0.10])
        previous_topic_score = np.clip(np.random.normal(loc=0.90, scale=0.08), 0.70, 1.0)
        current_topic_score = np.clip(np.random.normal(loc=0.94, scale=0.06), 0.80, 1.0)
        completion_rate = np.clip(np.random.normal(loc=0.98, scale=0.04), 0.90, 1.0)
        
        unusual_signal = 1.0 if (is_fast_expert and coding_time < 30.0) else 0.0

        records.append({
            "scroll_time": max(10.0, scroll_time),
            "topic_time": max(60.0, topic_time),
            "page_revisit_count": page_revisit_count,
            "mcq_time": max(20.0, mcq_time),
            "mcq_accuracy": mcq_accuracy,
            "coding_time": max(15.0, coding_time),
            "coding_attempts": coding_attempts,
            "coding_error_count": coding_error_count,
            "hint_count": hint_count,
            "explanation_request_count": explanation_request_count,
            "previous_topic_score": previous_topic_score,
            "current_topic_score": current_topic_score,
            "completion_rate": completion_rate,
            "unusual_completion_signal": unusual_signal,
            TARGET_NAME: "LOW"
        })

    # 2. MEDIUM Cognitive Load (Normal effort, engaged learning, few mistakes)
    for _ in range(per_class):
        scroll_time = np.random.normal(loc=110.0, scale=30.0)
        topic_time = np.random.normal(loc=650.0, scale=120.0)
        page_revisit_count = np.random.choice([1, 2, 3, 4], p=[0.40, 0.35, 0.18, 0.07])
        mcq_time = np.random.normal(loc=130.0, scale=35.0)
        mcq_accuracy = np.clip(np.random.normal(loc=0.72, scale=0.10), 0.55, 0.88)
        coding_time = np.random.normal(loc=380.0, scale=80.0)
        coding_attempts = np.random.choice([2, 3, 4, 5], p=[0.30, 0.40, 0.22, 0.08])
        coding_error_count = np.random.choice([1, 2, 3, 4], p=[0.25, 0.45, 0.20, 0.10])
        hint_count = np.random.choice([1, 2, 3], p=[0.55, 0.35, 0.10])
        explanation_request_count = np.random.choice([0, 1, 2], p=[0.35, 0.50, 0.15])
        previous_topic_score = np.clip(np.random.normal(loc=0.75, scale=0.12), 0.50, 0.92)
        current_topic_score = np.clip(np.random.normal(loc=0.74, scale=0.10), 0.55, 0.88)
        completion_rate = np.clip(np.random.normal(loc=0.88, scale=0.08), 0.70, 1.0)
        unusual_signal = 0.0

        records.append({
            "scroll_time": max(30.0, scroll_time),
            "topic_time": max(200.0, topic_time),
            "page_revisit_count": page_revisit_count,
            "mcq_time": max(40.0, mcq_time),
            "mcq_accuracy": mcq_accuracy,
            "coding_time": max(100.0, coding_time),
            "coding_attempts": coding_attempts,
            "coding_error_count": coding_error_count,
            "hint_count": hint_count,
            "explanation_request_count": explanation_request_count,
            "previous_topic_score": previous_topic_score,
            "current_topic_score": current_topic_score,
            "completion_rate": completion_rate,
            "unusual_completion_signal": unusual_signal,
            TARGET_NAME: "MEDIUM"
        })

    # 3. HIGH Cognitive Load (Struggling, high latency, errors, multiple hints)
    for _ in range(per_class):
        scroll_time = np.random.normal(loc=240.0, scale=70.0)
        topic_time = np.random.normal(loc=1250.0, scale=240.0)
        page_revisit_count = np.random.choice([3, 4, 5, 6, 7], p=[0.15, 0.30, 0.30, 0.15, 0.10])
        mcq_time = np.random.normal(loc=260.0, scale=60.0)
        mcq_accuracy = np.clip(np.random.normal(loc=0.42, scale=0.12), 0.10, 0.60)
        coding_time = np.random.normal(loc=720.0, scale=160.0)
        coding_attempts = np.random.choice([4, 5, 6, 7, 8, 9], p=[0.10, 0.20, 0.30, 0.20, 0.12, 0.08])
        coding_error_count = np.random.choice([4, 5, 6, 7, 8, 10], p=[0.15, 0.25, 0.25, 0.20, 0.10, 0.05])
        hint_count = np.random.choice([2, 3, 4, 5], p=[0.20, 0.40, 0.30, 0.10])
        explanation_request_count = np.random.choice([2, 3, 4, 5], p=[0.25, 0.40, 0.25, 0.10])
        previous_topic_score = np.clip(np.random.normal(loc=0.55, scale=0.15), 0.20, 0.75)
        current_topic_score = np.clip(np.random.normal(loc=0.45, scale=0.12), 0.15, 0.62)
        completion_rate = np.clip(np.random.normal(loc=0.60, scale=0.15), 0.25, 0.82)
        unusual_signal = 0.0

        records.append({
            "scroll_time": max(80.0, scroll_time),
            "topic_time": max(450.0, topic_time),
            "page_revisit_count": page_revisit_count,
            "mcq_time": max(80.0, mcq_time),
            "mcq_accuracy": mcq_accuracy,
            "coding_time": max(250.0, coding_time),
            "coding_attempts": coding_attempts,
            "coding_error_count": coding_error_count,
            "hint_count": hint_count,
            "explanation_request_count": explanation_request_count,
            "previous_topic_score": previous_topic_score,
            "current_topic_score": current_topic_score,
            "completion_rate": completion_rate,
            "unusual_completion_signal": unusual_signal,
            TARGET_NAME: "HIGH"
        })

    df = pd.DataFrame(records)
    # Shuffle dataset
    df = df.sample(frac=1.0, random_state=random_state).reset_index(drop=True)
    return df

if __name__ == "__main__":
    data = generate_cognitive_dataset()
    os.makedirs("data", exist_ok=True)
    data.to_csv("data/cognitive_behavior_dataset.csv", index=False)
    print(f"Generated {len(data)} cognitive telemetry records.")
    print(data[TARGET_NAME].value_counts())
