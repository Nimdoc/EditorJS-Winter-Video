import { defineConfig } from 'vite'
import { resolve } from 'path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/main.js'),
      name: 'WinterVideo',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'winter-video.mjs' : 'winter-video.umd.js' ,
    },
    minify: false
  },
})
