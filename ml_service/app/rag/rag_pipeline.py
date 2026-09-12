"""
RAG Orchestration Pipeline: Combines Vector Search, Semantic Filtering, and LLM Generation.
"""
from typing import Dict, Any, Optional

from .vector_store import vector_store
from .llm_service import llm_service

class RAGPipeline:
    def __init__(self):
        self.vector_store = vector_store
        self.llm = llm_service

    def answer_query(
        self,
        question: str,
        language: str = "python",
        level: str = "beginner",
        topic: str = "loops",
        cognitive_load: str = "MEDIUM",
        tutor_mode: str = "EXPLAIN",
        code_context: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        1. Queries vector index with metadata filters.
        2. Retrieves relevant chunks.
        3. Formats prompt conditioned on cognitive load and tutor mode.
        4. Synthesizes adaptive answer.
        """
        results = self.vector_store.search(
            query=f"{question} {topic} {language}",
            language=language,
            level=level,
            topic=topic,
            top_k=3
        )

        llm_response = self.llm.generate_adaptive_explanation(
            question=question,
            retrieved_contexts=results,
            language=language,
            topic=topic,
            level=level,
            cognitive_load=cognitive_load,
            tutor_mode=tutor_mode,
            code_context=code_context
        )

        return {
            "query": question,
            "language": language,
            "topic": topic,
            "cognitive_load": cognitive_load,
            "answer": llm_response["answer"],
            "sources": llm_response.get("sources", []),
            "retrieved_context_count": len(results)
        }

    def get_hint(
        self,
        question: str,
        code_snippet: str = "",
        hint_level: int = 1,
        topic: str = "general",
        language: str = "python"
    ) -> Dict[str, Any]:
        return self.llm.generate_progressive_hint(
            question=question,
            code_snippet=code_snippet,
            hint_level=hint_level,
            topic=topic,
            language=language
        )

# Global RAG singleton
rag_pipeline = RAGPipeline()
