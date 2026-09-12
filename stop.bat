@echo off
title Stop Platform Services
color 0C
echo ===============================================================================
echo            COGNITIVE-LOAD-AWARE ADAPTIVE LEARNING ENGINE
echo                 Shutting Down All Platform Services...
echo ===============================================================================
echo.

echo [*] Stopping services listening on port 8000 (Python ML Engine)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo [*] Stopping services listening on port 5000 (Express Backend API)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo [*] Stopping services listening on port 3000 (Vite React Client)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo [✔] All platform services have been stopped successfully.
timeout /t 3 >nul
