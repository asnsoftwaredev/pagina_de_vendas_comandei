import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api-planos': {
        target: 'https://api.asnsoftware.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-planos/, ''),
        headers: {
          TenantId: '40816156000160',
          Accept: 'application/json',
        },
      },
    },
  },
})
