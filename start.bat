
@echo off
echo Starting SAFWAAN VPN...
echo.

echo Starting Backend (Port 5000)...
start "Backend" cmd /k "cd backend && python server.py"

timeout /t 2 /nobreak >nul

echo Starting Frontend (Port 5173)...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo SAFWAAN VPN is starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause
