import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // react-three-fiber pulls its own reconciler; dedupe so there's one React copy
  resolve: {
    dedupe: ['react', 'react-dom', 'three', '@react-three/fiber'],
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  server: {
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
});
