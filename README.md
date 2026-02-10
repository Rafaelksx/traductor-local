# 🧠 Traductor Neuronal Local (Offline AI)

> **Traductor personal ilimitado y privado.** Ejecuta modelos de IA (MarianMT) localmente para traducir sin internet, sin límites de caracteres y con total privacidad.

![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Python](https://img.shields.io/badge/Backend-FastAPI%20%2B%20PyTorch-green)
![Docker](https://img.shields.io/badge/DevOps-Docker-2496ED)

## 🚀 Características
- **100% Offline:** Los modelos corren en tu CPU/GPU local.
- **PWA Habilitada:** Instálalo como app nativa en Windows/Android.
- **Privacidad Total:** Tus textos nunca salen de tu red local.
- **Stack Moderno:** React, FastAPI, Hugging Face Transformers.

## 🛠️ Instalación Rápida (Recomendada con Docker)

Si tienes Docker instalado, solo necesitas un comando:

```bash
docker-compose up --build

La aplicación estará disponible en:

Frontend: http://localhost:5173

API Docs: http://localhost:8000/docs

🔧 Instalación Manual (Sin Docker)
Requisitos
Python 3.10+

Node.js 18+

1. Backend (Python)
Bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
2. Frontend (React)
Bash
cd frontend
npm install
npm run dev
🏗️ Arquitectura
Frontend: React + Vite (SPA). Se comunica con el backend vía Axios.

Backend: FastAPI expone endpoints REST. Carga modelos Helsinki-NLP usando transformers y torch.

Cache: Los modelos se descargan automáticamente en backend/models (o volumen de Docker) la primera vez.

📄 Licencia
Este proyecto es de código abierto para fines educativos.