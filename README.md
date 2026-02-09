# Traductor Neural Local (Offline AI) 🧠

Aplicación de traducción Inglés <-> Español que corre 100% localmente utilizando modelos MarianMT y arquitectura moderna.

## Arquitectura
- **Frontend:** React + Vite (PWA)
- **Backend:** Python + FastAPI
- **AI Engine:** Hugging Face Transformers

## Instalación

### Backend
cd backend
python -m venv venv
# Activar entorno...
pip install -r requirements.txt
uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev