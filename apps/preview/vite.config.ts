import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Hot-reload source locally; production uses the package's real compiled exports.
  resolve: command === 'serve' ? {
    alias: [
      { find: /^@qevryn\/ui\/styles\.css$/, replacement: resolve(import.meta.dirname, '../../packages/ui/src/styles.css') },
      { find: /^@qevryn\/ui$/, replacement: resolve(import.meta.dirname, '../../packages/ui/src/index.ts') },
    ],
  } : undefined,
}));
import { resolve } from 'node:path';
