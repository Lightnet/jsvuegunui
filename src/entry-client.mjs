/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { createApp } from './main.mjs'

const { app, router } = createApp()
//console.log("SSR Entry Client...")
//console.log(app);

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  
  app.mount('#app')
})