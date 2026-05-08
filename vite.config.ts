import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Exporta por defecto el componente React
      exportAsDefault: false,
      // Permite import como componente y también como URL
      svgrOptions: {
        icon: true,
      },
    }),
  ],
})
