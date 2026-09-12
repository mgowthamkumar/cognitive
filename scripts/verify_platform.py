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
    status, quiz = request(f"{BASE_URL}/topics/{first_topic['id']}/quiz")
    assert status == 200 and len(quiz) >= 3, f"Quiz not found: {quiz}"
    print(f"✓ Loaded {len(quiz)} assessment questions for {first_topic['title']}")

    # Submit quiz answers
    answers = {quiz[0]["id"]: 1, quiz[1]["id"]: 1, quiz[2]["id"]: 1}
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

    # 7. AI Copilot & Progressive 4-Tier Hints (Section 14)
    print("\n--- 7. AI Copilot & 4-Tier Progressive Hints (Section 14) ---")
    for tier in [1, 2, 3, 4]:
        status, hint_res = request(f"{BASE_URL}/ai/hint", method="POST", data={
            "question": "How do I filter even numbers?",
            "hint_level": tier,
            "topic": first_topic["id"],
            "language": "python"
        }, token=token)
        assert status == 200, f"Tier {tier} hint failed: {hint_res}"
        print(f"✓ Tier {tier} Hint ({hint_res['stage']}): {hint_res['hint_text'][:80]}...")

    # RAG Adaptive Explanation (Section 12 & 13)
    status, rag_res = request(f"{BASE_URL}/ai/ask", method="POST", data={
        "question": "Explain pointers in simple terms",
        "language": "c",
        "level": "intermediate",
        "topic": "pointers",
        "cognitive_load": "HIGH"
    }, token=token)
    assert status == 200 and "answer" in rag_res, f"RAG failed: {rag_res}"
    print(f"✓ Adaptive RAG Answer (HIGH load): {rag_res['answer'][:100]}...")

    # 8. Admin & ML Analytics Dashboard (Section 19)
    print("\n--- 8. Admin Analytics & Model Validation Metrics (Section 19) ---")
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

    print("\n==================================================================")
    print("🎉 ALL E2E PLATFORM INTEGRATION CHECKS PASSED WITH 100% SUCCESS!")
    print("==================================================================")

if __name__ == "__main__":
    run_tests()
