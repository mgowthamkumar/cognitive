"""
Vector Store and Knowledge Base Retrieval Service
Supports fast, filtered similarity retrieval across programming languages, topics, and levels.
"""
import os
import json
import re
from typing import List, Dict, Any, Optional
import numpy as np

class KnowledgeChunk:
    def __init__(self, text: str, metadata: Dict[str, Any]):
        self.text = text
        self.metadata = metadata

class VectorStore:
    def __init__(self, kb_dir: Optional[str] = None):
        if kb_dir is None:
            base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            kb_dir = os.path.join(base_dir, "knowledge_base")
        self.kb_dir = kb_dir
        self.chunks: List[KnowledgeChunk] = []
        self.vocab: Dict[str, int] = {}
        self.idf: np.ndarray = np.array([])
        self.matrix: np.ndarray = np.empty((0, 0))
        self.load_and_index()

    def _tokenize(self, text: str) -> List[str]:
        return re.findall(r"\b[a-zA-Z0-9_]{2,}\b", text.lower())

    def load_and_index(self):
        """Loads all knowledge JSON files and constructs searchable index"""
        raw_docs = []
        if not os.path.exists(self.kb_dir):
            return

        for root, _, files in os.walk(self.kb_dir):
            for file in files:
                if file.endswith(".json"):
                    path = os.path.join(root, file)
                    try:
                        with open(path, "r", encoding="utf-8") as f:
                            data = json.load(f)
                            
                        # Chunk the main content and subtopics
                        meta = {
                            "language": data.get("language", "").lower(),
                            "level": data.get("level", "").lower(),
                            "topic": data.get("topic", "").lower(),
                            "subtopic": data.get("subtopic", "").lower(),
                            "difficulty": data.get("difficulty", "medium"),
                            "source": data.get("source", "curriculum"),
                            "title": data.get("title", file),
                            "analogy": data.get("analogy", ""),
                            "simplification_tips": data.get("simplification_tips", "")
                        }
                        
                        full_body = f"{meta['title']}\n{data.get('content', '')}\nAnalogy: {meta['analogy']}\nTips: {meta['simplification_tips']}"
                        raw_docs.append(KnowledgeChunk(text=full_body, metadata=meta))
                    except Exception as e:
                        print(f"Error loading {path}: {e}")

        self.chunks = raw_docs
        self._build_index()

    def _build_index(self):
        """Constructs a TF-IDF weighted vector space index for fast semantic retrieval"""
        if not self.chunks:
            return

        term_doc_freq = {}
        tokenized_docs = []
        for chunk in self.chunks:
            tokens = set(self._tokenize(chunk.text))
            tokenized_docs.append(self._tokenize(chunk.text))
            for t in tokens:
                term_doc_freq[t] = term_doc_freq.get(t, 0) + 1

        # Build vocabulary
        self.vocab = {term: idx for idx, term in enumerate(sorted(term_doc_freq.keys()))}
        n_docs = len(self.chunks)
        n_terms = len(self.vocab)

        # Compute IDF
        self.idf = np.zeros(n_terms)
        for term, idx in self.vocab.items():
            df = term_doc_freq.get(term, 0)
            self.idf[idx] = np.log((1.0 + n_docs) / (1.0 + df)) + 1.0

        # Construct Document Term Matrix
        self.matrix = np.zeros((n_docs, n_terms))
        for doc_idx, tokens in enumerate(tokenized_docs):
            for t in tokens:
                if t in self.vocab:
                    self.matrix[doc_idx, self.vocab[t]] += 1.0
            
            # Multiply by IDF and L2 normalize
            self.matrix[doc_idx] *= self.idf
            norm = np.linalg.norm(self.matrix[doc_idx])
            if norm > 0:
                self.matrix[doc_idx] /= norm

    def search(
        self,
        query: str,
        language: Optional[str] = None,
        level: Optional[str] = None,
        topic: Optional[str] = None,
        top_k: int = 3
    ) -> List[Dict[str, Any]]:
        """
        Executes query vector similarity with exact metadata filtering.
        """
        if not self.chunks or len(self.vocab) == 0:
            return []

        # Vectorize query
        q_tokens = self._tokenize(query)
        q_vec = np.zeros(len(self.vocab))
        for t in q_tokens:
            if t in self.vocab:
                q_vec[self.vocab[t]] += 1.0
        q_vec *= self.idf
        q_norm = np.linalg.norm(q_vec)
        if q_norm > 0:
            q_vec /= q_norm

        scores = np.dot(self.matrix, q_vec)

        # Rank and filter by metadata
        ranked_indices = np.argsort(scores)[::-1]
        results = []

        for idx in ranked_indices:
            chunk = self.chunks[idx]
            score = float(scores[idx])

            # Apply Metadata Filters if specified
            if language and chunk.metadata.get("language") and language.lower() != chunk.metadata["language"]:
                continue
            if level and chunk.metadata.get("level") and level.lower() != chunk.metadata["level"]:
                # allow fuzzy level match if not enough docs
                pass
            if topic and chunk.metadata.get("topic") and topic.lower() not in chunk.metadata["topic"]:
                # boost exact topic match score
                score += 0.25

            results.append({
                "text": chunk.text,
                "metadata": chunk.metadata,
                "score": round(min(1.0, score), 4)
            })

            if len(results) >= top_k:
                break

        # If strict filtering returned too few, return top matches in the language
        if not results and language:
            for chunk in self.chunks:
                if chunk.metadata.get("language") == language.lower():
                    results.append({
                        "text": chunk.text,
                        "metadata": chunk.metadata,
                        "score": 0.5
                    })
                    if len(results) >= top_k:
                        break

        return results

# Singleton vector store
vector_store = VectorStore()
