"""
Comprehensive End-to-End Integration Test Suite for Cognitive-Load-Aware Adaptive Learning Engine
"""
import urllib.request
import urllib.parse
import json
import time
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:5000/api"
ML_URL = "http://127.0.0.1:8000"

def request(url, method="GET", data=None, token=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    encoded_data = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=encoded_data, headers=headers, method=method)
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_body = response.read().decode("utf-8")
            return response.status, json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        return e.code, json.loads(err_body) if err_body else {"error": str(e)}

def run_tests():
    print("==================================================================")
    print("🚀 STARTING E2E INTEGRATION VERIFICATION")
    print("==================================================================")

    # 1. Health Checks
    print("\n--- 1. Service Health Probes ---")
    status, res = request(f"{ML_URL}/health")
    assert status == 200, f"ML Service unhealthy: {res}"
    print(f"✓ ML Service Healthy: model_loaded={res.get('ml_model_loaded')}, indexed_chunks={res.get('vector_chunks_indexed')}")

    status, res = request(f"http://127.0.0.1:5000/health")
    assert status == 200, f"Backend Gateway unhealthy: {res}"
    print(f"✓ Backend Gateway Healthy: uptime={res.get('uptime')}s")

    # 2. Authentication
    print("\n--- 2. User Registration & Login (JWT) ---")
    test_user = {
        "name": "Integration Tester",
        "email": f"test_{int(time.time())}@cognitive.edu",
        "password": "secure_password_123"
    }
    status, reg_res = request(f"{BASE_URL}/auth/register", method="POST", data=test_user)
    assert status == 201, f"Registration failed: {reg_res}"
    token = reg_res["token"]
    user_id = reg_res["user"]["id"]
    print(f"✓ Registered Learner: {test_user['name']} (ID: {user_id})")

    status, me_res = request(f"{BASE_URL}/auth/me", method="GET", token=token)
    assert status == 200 and me_res["user"]["email"] == test_user["email"]
    print(f"✓ Authenticated Me Profile verified successfully")

    # 3. Courses and Curriculum
    print("\n--- 3. Multi-Language Curriculum Hierarchy ---")
    status, courses = request(f"{BASE_URL}/courses?language=python&level=beginner")
    assert status == 200 and len(courses) > 0, "Failed to fetch Python beginner courses"
    print(f"✓ Found {len(courses)} Python beginner courses: {courses[0]['title']}")

    status, structure = request(f"{BASE_URL}/courses/{courses[0]['id']}")
    assert status == 200 and len(structure["modules"]) > 0, "Failed to load course modules"
    first_topic = structure["modules"][0]["topics"][0]
    print(f"✓ Module: '{structure['modules'][0]['title']}' contains Topic: '{first_topic['title']}' (ID: {first_topic['id']})")

    # 4. Behavioral Telemetry Event Ingestion (Section 23)
    print("\n--- 4. Behavioral Telemetry Event Ingestion (Section 23) ---")
    event_payload = {
        "topic_id": first_topic["id"],
        "event_type": "SCROLL",
        "duration": 45,
        "metadata": {"scroll_depth": 0.85}
    }
    status, evt_res = request(f"{BASE_URL}/behavior/event", method="POST", data=event_payload, token=token)
    assert status == 201, f"Event logging failed: {evt_res}"
    print(f"✓ Logged Behavioral Telemetry: event_type=SCROLL duration=45s")

    # 5. MCQ Assessment & Real-Time Cognitive Load Trigger
    print("\n--- 5. Topic MCQ Assessment & Cognitive Load Analysis ---")
    status, quiz_data = request(f"{BASE_URL}/topics/{first_topic['id']}/quiz")
    questions = quiz_data["questions"] if isinstance(quiz_data, dict) and "questions" in quiz_data else quiz_data
    assert status == 200 and len(questions) >= 3, f"Quiz not found: {quiz_data}"
    target_tier = quiz_data.get("target_difficulty", "standard") if isinstance(quiz_data, dict) else "standard"
    print(f"✓ Smart Quiz Engine: Loaded {len(questions)} questions (Target Tier: {target_tier.upper()}) for {first_topic['title']}")

    # Submit quiz answers
    answers = {questions[0]["id"]: 1, questions[1]["id"]: 1, questions[2]["id"]: 1}
    status, quiz_eval = request(f"{BASE_URL}/topics/{first_topic['id']}/quiz/submit", method="POST", data={"answers": answers, "time_spent": 35}, token=token)
    assert status == 200, f"Quiz submission failed: {quiz_eval}"
    print(f"✓ Quiz Evaluated: Score={quiz_eval['score']}% (Passed: {quiz_eval['passed']})")
    print(f"✓ Real-time Adaptive Feedback: Action={quiz_eval['adaptive_feedback']['recommended_action']}, Load={quiz_eval['adaptive_feedback']['cognitive_level']}")

    # 6. Sandboxed Code Execution
    print("\n--- 6. Sandboxed Code Execution (Python & C) ---")
    py_code = """
import sys
input_data = sys.stdin.read().strip()
nums = [int(x) for x in input_data.split()] if input_data else []
even_sum = sum(x for x in nums if x % 2 == 0)
print(even_sum)
"""
    status, submit_res = request(f"{BASE_URL}/code/submit", method="POST", data={
        "topicId": first_topic["id"],
        "code": py_code,
        "language": "python",
        "codingTimeSeconds": 45,
        "keystrokes": 120,
        "pasteEvents": 0
    }, token=token)
    assert status == 200, f"Code submission failed: {submit_res}"
    exec_info = submit_res["execution"]
    print(f"✓ Python Sandbox Result: Status={exec_info['status']}, Passed Tests={exec_info['passed_test_cases']}/{exec_info['total_test_cases']}, Hidden Passed={exec_info['hidden_passed']}/{exec_info['hidden_total']}")

    # Test C Code Runner with g++
    c_code = """
#include <stdio.h>
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}
int main() {
    int x, y;
    if (scanf("%d %d", &x, &y) == 2) {
        swap(&x, &y);
        printf("%d %d\\n", x, y);
    }
    return 0;
}
"""
    status, c_res = request(f"{BASE_URL}/code/submit", method="POST", data={
        "topicId": "top-c-pointers",
        "code": c_code,
        "language": "c",
        "codingTimeSeconds": 60,
        "keystrokes": 95,
        "pasteEvents": 0
    }, token=token)
    assert status == 200, f"C submission failed: {c_res}"
    print(f"✓ C Compiler Sandbox Result: Status={c_res['execution']['status']}, Execution Time={c_res['execution']['execution_time_ms']}ms")

    # 7. AI Copilot, 8 Explicit Tutor Modes & 5-Tier Progressive Hints (Sections 52, 53, 54)
    print("\n--- 7. AI Copilot, 8 Tutor Modes & 5-Tier Progressive Hints (Sections 52, 53, 54) ---")
    for tier in [1, 2, 3, 4, 5]:
        status, hint_res = request(f"{BASE_URL}/ai/hint", method="POST", data={
            "question": "How do I filter even numbers?",
            "hint_level": tier,
            "topic": first_topic["id"],
            "language": "python"
        }, token=token)
        assert status == 200, f"Tier {tier} hint failed: {hint_res}"
        print(f"✓ Tier {tier} Hint ({hint_res['stage']}): {hint_res['hint_text'][:70]}...")

    # Explicit AI Tutor Mode (SIMPLIFY, DEBUG, REVISE)
    for mode in ["SIMPLIFY", "DEBUG", "REVISE"]:
        status, tutor_res = request(f"{BASE_URL}/ai/ask", method="POST", data={
            "question": "What is variable scoping in loops?",
            "language": "python",
            "level": "beginner",
            "topic": first_topic["id"],
            "tutor_mode": mode,
            "cognitive_load": "HIGH"
        }, token=token)
        assert status == 200 and "answer" in tutor_res, f"Tutor mode {mode} failed: {tutor_res}"
        citations = tutor_res.get("sources_used", [])
        print(f"✓ AI Tutor Mode '{mode}' (HIGH load, citations={len(citations)}): {tutor_res['answer'][:70]}...")

    # 8. Error-Based Learning & Classification (Section 58)
    print("\n--- 8. Error-Based Learning & Error Classification (Section 58) ---")
    bad_syntax_code = "def broken(:\n    return 1"
    status, err_res = request(f"{BASE_URL}/code/submit", method="POST", data={
        "topicId": first_topic["id"],
        "code": bad_syntax_code,
        "language": "python",
        "codingTimeSeconds": 10,
        "keystrokes": 15,
        "pasteEvents": 0
    }, token=token)
    assert status == 200, f"Error classification run failed: {err_res}"
    assert err_res.get("error_classification") is not None, "Missing error classification in result"
    err_cat = err_res["error_classification"]["category"]
    print(f"✓ Detected Error Category: {err_cat} | Diagnosis: {err_res['error_classification']['diagnosis'][:60]}...")

    # 9. Dashboard Command Center & Dynamic Roadmaps (Sections 43, 44, 46)
    print("\n--- 9. Platform Stats, Dashboard Snapshot & Roadmaps (Sections 43, 44, 46) ---")
    status, stats_res = request(f"{BASE_URL}/stats/platform")
    assert status == 200 and "total_topics" in stats_res, f"Platform stats failed: {stats_res}"
    print(f"✓ Platform Public Stats: Topics={stats_res['total_topics']}, Questions={stats_res['total_questions']}, Languages={stats_res['languages_count']}")

    status, dash_snap = request(f"{BASE_URL}/dashboard/snapshot", token=token)
    assert status == 200 and "snapshot" in dash_snap, f"Dashboard snapshot failed: {dash_snap}"
    overall_prog = dash_snap.get("learning_snapshot", {}).get("overall_progress", 0)
    streak = dash_snap.get("streak_days", 0)
    quiz_acc = dash_snap.get("learning_snapshot", {}).get("quiz_accuracy", 0)
    print(f"✓ Learner Snapshot: Progress={overall_prog}%, Streak={streak}d, Quizzes={quiz_acc}%")
    rec_reason = dash_snap.get("ai_recommendation", {}).get("reason", "")[:60]
    rec_action = dash_snap.get("ai_recommendation", {}).get("action", "CONTINUE")
    print(f"✓ AI Recommendation: {rec_action} - {rec_reason}...")

    status, roadmap_res = request(f"{BASE_URL}/dashboard/roadmap/python", token=token)
    assert status == 200 and "roadmap" in roadmap_res, f"Python roadmap failed: {roadmap_res}"
    print(f"✓ Visual Roadmap: {len(roadmap_res['roadmap'])} nodes across levels (First: {roadmap_res['roadmap'][0]['title']} status={roadmap_res['roadmap'][0]['status']})")

    # 10. Learner Adaptive Feedback Tracking (Section 79)
    print("\n--- 10. Adaptive Feedback Tracking (Section 79) ---")
    status, feed_res = request(f"{BASE_URL}/feedback/submit", method="POST", data={
        "topic_id": first_topic["id"],
        "feedback": "yes",
        "comment": "The micro-learning breakdown helped clarify the condition syntax!"
    }, token=token)
    assert status == 200 and feed_res.get("success"), f"Feedback submission failed: {feed_res}"
    print(f"✓ User Feedback Registered: Recorded successfully for {first_topic['id']}")

    # 11. Admin & ML Analytics Dashboard (Section 19 & 72)
    print("\n--- 11. Admin Analytics & Model Validation Metrics (Sections 19, 72) ---")
    status, ml_metrics = request(f"{BASE_URL}/admin/ml-metrics")
    assert status == 200, f"ML metrics failed: {ml_metrics}"
    best_model = ml_metrics["best_model"]
    print(f"✓ Champion Model: {best_model} (F1 Score: {ml_metrics['best_f1']})")
    print(f"✓ Models Compared: {list(ml_metrics['models_comparison'].keys())}")
    print(f"✓ Feature Importances: {list(ml_metrics['models_comparison'][best_model]['feature_importance'].keys())[:5]}")

    status, admin_stats = request(f"{BASE_URL}/admin/analytics")
    assert status == 200, f"Admin stats failed: {admin_stats}"
    print(f"✓ Cohort Telemetry Events Tracked: {admin_stats.get('total_telemetry_events')}")
    print(f"✓ Cognitive Load Distribution: {admin_stats.get('cognitive_load_distribution')}")

    # 12. Project-Based Learning, Multi-Criteria Evaluation & Integrity Signals (Sections 82-84, 94)
    print("\n--- 12. Project-Based Learning & Rubric Evaluation (Sections 82-84, 94) ---")
    status, proj_list = request(f"{BASE_URL}/projects?language=python", token=token)
    assert status == 200 and "projects" in proj_list, f"Projects list failed: {proj_list}"
    projects = proj_list["projects"]
    assert len(projects) > 0, "No Python projects found"
    print(f"✓ Discovered {len(projects)} Python curriculum projects & capstones (First: '{projects[0]['title']}', Level: {projects[0]['level']})")

    calc_proj = next((p for p in projects if p["id"] == "proj-py-calculator"), projects[0])
    status, proj_detail = request(f"{BASE_URL}/projects/{calc_proj['id']}", token=token)
    assert status == 200 and "project" in proj_detail, f"Project detail failed: {proj_detail}"
    p_obj = proj_detail["project"]
    print(f"✓ Loaded Project Details for '{p_obj['title']}': Milestones={len(p_obj['milestones'])}, Test Cases={len(p_obj['test_cases'])}")

    # Submit solution for automated 6-tier rubric evaluation
    calc_code = """
def calculate(op, a, b):
    # Arithmetic evaluation engine
    if op == '+':
        return a + b
    elif op == '-':
        return a - b
    elif op == '*':
        return a * b
    elif op == '/':
        if b == 0:
            return "Error: Division by zero"
        return a / b
    return "Error: Unknown operation"

# Test invocation matching sample
import sys
if __name__ == '__main__':
    lines = sys.stdin.read().strip().splitlines()
    if lines:
        parts = lines[0].split()
        if len(parts) >= 3:
            res = calculate(parts[0], float(parts[1]), float(parts[2]))
            print(res)
"""
    status, eval_res = request(f"{BASE_URL}/projects/{calc_proj['id']}/submit", method="POST", data={
        "code": calc_code,
        "elapsedSeconds": 180,
        "keystrokes": 120,
        "pasteEvents": 1
    }, token=token)
    assert status == 200 and "evaluation" in eval_res, f"Project submission failed: {eval_res}"
    evaluation = eval_res["evaluation"]
    print(f"✓ Multi-Criteria Rubric Score: {evaluation['overall_score']}/100 (Passed: {evaluation['passed']})")
    print(f"  • Correctness (30% weight): {evaluation['correctness']}%")
    print(f"  • Test Cases (20% weight): {evaluation['test_case_score']}%")
    print(f"  • Code Quality (15% weight): {evaluation['code_quality']}%")
    print(f"  • Complexity (15% weight): {evaluation['complexity']}%")
    print(f"  • Best Practices (10% weight): {evaluation['best_practices']}%")
    print(f"  • Concept Coverage (10% weight): {evaluation['concept_coverage']}%")
    print(f"✓ Constructive Feedback: {evaluation['feedback'][:70]}...")

    # Verify Non-Punitive Integrity Signal (Section 94)
    integ = eval_res.get("integrity", {})
    assert integ.get("status") in ["normal", "unusual", "needs_review"], f"Invalid integrity signal: {integ}"
    print(f"✓ Non-Punitive Integrity Signal: status='{integ.get('status')}' (Confidence: {integ.get('confidence')})")

    print("\n==================================================================")
    print("🎉 ALL E2E PLATFORM INTEGRATION CHECKS PASSED WITH 100% SUCCESS!")
    print("==================================================================")

if __name__ == "__main__":
    run_tests()
