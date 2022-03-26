/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { createSSRApp  } from 'https://cdn.skypack.dev/vue'//does not work
//import { createSSRApp  } from 'https://unpkg.com/vue@3.2.31/dist/vue.runtime.global.prod.js'
//import { createSSRApp  } from 'https://unpkg.com/vue/dist/vue.cjs.js'

import "./styles/global.css";
import App from './App.vue';
import { createSSRApp  } from 'vue';
import { createRouter } from './router.mjs';
import gunPlugin from "./components/gun/gunPlugin.mjs";

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App);
  app.config.unwrapInjectedRef = true
  app.use(gunPlugin,{
    peers:['http://localhost:3000/gun']
    , localStorage: false
    , isDebug:true
  });
  const router = createRouter()
  app.use(router)
  return { app, router }
}