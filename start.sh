
#!/bin/bash

echo "Starting SAFWAAN VPN..."
echo ""

# Start Backend
echo "Starting Backend (Port 5000)..."
cd backend && python3 server.py &
BACKEND_PID=$!

# Wait a bit
sleep 2

# Start Frontend
echo "Starting Frontend (Port 5173)..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "SAFWAAN VPN is starting!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user to interrupt
trap "echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
