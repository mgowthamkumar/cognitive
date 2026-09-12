#!/usr/bin/env python
"""
Launcher script for the native Python Backend Gateway on port 5000.
"""
import uvicorn
import os
import sys

if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, current_dir)
    print("================================================================")
    print("🚀 Starting Cognitive Adaptive Learning Engine Python Backend...")
    print("   Listening on http://127.0.0.1:5000 (API Gateway + ML Engine)  ")
    print("================================================================")
    uvicorn.run("main:app", host="127.0.0.1", port=5000, reload=True)
