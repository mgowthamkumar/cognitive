"""
FastAPI Microservice for Cognitive Load Prediction and Adaptive RAG Engine
"""
import os
import sys
from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Ensure local imports work reliably
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from ml.predict import predictor
from rag.rag_pipeline import rag_pipeline

app = FastAPI(
    title="Cognitive-Load-Aware Adaptive Engine API",
    description="Microservice providing ML-driven Cognitive Load Prediction and RAG explanations",
    version="1.0.0"
)

# Enable CORS for Frontend & Backend Gateway
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TelemetryPayload(BaseModel):
    scroll_time: Optional[float] = Field(default=0.0, description="Seconds spent scrolling/reading")
    topic_time: Optional[float] = Field(default=0.0, description="Total seconds on topic")
    page_revisit_count: Optional[int] = Field(default=0, description="Number of revisits to previous sections")
    mcq_time: Optional[float] = Field(default=0.0, description="Seconds spent on MCQs")
    mcq_accuracy: Optional[float] = Field(default=0.0, description="MCQ accuracy (0.0 - 1.0)")
    coding_time: Optional[float] = Field(default=0.0, description="Seconds spent coding")
    coding_attempts: Optional[int] = Field(default=0, description="Code submissions count")
    coding_error_count: Optional[int] = Field(default=0, description="Compilation/runtime errors")
    hint_count: Optional[int] = Field(default=0, description="Hints requested")
    explanation_request_count: Optional[int] = Field(default=0, description="AI explanations requested")
    previous_topic_score: Optional[float] = Field(default=0.75, description="Previous topic mastery")
    current_topic_score: Optional[float] = Field(default=0.0, description="Current topic score")
    completion_rate: Optional[float] = Field(default=0.0, description="Fraction of lesson completed")
    unusual_completion_signal: Optional[float] = Field(default=0.0, description="Fast completion flag")
    keystroke_count: Optional[int] = Field(default=50, description="Keystrokes in code editor")
    paste_events: Optional[int] = Field(default=0, description="Paste events detected")

class RAGQueryPayload(BaseModel):
    question: str
    language: Optional[str] = "python"
    level: Optional[str] = "beginner"
    topic: Optional[str] = "loops"
    cognitive_load: Optional[str] = "MEDIUM"

class HintRequestPayload(BaseModel):
    question: str
    code_snippet: Optional[str] = ""
    hint_level: Optional[int] = 1
    topic: Optional[str] = "general"
    language: Optional[str] = "python"

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Cognitive Load ML & RAG Engine",
        "ml_model_loaded": predictor.is_ready(),
        "vector_chunks_indexed": len(rag_pipeline.vector_store.chunks)
    }

@app.post("/api/ml/predict-cognitive-load")
def predict_cognitive_load(payload: TelemetryPayload):
    """
    Section 24: Predicts LOW, MEDIUM, or HIGH cognitive load based on learner behavioral telemetry.
    """
    try:
        data_dict = payload.model_dump()
        result = predictor.predict(data_dict)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/ml/metrics")
def get_ml_metrics():
    """
    Returns comparative performance metrics of all 4 models for the Admin Dashboard.
    """
    if not predictor.metrics:
        raise HTTPException(status_code=404, detail="Model metrics not found. Run training script first.")
    return predictor.metrics

@app.post("/api/ml/retrain")
def retrain_ml_models():
    """
    Retrains all 4 models (Logistic Regression, Decision Tree, Random Forest, Gradient Boosting),
    evaluates performance, saves artifacts, and reloads the active predictor live in memory.
    """
    try:
        from ml.train_model import train_and_evaluate_all
        metrics = train_and_evaluate_all()
        predictor.load()
        return {
            "status": "success",
            "message": "Models successfully retrained and reloaded in memory.",
            "metrics": metrics
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model retraining failed: {str(e)}")

@app.post("/api/rag/reindex")
def reindex_rag_knowledge():
    """
    Re-indexes all knowledge base files for Python, C, C++, and Java live into the vector store.
    """
    try:
        rag_pipeline.vector_store.load_and_index()
        return {
            "status": "success",
            "message": f"Successfully re-indexed {len(rag_pipeline.vector_store.chunks)} knowledge chunks."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Knowledge re-indexing failed: {str(e)}")

@app.post("/api/rag/ask")
def ask_rag(payload: RAGQueryPayload):
    """
    Section 25: RAG query filtered by language, topic, level, and conditioned on cognitive load.
    """
    try:
        response = rag_pipeline.answer_query(
            question=payload.question,
            language=payload.language,
            level=payload.level,
            topic=payload.topic,
            cognitive_load=payload.cognitive_load
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/rag/progressive-hint")
def progressive_hint(payload: HintRequestPayload):
    """
    Section 14: Progressive 4-tier hints (Conceptual -> Approach -> Pseudocode -> Code Skeleton).
    """
    try:
        hint_data = rag_pipeline.get_hint(
            question=payload.question,
            code_snippet=payload.code_snippet or "",
            hint_level=payload.hint_level or 1,
            topic=payload.topic or "general",
            language=payload.language or "python"
        )
        return hint_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
