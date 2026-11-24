import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: './',
  publicDir: false,
  build: {
    target: 'es2020',
    outDir: 'modern-dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/launcher.tsx', import.meta.url)),
      name: 'SikauModernUI',
      formats: ['iife'],
      fileName: () => 'launcher.js',
    },
    sourcemap: false,
  },
});
