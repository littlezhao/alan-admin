import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/plugins/SvgBuilder/index'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), svgBuilder('./src/assets/svg/')],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      apis: path.resolve(__dirname, 'src/apis'),
      views: path.resolve(__dirname, 'src/views'),
      comps: path.resolve(__dirname, 'src/components'),
      interfaces: path.resolve(__dirname, 'src/interfaces'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
