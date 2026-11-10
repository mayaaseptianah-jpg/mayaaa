@echo off
title Smart Water Management - Local Server
echo ========================================================
echo   SMART WATER MANAGEMENT - PEMERINTAH KOTA PAGAR ALAM
echo   Menjalankan Localhost Server...
echo ========================================================
echo.
echo Akses aplikasi melalui URL:
echo http://localhost:8000
echo.
echo Tekan Ctrl+C untuk menghentikan server.
echo.
start http://localhost:8000
"C:\Program Files\PostgreSQL\17\pgAdmin 4\python\python.exe" -m http.server 8000
pause

