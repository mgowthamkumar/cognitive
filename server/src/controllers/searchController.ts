import { Request, Response } from 'express';
import { initialCurriculum } from '../data/curriculum.js';

interface SearchResultItem {
  id: string;
  type: 'course' | 'topic' | 'question' | 'concept';
  title: string;
  subtitle: string;
  language?: string;
  level?: string;
  topic_id?: string;
  snippet?: string;
  matched_terms: string[];
}

const SYNONYM_DICTIONARY: Record<string, string[]> = {
  pointer: ['pointer', 'pointers', 'memory', 'malloc', 'address', 'dereference', 'heap', 'reference', 'dynamic memory'],
  pointers: ['pointer', 'pointers', 'memory', 'malloc', 'address', 'dereference', 'heap', 'reference', 'dynamic memory'],
  memory: ['memory', 'pointer', 'pointers', 'malloc', 'free', 'heap', 'stack', 'dynamic memory', 'allocation'],
  loop: ['loop', 'loops', 'iteration', 'for', 'while', 'iterate', 'range', 'repeat', 'traversal'],
  loops: ['loop', 'loops', 'iteration', 'for', 'while', 'iterate', 'range', 'repeat', 'traversal'],
  iteration: ['iteration', 'loop', 'loops', 'for', 'while', 'traverse', 'sequence'],
  function: ['function', 'functions', 'method', 'methods', 'def', 'procedure', 'routine', 'parameter', 'return'],
  functions: ['function', 'functions', 'method', 'methods', 'def', 'procedure', 'routine', 'parameter', 'return'],
  array: ['array', 'arrays', 'list', 'lists', 'vector', 'vectors', 'indexing', 'collection'],
  arrays: ['array', 'arrays', 'list', 'lists', 'vector', 'vectors', 'indexing', 'collection'],
  list: ['list', 'lists', 'array', 'arrays', 'vector', 'slice', 'collection'],
  oop: ['oop', 'class', 'classes', 'object', 'objects', 'inheritance', 'polymorphism', 'encapsulation'],
  class: ['class', 'classes', 'oop', 'object', 'inheritance', 'polymorphism', 'constructor'],
  recursion: ['recursion', 'recursive', 'base case', 'call stack', 'divide and conquer'],
  recursive: ['recursion', 'recursive', 'base case', 'call stack'],
  condition: ['condition', 'conditional', 'if', 'else', 'elif', 'branching', 'boolean'],
  string: ['string', 'strings', 'char', 'character', 'slice', 'text']
};

export const globalSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = (req.query.q as string || '').trim().toLowerCase();
    const language = (req.query.language as string || '').toLowerCase();

    if (!query) {
      res.json({ query: '', total: 0, results: [] });
      return;
    }

    // Expand search query with synonyms
    const searchTerms = new Set<string>([query]);
    const words = query.split(/\s+/);
    for (const w of words) {
      searchTerms.add(w);
      if (SYNONYM_DICTIONARY[w]) {
        SYNONYM_DICTIONARY[w].forEach(syn => searchTerms.add(syn.toLowerCase()));
      }
    }

    const termArray = Array.from(searchTerms);

    const matchesTerm = (text: string): string | null => {
      const lower = text.toLowerCase();
      for (const term of termArray) {
        if (lower.includes(term)) return term;
      }
      return null;
    };

    const results: SearchResultItem[] = [];

    // 1. Search Courses
    for (const course of initialCurriculum.courses) {
      if (language && course.language !== language) continue;
      const matched = matchesTerm(`${course.title} ${course.description} ${course.language}`);
      if (matched) {
        results.push({
          id: course.id,
          type: 'course',
          title: course.title,
          subtitle: `${course.language.toUpperCase()} • ${course.level.toUpperCase()} Course`,
          language: course.language,
          level: course.level,
          snippet: course.description,
          matched_terms: [matched]
        });
      }
    }

    // 2. Search Topics
    for (const topic of initialCurriculum.topics) {
      const module = initialCurriculum.modules.find(m => m.id === topic.module_id);
      const course = initialCurriculum.courses.find(c => c.id === module?.course_id);
      if (language && course && course.language !== language) continue;

      const searchableText = `${topic.title} ${topic.learning_objective} ${topic.content_standard} ${topic.syntax || ''} ${topic.common_mistakes || ''}`;
      const matched = matchesTerm(searchableText);
      if (matched) {
        results.push({
          id: topic.id,
          type: 'topic',
          title: topic.title,
          subtitle: `${course?.language.toUpperCase() || 'Language'} → ${module?.title || 'Core Module'}`,
          language: course?.language,
          level: course?.level,
          topic_id: topic.id,
          snippet: topic.learning_objective,
          matched_terms: [matched]
        });
      }
    }

    // 3. Search Questions (MCQs and Coding)
    for (const mcq of initialCurriculum.mcqQuestions) {
      const topic = initialCurriculum.topics.find(t => t.id === mcq.topic_id);
      const module = initialCurriculum.modules.find(m => m.id === topic?.module_id);
      const course = initialCurriculum.courses.find(c => c.id === module?.course_id);
      if (language && course && course.language !== language) continue;

      const matched = matchesTerm(`${mcq.question} ${mcq.explanation}`);
      if (matched) {
        results.push({
          id: mcq.id,
          type: 'question',
          title: `Quiz Question: ${mcq.question.slice(0, 60)}...`,
          subtitle: `${course?.language.toUpperCase() || ''} Quiz • ${topic?.title || ''}`,
          language: course?.language,
          topic_id: mcq.topic_id,
          snippet: mcq.explanation,
          matched_terms: [matched]
        });
      }
    }

    for (const cq of initialCurriculum.codingQuestions) {
      const topic = initialCurriculum.topics.find(t => t.id === cq.topic_id);
      const module = initialCurriculum.modules.find(m => m.id === topic?.module_id);
      const course = initialCurriculum.courses.find(c => c.id === module?.course_id);
      if (language && course && course.language !== language) continue;

      const matched = matchesTerm(`${cq.title} ${cq.problem_statement}`);
      if (matched) {
        results.push({
          id: cq.id,
          type: 'question',
          title: `Coding Challenge: ${cq.title}`,
          subtitle: `${course?.language.toUpperCase() || ''} Coding • Difficulty: ${cq.difficulty.toUpperCase()}`,
          language: course?.language,
          topic_id: cq.topic_id,
          snippet: cq.problem_statement.slice(0, 100) + '...',
          matched_terms: [matched]
        });
      }
    }

    // 4. Synthesized Concepts (Memory Management, Dynamic Allocation, Loops, Scope, OOP, etc.)
    const CONCEPTS = [
      { id: 'c-ptr', title: 'Pointers & Address Arithmetic', category: 'Memory Management', lang: 'c', topic_id: 'top-c-pointers', terms: ['pointer', 'pointers', 'address', 'dereference', 'memory'] },
      { id: 'c-malloc', title: 'Dynamic Heap Memory & Malloc', category: 'Memory Management', lang: 'c', topic_id: 'top-c-malloc', terms: ['malloc', 'free', 'dynamic memory', 'heap', 'pointer'] },
      { id: 'cpp-ptr', title: 'C++ References & Smart Pointers', category: 'Modern C++', lang: 'cpp', topic_id: 'top-cpp-oop', terms: ['pointer', 'reference', 'unique_ptr', 'memory'] },
      { id: 'py-loop', title: 'Loops, Iterables & Sequence Flow', category: 'Control Flow', lang: 'python', topic_id: 'top-py-loops', terms: ['loop', 'iteration', 'for', 'while', 'range'] },
      { id: 'py-func', title: 'Functions, Parameters & Return Scope', category: 'Modular Design', lang: 'python', topic_id: 'top-py-functions', terms: ['function', 'def', 'parameters', 'return', 'scope'] },
      { id: 'py-rec', title: 'Recursion, Call Stacks & Base Cases', category: 'Algorithmic Thinking', lang: 'python', topic_id: 'top-py-recursion', terms: ['recursion', 'recursive', 'base case', 'stack'] },
      { id: 'cpp-oop', title: 'Object-Oriented Encapsulation & Polymorphism', category: 'Object-Oriented', lang: 'cpp', topic_id: 'top-cpp-oop', terms: ['oop', 'class', 'polymorphism', 'inheritance'] },
      { id: 'java-oop', title: 'Java Classes, Interfaces & JVM Heap', category: 'Java Architecture', lang: 'java', topic_id: 'top-java-oop', terms: ['java', 'class', 'jvm', 'interface', 'oop'] }
    ];

    for (const conc of CONCEPTS) {
      if (language && conc.lang !== language) continue;
      const matched = matchesTerm(`${conc.title} ${conc.category} ${conc.terms.join(' ')}`);
      if (matched) {
        results.push({
          id: conc.id,
          type: 'concept',
          title: conc.title,
          subtitle: `Concept • ${conc.category} (${conc.lang.toUpperCase()})`,
          language: conc.lang,
          topic_id: conc.topic_id,
          snippet: `Core architectural concept in ${conc.lang.toUpperCase()} curricula.`,
          matched_terms: [matched]
        });
      }
    }

    res.json({
      query,
      expanded_synonyms: termArray,
      total: results.length,
      categories: {
        courses: results.filter(r => r.type === 'course').length,
        topics: results.filter(r => r.type === 'topic').length,
        questions: results.filter(r => r.type === 'question').length,
        concepts: results.filter(r => r.type === 'concept').length
      },
      results: results.slice(0, 30)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Global search failed' });
  }
};
