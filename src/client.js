/*
  LICENSE: MIT
  Created by: Lightnet
*/

import "./styles/globals.css"
import { createApp } from 'vue'
import App from './components/App.vue'
import gunPlugin from "./components/gun/gunPlugin.mjs"

const app = createApp(App);
app.use(gunPlugin);
app.mount('#app');
console.log("test?")