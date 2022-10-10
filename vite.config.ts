import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CalendarThingy',
    },
    rollupOptions: {
      external: ['classnames', 'react', 'react-dom', 'react-window'],
      output: {
        globals: {
          classnames: 'classNames',
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-window': 'reactWindow',
        },
      },
    },
  },
});
