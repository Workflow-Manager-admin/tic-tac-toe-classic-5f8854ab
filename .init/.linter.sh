#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tic-tac-toe-classic-5f8854ab/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

