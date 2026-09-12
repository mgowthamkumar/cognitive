"""
Sandboxed Code Execution Engine for Python Backend Gateway
Executes Python, C, and C++ code with timeouts, standard input piping, and automated test cases.
"""
import subprocess
import sys
import os
import tempfile
import time
from typing import Dict, Any, List

def run_code_sandbox(code: str, language: str = "python", custom_input: str = "") -> Dict[str, Any]:
    start_time = time.time()
    lang = language.lower()

    if lang == "python":
        with tempfile.NamedTemporaryFile(suffix=".py", mode="w", encoding="utf-8", delete=False) as f:
            f.write(code)
            tmp_path = f.name

        try:
            proc = subprocess.run(
                [sys.executable, tmp_path],
                input=custom_input,
                text=True,
                capture_output=True,
                timeout=5
            )
            elapsed_ms = int((time.time() - start_time) * 1000)
            status = "SUCCESS" if proc.returncode == 0 else "RUNTIME_ERROR"
            return {
                "status": status,
                "stdout": proc.stdout,
                "stderr": proc.stderr,
                "execution_time": elapsed_ms,
                "details": []
            }
        except subprocess.TimeoutExpired:
            return {
                "status": "TIMEOUT",
                "stdout": "",
                "stderr": "Execution timed out after 5.0 seconds.",
                "execution_time": 5000,
                "details": []
            }
        except Exception as e:
            return {
                "status": "ERROR",
                "stdout": "",
                "stderr": str(e),
                "execution_time": 0,
                "details": []
            }
        finally:
            if os.path.exists(tmp_path):
                try:
                    os.remove(tmp_path)
                except:
                    pass

    elif lang in ["c", "cpp"]:
        ext = ".c" if lang == "c" else ".cpp"
        compiler = "gcc" if lang == "c" else "g++"

        with tempfile.NamedTemporaryFile(suffix=ext, mode="w", encoding="utf-8", delete=False) as src:
            src.write(code)
            src_path = src.name

        bin_path = src_path + (".exe" if os.name == "nt" else "")

        try:
            compile_proc = subprocess.run(
                [compiler, src_path, "-o", bin_path],
                capture_output=True,
                text=True,
                timeout=10
            )
            if compile_proc.returncode != 0:
                return {
                    "status": "COMPILE_ERROR",
                    "stdout": "",
                    "stderr": compile_proc.stderr,
                    "execution_time": int((time.time() - start_time) * 1000),
                    "details": []
                }

            run_proc = subprocess.run(
                [bin_path],
                input=custom_input,
                text=True,
                capture_output=True,
                timeout=5
            )
            elapsed_ms = int((time.time() - start_time) * 1000)
            return {
                "status": "SUCCESS" if run_proc.returncode == 0 else "RUNTIME_ERROR",
                "stdout": run_proc.stdout,
                "stderr": run_proc.stderr,
                "execution_time": elapsed_ms,
                "details": []
            }
        except FileNotFoundError:
            return {
                "status": "COMPILE_ERROR",
                "stdout": "",
                "stderr": f"{compiler} compiler not found on system PATH. Install MinGW / GCC.",
                "execution_time": int((time.time() - start_time) * 1000),
                "details": []
            }
        except subprocess.TimeoutExpired:
            return {
                "status": "TIMEOUT",
                "stdout": "",
                "stderr": "Execution timed out.",
                "execution_time": 5000,
                "details": []
            }
        finally:
            for p in [src_path, bin_path]:
                if os.path.exists(p):
                    try:
                        os.remove(p)
                    except:
                        pass

    return {
        "status": "UNSUPPORTED_LANGUAGE",
        "stdout": "",
        "stderr": f"Language {language} execution not configured.",
        "execution_time": 0,
        "details": []
    }

def evaluate_challenge_submission(code: str, test_cases: List[Dict[str, str]], language: str = "python") -> Dict[str, Any]:
    passed = 0
    total = len(test_cases)
    results = []

    for idx, tc in enumerate(test_cases):
        res = run_code_sandbox(code, language, tc.get("input", ""))
        actual = (res.get("stdout") or "").strip()
        expected = (tc.get("expected_output") or tc.get("expected") or "").strip()
        is_correct = (actual == expected) and (res.get("status") == "SUCCESS")
        if is_correct:
            passed += 1
        results.append({
            "test_case": idx + 1,
            "input": tc.get("input", ""),
            "expected": expected,
            "actual": actual,
            "passed": is_correct,
            "error": res.get("stderr", "")
        })

    all_passed = (passed == total) and (total > 0)
    return {
        "status": "ACCEPTED" if all_passed else "WRONG_ANSWER",
        "passed_tests": passed,
        "total_tests": total,
        "all_passed": all_passed,
        "details": results
    }
