/**
 * Zero-Command Automated Platform Launcher
 * Starts Python ML/RAG Microservice (8000), Backend API (5000), and Vite Client (3000),
 * monitors health, and automatically opens your web browser.
 */

const { spawn, exec } = require('child_process');
const http = require('http');
const path = require('path');

const ROOT_DIR = __dirname;
const children = [];

console.log('===============================================================');
console.log('   Cognitive-Load-Aware Adaptive Learning Platform            ');
echoConsole('   Zero-Command Automated Launcher Initiated                   ');
console.log('===============================================================\n');

function echoConsole(msg) {
  console.log(`\x1b[36m${msg}\x1b[0m`);
}

function spawnProcess(name, command, args, cwd) {
  echoConsole(`[LAUNCHER] Starting ${name}...`);
  const isWin = process.platform === 'win32';
  
  const child = spawn(command, args, {
    cwd,
    shell: isWin,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PYTHONIOENCODING: 'utf-8', FORCE_COLOR: 'true' }
  });

  child.stdout.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) console.log(`\x1b[90m[${name}]\x1b[0m ${line.trim()}`);
    });
  });

  child.stderr.on('data', (data) => {
    const lines = data.toString().trim().split('\n');
    lines.forEach(line => {
      if (line.trim()) console.log(`\x1b[33m[${name} ERR]\x1b[0m ${line.trim()}`);
    });
  });

  child.on('close', (code) => {
    console.log(`\x1b[31m[${name}] Exited with code ${code}\x1b[0m`);
  });

  children.push({ name, process: child });
  return child;
}

// 1. Launch Python ML / RAG microservice
const mlProc = spawnProcess(
  'ML-Engine',
  'python',
  ['-m', 'uvicorn', 'ml_service.app.main:app', '--host', '127.0.0.1', '--port', '8000'],
  ROOT_DIR
);

// 2. Launch Express Backend Server
const serverProc = spawnProcess(
  'Backend-API',
  'npm',
  ['run', 'dev'],
  path.join(ROOT_DIR, 'server')
);

// 3. Launch Vite Frontend Client
const clientProc = spawnProcess(
  'Frontend-UI',
  'npm',
  ['run', 'dev'],
  path.join(ROOT_DIR, 'client')
);

// Helper to open the browser
function openBrowser(url) {
  console.log(`\n\x1b[32m✔ All services online! Opening browser at: ${url}\x1b[0m\n`);
  const startCmd = process.platform === 'darwin' ? 'open' :
                   process.platform === 'win32' ? 'start ""' : 'xdg-open';
  exec(`${startCmd} "${url}"`);
}

// Check when frontend is reachable
let opened = false;
function checkFrontendReadiness(retries = 30) {
  if (opened) return;
  if (retries <= 0) {
    echoConsole('[LAUNCHER] Server started. Opening browser now...');
    openBrowser('http://localhost:3000');
    return;
  }

  const req = http.get('http://localhost:3000', (res) => {
    if (!opened) {
      opened = true;
      setTimeout(() => openBrowser('http://localhost:3000'), 1000);
    }
  });

  req.on('error', () => {
    setTimeout(() => checkFrontendReadiness(retries - 1), 1000);
  });
}

setTimeout(() => checkFrontendReadiness(), 2500);

// Cleanup on exit
function shutdown() {
  console.log('\n[LAUNCHER] Gracefully terminating all background services...');
  children.forEach(({ name, process: proc }) => {
    if (proc && proc.pid) {
      if (process.platform === 'win32') {
        exec(`taskkill /pid ${proc.pid} /T /F`, () => {});
      } else {
        proc.kill('SIGTERM');
      }
    }
  });
  setTimeout(() => process.exit(0), 1000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);
