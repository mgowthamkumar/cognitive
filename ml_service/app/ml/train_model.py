"""
Model Training and Comparison Pipeline for Cognitive Load Prediction
Trains:
1. Logistic Regression
2. Decision Tree
3. Random Forest
4. Gradient Boosting

Evaluates Accuracy, Precision, Recall, F1-Score, Confusion Matrix & Feature Importance.
Selects and exports the best model into ml_service/models/.
"""
import os
import json
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any

from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from .features import FEATURE_NAMES, TARGET_NAME, CLASS_NAMES, CLASS_TO_IDX, IDX_TO_CLASS
    from .generate_dataset import generate_cognitive_dataset
except (ImportError, ValueError):
    from features import FEATURE_NAMES, TARGET_NAME, CLASS_NAMES, CLASS_TO_IDX, IDX_TO_CLASS
    from generate_dataset import generate_cognitive_dataset

def train_and_evaluate_all():
    print("=== 1. Generating Ground Truth Behavioral Dataset ===")
    df = generate_cognitive_dataset(n_samples=3600, random_state=42)
    
    X = df[FEATURE_NAMES]
    y_str = df[TARGET_NAME]
    y = y_str.map(CLASS_TO_IDX).values

    print(f"Dataset shape: {X.shape}, Class distribution: {dict(pd.Series(y).value_counts())}")

    # Strict Featurization Ordering: Split train and test before fitting scaler
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Candidate Models
    models: Dict[str, Any] = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42, C=1.0),
        "Decision Tree": DecisionTreeClassifier(max_depth=6, min_samples_split=8, random_state=42),
        "Random Forest": RandomForestClassifier(n_estimators=120, max_depth=8, random_state=42, n_jobs=-1),
        "Gradient Boosting": GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=4, random_state=42)
    }

    results = {}
    best_model_name = None
    best_f1 = -1.0
    best_model = None

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    print("\n=== 2. Training and Comparing Supervised ML Models ===")
    for name, model in models.items():
        # Train
        model.fit(X_train_scaled, y_train)
        
        # Predictions
        y_pred = model.predict(X_test_scaled)
        
        # Metrics
        acc = float(accuracy_score(y_test, y_pred))
        prec = float(precision_score(y_test, y_pred, average="macro"))
        rec = float(recall_score(y_test, y_pred, average="macro"))
        f1 = float(f1_score(y_test, y_pred, average="macro"))
        cm = confusion_matrix(y_test, y_pred).tolist()
        
        # Cross validation score
        cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=cv, scoring="f1_macro")
        cv_mean = float(np.mean(cv_scores))

        # Per class F1
        per_class_f1 = {
            CLASS_NAMES[i]: float(f1_score(y_test, y_pred, labels=[i], average="micro"))
            for i in range(len(CLASS_NAMES))
        }

        # Feature importances or weights
        feature_importance = {}
        if hasattr(model, "feature_importances_"):
            for feat, imp in zip(FEATURE_NAMES, model.feature_importances_):
                feature_importance[feat] = round(float(imp), 4)
        elif hasattr(model, "coef_"):
            mean_coefs = np.mean(np.abs(model.coef_), axis=0)
            for feat, imp in zip(FEATURE_NAMES, mean_coefs):
                feature_importance[feat] = round(float(imp), 4)

        results[name] = {
            "accuracy": round(acc, 4),
            "precision": round(prec, 4),
            "recall": round(rec, 4),
            "f1_score": round(f1, 4),
            "cv_f1_mean": round(cv_mean, 4),
            "per_class_f1": per_class_f1,
            "confusion_matrix": cm,
            "feature_importance": feature_importance
        }

        print(f"[{name}] Acc: {acc:.4f} | Prec: {prec:.4f} | Rec: {rec:.4f} | F1: {f1:.4f} | CV F1: {cv_mean:.4f}")

        # Choose model with best generalization (cross-validated F1, then test F1)
        model_score = (cv_mean * 10.0) + f1
        if model_score > best_f1:
            best_f1 = model_score
            best_model_name = name
            best_model = model

    optimal_f1 = results[best_model_name]["f1_score"]
    print(f"\nOptimal Model Selected: {best_model_name} (F1: {optimal_f1:.4f})")

    # Serialize Best Model, Scaler, and Evaluation Summary
    # Find base models directory
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    models_dir = os.path.join(base_dir, "models")
    os.makedirs(models_dir, exist_ok=True)

    joblib.dump(best_model, os.path.join(models_dir, "model.pkl"))
    joblib.dump(scaler, os.path.join(models_dir, "scaler.pkl"))

    metrics_payload = {
        "best_model": best_model_name,
        "best_f1": round(optimal_f1, 4),
        "class_labels": CLASS_NAMES,
        "feature_names": FEATURE_NAMES,
        "models_comparison": results,
        "total_training_samples": len(X_train),
        "total_test_samples": len(X_test)
    }

    metrics_file = os.path.join(models_dir, "metrics.json")
    with open(metrics_file, "w", encoding="utf-8") as f:
        json.dump(metrics_payload, f, indent=2)

    print(f"Model saved to {os.path.join(models_dir, 'model.pkl')}")
    print(f"Scaler saved to {os.path.join(models_dir, 'scaler.pkl')}")
    print(f"Metrics saved to {metrics_file}")
    return metrics_payload

if __name__ == "__main__":
    train_and_evaluate_all()
