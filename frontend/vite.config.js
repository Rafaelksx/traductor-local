import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // --- ESTO ES LO NUEVO ---
      devOptions: {
        enabled: true // <--- ¡Esto activa la PWA en npm run dev!
      },
      // ------------------------
      manifest: {
        name: 'Traductor Neural Local',
        short_name: 'Traductor AI',
        description: 'Traductor Offline',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png', // Asegúrate de que estos archivos existan en public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})