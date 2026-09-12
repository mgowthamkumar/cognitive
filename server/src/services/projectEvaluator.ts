import { ProjectRecord, ProjectEvaluationResult } from '../types.js';
import { codeSandbox, ExecutionResult } from './codeSandbox.js';

export class ProjectEvaluator {
  /**
   * Evaluates project submission according to Section 84:
   * Correctness (30%), Code Quality (15%), Complexity (15%), Test Cases (20%), Best Practices (10%), Concept Coverage (10%)
   */
  public async evaluateProject(
    project: ProjectRecord,
    code: string,
    userId: string
  ): Promise<ProjectEvaluationResult> {
    // 1. Run Automated Test Cases via Code Sandbox
    let execResult: ExecutionResult;
    try {
      execResult = await codeSandbox.evaluateCode(code, project.language, project.test_cases);
    } catch (err: any) {
      execResult = {
        status: 'RUNTIME_ERROR',
        passed_test_cases: 0,
        total_test_cases: project.test_cases.length,
        hidden_passed: 0,
        hidden_total: 0,
        execution_time_ms: 0,
        runtime_error: err.message || 'Execution failed',
        details: []
      };
    }

    // Test Cases Score (0 - 100)
    const testCasesTotal = (execResult.passed_test_cases + execResult.hidden_passed);
    const testCasesMax = (execResult.total_test_cases + execResult.hidden_total) || 1;
    const testCasePassRate = Math.round((testCasesTotal / testCasesMax) * 100);

    // 2. Correctness Score (0 - 100)
    // Functional correctness accounts for status and test pass rate
    const correctness = execResult.status === 'PASSED'
      ? 100
      : Math.max(10, Math.round(testCasePassRate * 0.9));

    // 3. Code Quality & Formatting Score (0 - 100)
    const qualityScore = this.evaluateCodeQuality(code, project.language);

    // 4. Complexity & Architecture Score (0 - 100)
    const complexityScore = this.evaluateComplexity(code, project.level, project.is_capstone);

    // 5. Best Practices & Idiomatic Conventions (0 - 100)
    const bestPracticesScore = this.evaluateBestPractices(code, project.language);

    // 6. Concept Coverage (0 - 100)
    const conceptCoverageScore = this.evaluateConceptCoverage(code, project.requirements);

    // Weighted Overall Score
    const weights = project.evaluation_criteria || {
      correctness_weight: 0.30,
      code_quality_weight: 0.15,
      complexity_weight: 0.15,
      test_cases_weight: 0.20,
      best_practices_weight: 0.10,
      concept_coverage_weight: 0.10
    };

    const overallScore = Math.round(
      correctness * weights.correctness_weight +
      qualityScore * weights.code_quality_weight +
      complexityScore * weights.complexity_weight +
      testCasePassRate * weights.test_cases_weight +
      bestPracticesScore * weights.best_practices_weight +
      conceptCoverageScore * weights.concept_coverage_weight
    );

    const passed = overallScore >= 65 && testCasePassRate >= 50;

    // Construct Detailed Rubric Feedback
    const detailedRubric = [
      {
        criterion: 'Functional Correctness (30%)',
        score: correctness,
        max_score: 100,
        feedback: correctness >= 85
          ? 'Solution handles specified boundary conditions and operational requirements accurately.'
          : 'Encountered test deviations or execution warnings during automated runs.'
      },
      {
        criterion: 'Automated Test Cases (20%)',
        score: testCasePassRate,
        max_score: 100,
        feedback: `${testCasesTotal}/${testCasesMax} test cases verified successfully.`
      },
      {
        criterion: 'Code Quality & Clean Architecture (15%)',
        score: qualityScore,
        max_score: 100,
        feedback: qualityScore >= 80
          ? 'Clean identifier naming, modular decomposition, and readable formatting.'
          : 'Consider decomposing long blocks into focused helper functions.'
      },
      {
        criterion: 'Algorithmic Complexity & Performance (15%)',
        score: complexityScore,
        max_score: 100,
        feedback: complexityScore >= 80
          ? 'Demonstrates optimal data structures and scalable design.'
          : 'Look for opportunities to minimize redundant loops or allocations.'
      },
      {
        criterion: 'Language Best Practices & Safety (10%)',
        score: bestPracticesScore,
        max_score: 100,
        feedback: bestPracticesScore >= 85
          ? 'Follows standard language idioms, memory safety, and exception discipline.'
          : 'Ensure proper exception handling and defensive argument validation.'
      },
      {
        criterion: 'Syllabus Concept Coverage (10%)',
        score: conceptCoverageScore,
        max_score: 100,
        feedback: conceptCoverageScore >= 80
          ? 'Successfully incorporates the targeted curriculum paradigms.'
          : 'Ensure all milestone requirements are explicitly implemented.'
      }
    ];

    let overallFeedback = '';
    if (passed) {
      overallFeedback = overallScore >= 90
        ? `Outstanding execution on ${project.title}! Your code exemplifies professional EdTech standards with rigorous test verification.`
        : `Congratulations! You successfully completed ${project.title}. Review the rubric recommendations below to refine your solution further.`;
    } else {
      overallFeedback = `Good effort on ${project.title}. Your solution scored ${overallScore}%. Focus on fixing failing test assertions and checking milestone hints to achieve full certification.`;
    }

    return {
      project_id: project.id,
      user_id: userId,
      overall_score: overallScore,
      passed,
      correctness,
      code_quality: qualityScore,
      complexity: complexityScore,
      test_case_score: testCasePassRate,
      best_practices: bestPracticesScore,
      concept_coverage: conceptCoverageScore,
      feedback: overallFeedback,
      detailed_rubric: detailedRubric,
      submitted_at: new Date().toISOString()
    };
  }

  private evaluateCodeQuality(code: string, lang: string): number {
    let score = 75;
    const lines = code.split('\n');
    const nonEmptyLines = lines.filter(l => l.trim().length > 0);

    // Code length heuristics
    if (nonEmptyLines.length >= 15) score += 10;
    if (nonEmptyLines.length >= 35) score += 5;

    // Comments and docstrings
    const hasComments = lines.some(l => l.trim().startsWith('#') || l.trim().startsWith('//') || l.includes('/*'));
    if (hasComments) score += 5;

    // Modular structure (functions or classes)
    if (code.includes('def ') || code.includes('class ') || code.includes('void ') || code.includes('int ') || code.includes('public ')) {
      score += 5;
    }

    return Math.min(100, Math.max(30, score));
  }

  private evaluateComplexity(code: string, level: string, isCapstone: boolean): number {
    let score = 70;
    if (isCapstone) score = 65;

    // Detect algorithmic control structures
    const hasLoops = code.includes('for ') || code.includes('while ') || code.includes('for(');
    const hasConditionals = code.includes('if ') || code.includes('if(');
    const hasDataStructures = code.includes('dict') || code.includes('list') || code.includes('vector') || code.includes('map') || code.includes('struct');

    if (hasLoops) score += 10;
    if (hasConditionals) score += 10;
    if (hasDataStructures) score += 10;

    return Math.min(100, Math.max(35, score));
  }

  private evaluateBestPractices(code: string, lang: string): number {
    let score = 80;

    // Penalize anti-patterns
    if (lang === 'python') {
      if (code.includes('except:')) score -= 15; // bare except
      if (code.includes('import *')) score -= 10; // wildcard import
    }
    if (lang === 'c' || lang === 'cpp') {
      if (code.includes('goto ')) score -= 15;
    }

    // Reward defensive checks
    if (code.includes('try') || code.includes('catch') || code.includes('null') || code.includes('None') || code.includes('nullptr')) {
      score += 15;
    }

    return Math.min(100, Math.max(40, score));
  }

  private evaluateConceptCoverage(code: string, requirements: string[]): number {
    if (!requirements || requirements.length === 0) return 85;
    let matched = 0;
    const lowerCode = code.toLowerCase();

    for (const req of requirements) {
      const keywords = req.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const isPresent = keywords.some(k => lowerCode.includes(k));
      if (isPresent) matched++;
    }

    const ratio = matched / requirements.length;
    return Math.round(50 + (ratio * 50));
  }
}

export const projectEvaluator = new ProjectEvaluator();
