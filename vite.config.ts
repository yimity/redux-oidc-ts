import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      name: "redux-oidc-ts",
      fileName: 'redux-oidc-ts'
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: true,
    target: "esnext",
    minify: false,
  },
  root: 'src/example',
})
