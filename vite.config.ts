import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/bem.ts',
      name: 'VueSimpleBem',
      fileName: (format) => `vue-simple-bem.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
      },
    },
  },
});
