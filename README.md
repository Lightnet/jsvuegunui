# jsvuegunui

# Created by: Lightnet

# License: MIT

# Required:
 * nodejs

# Packages:
  - vue
  - vue-router
  - gun
  - vite
  - express

# Code Languages:
 * [Babeljs](https://babeljs.io/) https://babeljs.io
 * [Vuejs](https://vuejs.org/)  https://vuejs.org
 * Javascript

# Information:
  Design to be simple and to keep the files to minimal. To build simple peer to peer database messages system by developing Security, Encryption, and Authorization. That gun.js has develop sea.js for broswer and server javascript code. This project with basic features to learn how gun.js with vuejs, babeljs, vitejs.

  The project has auto build script compiler that is being used for vitejs, babel and other libraries to develop small but compact file. It can be install npm (node package manager) by command line for easy setup. The database is develop mode that not config for production. Simple access and post and private message system. The project has some simple examples to how gun.js works for peer to peer database with sea.js.

  Current mode Development / Debug mode that is not config for production.

  To get gun.js to load real time to almost direct access to database from server to client and peer to peer connections from other clients.

# Creating gun plugin:
  There are different way to create just three types:
- app global variable 
- Provide and injext
- file class instance

  But not recommand to use ref proxy as it does work.

GunKeys.mjs
```js
export const GunInjectKey = Symbol();
```


gunPlugin.mjs
```js
import Gun from "gun/gun"
import 'gun/lib/radix.js';
import 'gun/lib/radisk.js';
import 'gun/lib/store.js';
import 'gun/lib/rindexed.js';
import 'gun/lib/promise.js';
import SEA from 'gun/sea';
import { Buffer } from 'buffer'
if (typeof window !== "undefined"){
  window.Buffer = Buffer;
  window.setImmediate = setTimeout
}
import { GunInjectKey } from "./GunKeys.mjs";
export const gunPlugin = {
  install(app, options) {
    options = options || {
      peers:['http://localhost:3000/gun'],
      localStorage: false
    }
    const gun = Gun(options);
    if(isDebug){// this for checking connection to gun server.
      gun.on('hi', peer => {//peer connect
        console.log('peer connect!');
      });
      gun.on('bye', (peer)=>{// peer disconnect
          console.log('Disconnected from peer!');
      });
    }
    app.provide(GunInjectKey, gun) // set instance in vue
  }
}
export default gunPlugin;
```

Client.js
```js
import { createApp } from 'vue'
import App from './App.vue';
app.use(gunPlugin,{
  peers:['http://localhost:3000/gun']
  , localStorage: false
  , isDebug:true
});
const app = createApp(App);
app.use(gunPlugin);
app.mount('#app');
```

# Features: (reworking...)
 * Peer to Peer database from gun.js.
 * SEA.js (Security, Encryption, Authorization) from gun.js
 * Private Message (Simple)
 * Profile search Alias (Simple)
 * Alias Contacts (Add/Remove)
 * Login, Sign up, Forgot Password Hint (Simple | Broken)
 * Change Password (Simple)
 * Chat Message (gun RAD)
 * To Do List (Add / Edit /Remove) (user auth not working / gun working)
 * Added simple loading screen since javascript take a while to load.(not added / rework)

# Notes:
 * Not config for development and production.
 * Some minor bug on gun.user() function calls from sea.js might not work in some areas.
 * Load time data may be slow on time graph or other libraries.
 * Case Sensitive letters for linux as for name files.

# Bugs:
 * gun.user there might be some bug that doesn't load correctly. null and boolean are not working for some reason to set variable into graph. But not using sea.js it works.
 * hot reload variable some time does not update due to coding how to mount and unmount.

# Links:
 * https://gun.eco/docs/SEA
 * https://github.com/amark/gun/wiki/SEA
 * https://github.com/amark/gun/wiki/auth
 * https://github.com/amark/gun/wiki/Security
 * http://gun.js.org/explainers/data/security.html
 * https://gun.eco/explainers/data/security.html

# Credits:
 * https://gitter.im/amark/gun chat room browser.