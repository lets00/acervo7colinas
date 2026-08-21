@echo off
title Acervo Sete Colinas - Dev

echo Subindo Banco de Dados, Backend e Frontend...

docker start acervo_postgres

start "Backend :3000" cmd /k "cd /d %~dp0backend && npm run dev"
start "Frontend :5173" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Banco: acervo_postgres (PostgreSQL :5432)
echo Backend rodando em http://localhost:3000
echo Frontend rodando em http://localhost:5173
echo (duas janelas de terminal foram abertas)
