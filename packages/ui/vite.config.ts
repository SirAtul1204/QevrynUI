import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'qevryn-css-types',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'styles.d.ts', source: '/** Compiled Qevryn component styles. */\nexport {};\n' });
    },
  }],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'entry.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: (id) => /^(react|react-dom)(\/|$)/.test(id)
        || /^@radix-ui\//.test(id)
        || ['class-variance-authority', 'clsx', 'tailwind-merge'].includes(id),
      output: { banner: '"use client";' },
    },
  },
});
