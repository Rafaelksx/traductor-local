from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import MarianMTModel, MarianTokenizer
import torch

# 1. Iniciamos la App (como const app = express())
app = FastAPI(title="Traductor Local")

# 2. Configurar CORS (Permitir que React entre)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # El puerto de Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Configuración de Modelos de IA
# Usamos un diccionario para guardar los dos modelos (ida y vuelta)
MODEL_NAMES = {
    "en-es": "Helsinki-NLP/opus-mt-en-es", # Inglés a Español
    "es-en": "Helsinki-NLP/opus-mt-es-en"  # Español a Inglés
}

# Aquí guardaremos los modelos en memoria RAM
models = {}
tokenizers = {}

print("--- CARGANDO CEREBROS DIGITALES (Esto tarda la primera vez) ---")

# Esta función se ejecuta al arrancar
# Descarga los modelos de internet si no los tienes
for key, name in MODEL_NAMES.items():
    print(f"Descargando/Cargando modelo: {key}...")
    try:
        tokenizers[key] = MarianTokenizer.from_pretrained(name)
        models[key] = MarianMTModel.from_pretrained(name)
        print(f"✅ Modelo {key} listo en RAM.")
    except Exception as e:
        print(f"❌ Error cargando {key}: {e}")

# Definimos qué datos esperamos recibir del Frontend (Validación de tipos)
class TranslationRequest(BaseModel):
    text: str
    direction: str  # Puede ser "en-es" o "es-en"

# 4. El Endpoint (La ruta API)
@app.post("/translate")
async def translate(request: TranslationRequest):
    # Verificamos si la dirección existe
    if request.direction not in models:
        raise HTTPException(status_code=400, detail="Dirección no válida")
    
    try:
        # Seleccionamos el modelo correcto
        model = models[request.direction]
        tokenizer = tokenizers[request.direction]

        # Tokenizar: Convertir texto a números que la IA entiende
        inputs = tokenizer(request.text, return_tensors="pt", padding=True, truncation=True)

        # Generar: La IA predice la traducción
        with torch.no_grad(): # Ahorra memoria
            translated = model.generate(**inputs, max_length=512)

        # Decodificar: Convertir números de vuelta a texto
        result = tokenizer.batch_decode(translated, skip_special_tokens=True)[0]

        return {"translation": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Ruta de prueba
@app.get("/")
def home():
    return {"status": "online", "message": "El backend está vivo"}