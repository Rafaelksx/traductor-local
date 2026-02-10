@echo off
echo --- INICIANDO TRADUCTOR NEURAL LOCAL ---

:: 1. Iniciar Backend (en una ventana nueva minimizada)
start "Backend Python" /min cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload"

:: 2. Iniciar Frontend (en una ventana nueva minimizada)
start "Frontend React" /min cmd /k "cd frontend && npm run dev"

:: 3. Esperar unos segundos a que arranquen
timeout /t 5

:: 4. Abrir el navegador
start http://localhost:5173

echo.
echo Todo listo. Cierra las ventanas de CMD para detener la app.