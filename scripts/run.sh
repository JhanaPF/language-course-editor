#!/bin/bash

# Port to check
PORT=7000

# Find pid of process on specified port 
PID=$(lsof -t -i :$PORT)

# Check and stop process running on port 7000
if [ -z "$PID" ]; then
  echo "No process running $PORT."
else
  echo "Killing process on port $PORT (PID: $PID)."
  
  kill $PID
  
  echo "Process stopped with success."
fi

# Launch Node api
cd back-end
#nodemon &
xterm -e "nodemon" &


# Launch Dashboard
cd ../dashboard
#npm start
xterm -e "npm start" &
