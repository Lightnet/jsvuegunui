import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/public/'
    : '/',
  plugins: [vue()],
  //resolve: {
    //alias: {
      //'vue': 'https://unpkg.com/vue@3.2.31/dist/vue.global.js',
      //'vue-router': 'https://cdn.skypack.dev/vue-router',
    //}
  //},
  //build: {
    //watch: {
      // https://rollupjs.org/guide/en/#watch-options
    //}
  //}
})
