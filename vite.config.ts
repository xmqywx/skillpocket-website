import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // GitHub Pages 部署配置
  base: '/skillpocket-website/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  // GLSL shader 支持
  assetsInclude: ['**/*.glsl', '**/*.vert', '**/*.frag'],
})
