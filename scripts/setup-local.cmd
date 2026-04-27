@echo off
REM Local dev setup on Windows (Command Prompt). Run from repo root:
REM   scripts\setup-local.cmd

setlocal enabledelayedexpansion
cd /d "%~dp0\.."

echo ==> Repo root: %CD%

if not exist .env (
  copy /Y .env.example .env
  echo ==> Created .env from .env.example
) else (
  echo ==> .env already exists; not overwriting.
)

echo ==> npm install
call npm install
if errorlevel 1 exit /b 1

echo ==> Build shared workspace package
call npm run build:shared
if errorlevel 1 exit /b 1

echo ==> Start PostgreSQL + Redis
docker compose up -d postgres redis
if errorlevel 1 exit /b 1

echo ==> Wait for Postgres (up to 90s)
set /a n=0
:waitpg
docker compose exec -T postgres pg_isready -U postgres -d oceancyber >nul 2>&1
if not errorlevel 1 goto pgready
set /a n+=1
if %n% geq 45 (
  echo ERROR: Postgres did not become ready in time.
  exit /b 1
)
timeout /t 2 /nobreak >nul
goto waitpg
:pgready
echo Postgres is ready.

echo ==> Prisma migrate deploy + db push + generate
call npx prisma migrate deploy --schema=prisma/schema.prisma
if errorlevel 1 exit /b 1
call npx prisma db push --schema=prisma/schema.prisma
if errorlevel 1 exit /b 1
call npx prisma generate --schema=prisma/schema.prisma
if errorlevel 1 exit /b 1

echo ==> Backend build
call npm run build --workspace=@oceancyber/api
if errorlevel 1 exit /b 1

echo.
echo Done. Next: run in two terminals from repo root:
echo   npm run dev:api
echo   npm run dev
echo Or: npm run docker:up:dev
endlocal
