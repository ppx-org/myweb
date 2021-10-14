import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components({
    resolvers: [ElementPlusResolver()],

  }), viteCompression({deleteOriginFile:false})],
  server: {
    proxy: {
      // Using the proxy instance
      '/api': {
        target: 'http://localhost:8888/',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
