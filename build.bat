@echo off
echo Building frontend...
call npm install
call npm run build

echo Copying frontend build to backend static folder...
if not exist backend\static mkdir backend\static
xcopy /E /I /Y dist backend\static

echo Build complete!
