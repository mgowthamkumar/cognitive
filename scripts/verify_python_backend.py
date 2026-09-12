"""
Verification script for native Python backend (python_backend/main.py)
Tests all core APIs: Health, Platform Stats, Auth, Courses, Topics, Diagnostic Assessment,
Telemetry & ML Prediction, Coding Sandbox, AI Copilot & RAG, Notes, Bookmarks, and Learning History.
"""
import os
import sys

# Ensure root directory is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from fastapi.testclient import TestClient
from python_backend.main import app

def run_tests():
    client = TestClient(app)
    print("==================================================================")
    print("🚀 STARTING PYTHON BACKEND TEST SUITE")
    print("==================================================================")

    # 1. Health Probe
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    health = res.json()
    print(f"✓ Health Probe passed: {health}")

    # 2. Platform Stats
    res = client.get("/api/stats/platform")
    assert res.status_code == 200, f"Stats failed: {res.text}"
    stats = res.json()
    print(f"✓ Platform Stats: {stats}")

    # 3. Registration & Login
    reg_data = {
        "name": "Python Learner",
        "email": "py_learner@example.com",
        "password": "Password123!",
        "role": "student"
    }
    res = client.post("/api/auth/register", json=reg_data)
    if res.status_code == 400 and "already registered" in res.text:
        # User might exist from previous run
        res = client.post("/api/auth/login", json={"email": reg_data["email"], "password": reg_data["password"]})
        assert res.status_code == 200, f"Login failed: {res.text}"
        auth_data = res.json()
    else:
        assert res.status_code == 201, f"Registration failed: {res.text}"
        auth_data = res.json()
    
    token = auth_data["token"]
    user = auth_data["user"]
    headers = {"Authorization": f"Bearer {token}"}
    print(f"✓ Auth OK: Logged in as {user['name']} (ID: {user['id']})")

    # 4. Auth Me
    res = client.get("/api/auth/me", headers=headers)
    assert res.status_code == 200
    print(f"✓ /auth/me verified: {res.json()['user']['email']}")

    # 5. Courses & Roadmaps
    res = client.get("/api/courses")
    assert res.status_code == 200
    courses = res.json()
    assert len(courses) >= 4
    print(f"✓ Courses listed: {len(courses)} available ({', '.join(c['id'] for c in courses)})")

    # 6. Topics & Lesson
    res = client.get("/api/topics/py_intro")
    assert res.status_code == 200
    topic = res.json()
    assert topic["id"] == "py_intro"
    print(f"✓ Topic retrieval: {topic['title']}")

    # 7. Diagnostic Assessment Test
    res = client.get("/api/diagnostic/python/questions")
    assert res.status_code == 200
    diag = res.json()
    assert len(diag["questions"]) >= 3
    print(f"✓ Diagnostic Questions: Retrieved {len(diag['questions'])} questions for Python")

    # Submit Diagnostic
    eval_payload = {
        "answers": {q["id"]: 0 for q in diag["questions"]},
        "time_spent": 90
    }
    res = client.post("/api/diagnostic/python/submit", json=eval_payload, headers=headers)
    assert res.status_code == 200
    diag_res = res.json()
    print(f"✓ Diagnostic Evaluation: Score={diag_res['diagnostic_result']['total_score']}%, Recommended Level={diag_res['diagnostic_result']['recommended_level']}")

    # 8. Adaptive ML Evaluation & Behavioral Event
    telemetry_payload = {
        "time_spent_seconds": 140,
        "paste_count": 0,
        "backspace_count": 4,
        "tab_switches": 1,
        "mouse_velocity_avg": 220,
        "quiz_errors": 0,
        "current_level": "intermediate"
    }
    res = client.post("/api/adaptive/evaluate", json=telemetry_payload, headers=headers)
    assert res.status_code == 200
    analysis = res.json()
    print(f"✓ Adaptive ML Evaluation: Load={analysis['cognitive_load']}, Next Action={analysis['recommended_action']}")

    event_payload = {
        "topic_id": "py_intro",
        "event_type": "LESSON_READ",
        "duration": 45.0,
        "metadata": {"scroll_depth": 0.85}
    }
    res = client.post("/api/behavior/event", json=event_payload, headers=headers)
    assert res.status_code == 201
    print("✓ Behavior Telemetry logged successfully")

    # 9. Python Sandbox Code Execution
    code_payload = {
        "language": "python",
        "code": "print('Hello Cognitive Platform!')"
    }
    res = client.post("/api/code/run", json=code_payload)
    assert res.status_code == 200
    sb_res = res.json()
    assert "Hello Cognitive Platform!" in sb_res.get("stdout", "")
    print(f"✓ Python Sandbox Execution: stdout='{sb_res.get('stdout', '').strip()}'")

    # 10. AI Copilot / RAG Tutor Query
    ai_payload = {
        "question": "Explain what a variable is in Python in simple terms",
        "topic": "Python Introduction",
        "code_context": "x = 10"
    }
    res = client.post("/api/ai/ask", json=ai_payload, headers=headers)
    assert res.status_code == 200
    ai_res = res.json()
    assert "answer" in ai_res
    print(f"✓ AI Copilot / RAG Tutor response: {ai_res['answer'][:70]}...")

    # 11. Notes & Bookmarks Persistence
    note_payload = {"topic_id": "py_intro", "content": "Variables are containers for storing data."}
    res = client.post("/api/notes", json=note_payload, headers=headers)
    assert res.status_code in (200, 201)
    print("✓ Note saved successfully")

    bm_payload = {"topic_id": "py_intro", "title": "Intro to Python"}
    res = client.post("/api/bookmarks", json=bm_payload, headers=headers)
    assert res.status_code in (200, 201)
    print("✓ Bookmark saved successfully")

    # 12. Learning History
    res = client.get("/api/learning-history", headers=headers)
    assert res.status_code == 200
    hist = res.json()
    assert hist.get("success") is True
    print(f"✓ Learning History retrieved successfully: {len(hist.get('history', []))} records")

    print("\n==================================================================")
    print("🎉 ALL PYTHON BACKEND TESTS PASSED (100% SUCCESS)")
    print("==================================================================")

if __name__ == "__main__":
    run_tests()
