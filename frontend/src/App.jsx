import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from './useDebounce';
import './App.css';

function App() {
  // --- ESTADOS (La memoria del componente) ---
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [direction, setDirection] = useState('en-es'); // Por defecto: Inglés -> Español
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Usamos el hook para esperar 500ms antes de traducir
  const debouncedText = useDebounce(inputText, 500);

  // --- EFECTO (Lo que pasa cuando cambia el texto) ---
  useEffect(() => {
    const translate = async () => {
      // 1. Si está vacío, limpiamos y no hacemos nada
      if (!debouncedText.trim()) {
        setTranslatedText('');
        return;
      }

      // 2. Preparamos la petición
      setIsLoading(true);
      setError(null);

      try {
        // 3. Llamamos a TU servidor Python
        const response = await axios.post('http://localhost:8000/translate', {
          text: debouncedText,
          direction: direction
        });
        
        // 4. Guardamos la traducción
        setTranslatedText(response.data.translation);
      } catch (err) {
        console.error(err);
        setError("Error: No puedo conectar con el servidor local (¿Está corriendo Python?)");
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [debouncedText, direction]); // Se ejecuta si cambia el texto O la dirección

  // --- FUNCIONES AUXILIARES ---
  const handleSwap = () => {
    // Invierte la dirección
    setDirection(prev => prev === 'en-es' ? 'es-en' : 'en-es');
    // Invierte los textos para seguir editando
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // --- RENDERIZADO (HTML) ---
  return (
    <div className="app-container">
      <header>
        <h1>Traductor Neural Local 🧠</h1>
        <div className="language-selector">
          <span className={direction === 'en-es' ? 'active-lang' : ''}>Inglés (EN)</span>
          <button onClick={handleSwap} className="swap-btn" title="Cambiar dirección">⇄</button>
          <span className={direction === 'es-en' ? 'active-lang' : ''}>Español (ES)</span>
        </div>
      </header>

      <main className="translation-area">
        {/* COLUMNA IZQUIERDA (INPUT) */}
        <div className="panel input-panel">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe algo para traducir..."
            spellCheck="false"
            autoFocus
          />
          <div className="panel-footer">
            <span>{inputText.length} caracteres</span>
            {inputText && (
              <button onClick={() => setInputText('')} className="clear-btn">Borrar</button>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA (OUTPUT) */}
        <div className="panel output-panel">
          {isLoading ? (
            <div className="loading-overlay">Traduciendo...</div>
          ) : (
            <textarea
              readOnly
              value={translatedText}
              placeholder="La traducción aparecerá aquí..."
            />
          )}
          
          <div className="panel-footer">
            {error ? <span className="error-msg">{error}</span> : <span>Modelo: MarianMT</span>}
            {translatedText && (
              <button onClick={() => copyToClipboard(translatedText)} className="copy-btn">
                Copiar
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;