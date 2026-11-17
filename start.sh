#!/usr/bin/env bash
node /home/rohan/Documents/navigation_system/server/server.js &
SERVER_PID=$!

trap "kill $SERVER_PID 2>/dev/null" EXIT

cd /home/rohan/Documents/navigation_system/client && npm run dev
