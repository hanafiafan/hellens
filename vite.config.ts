import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      // Dev only: the prebuilt legacy bundles in public/ import each other; serve them raw instead of through Vite's transform.
      name: 'legacy-public-js',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && /^\/(assets|experience)\/[^?]+\.js\?import/.test(req.url)) req.url = req.url.replace(/\?import&?/, '?')
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'three', '@react-three/fiber'],
  },
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
  },
})
