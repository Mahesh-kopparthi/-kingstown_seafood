#!/bin/bash
set -e

echo "Building frontend..."
cd "$(dirname "$0")"
npm install
npm run build

echo "Copying frontend build to backend static folder..."
mkdir -p backend/static
cp -r dist/* backend/static/

echo "Build complete!"
