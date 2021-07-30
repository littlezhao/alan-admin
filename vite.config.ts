import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      apis: path.resolve(__dirname, 'src/apis'),
      views: path.resolve(__dirname, 'src/views'),
      comps: path.resolve(__dirname, 'src/components'),
      interfaces: path.resolve(__dirname, 'src/interfaces')
    }
  }
})
