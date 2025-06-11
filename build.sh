#!/usr/bin/env bash
# Exit on error
set -e

echo "Starting server dependency installation..."
cd server
rm -rf node_modules
npm install --legacy-peer-deps
npm run build
cd ..

echo "Starting client dependency installation..."
cd client
rm -rf node_modules
npm install --legacy-peer-deps
npm run build
cd ..

echo "Build script finished."