import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/playerapi': {
        target: 'http://b8c40s8.143.198.70.30.sslip.io/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/playerapi/, ''),
      },
      '/checkpass': {
        target: 'https://api.usercheck.com/email/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/checkpass/, ''),
      }
    }
  }
});