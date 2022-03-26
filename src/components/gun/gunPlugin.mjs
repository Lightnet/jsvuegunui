/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/amark/gun/issues/1209

import { ref } from "vue";

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


import { 
  AUTHSTATUSInjectKey
, GUNInjectKey
, GunInjectKey
, INITGUNInjectKey
, PAIRInjectKey
, SIGNINInjectKey
, SIGNOUTInjectKey
, SIGNUPInjectKey
, CHANGEPASSPRHASEInjectKey
, SEAInjectKey

} from "./GunKeys.mjs";

export const gunPlugin = {
  install(app, options) {

    const GUN_API_URL="http://localhost:3000"

    const gun = ref(null);
    app.provide(GunInjectKey, gun)
    //Gun tooks
    app.provide(GUNInjectKey, Gun)
    app.provide(SEAInjectKey, SEA)

    const authStatus = ref("login");
    app.provide(AUTHSTATUSInjectKey, authStatus)

    const pair = ref(null);
    app.provide(PAIRInjectKey, pair)
    // INIT GUN
    function initGun(){
      if(gun.value ==null){
        const initgun = Gun({
          peers:[GUN_API_URL + '/gun'],
          localStorage: false
        });
        initgun.on('hi', peer => {//peer connect
          console.log('peer connect!');
          //displayeffectmessage('Connect to peer!');
        });
        initgun.on('bye', (peer)=>{// peer disconnect
            console.log('Disconnected from peer!');
        });
        console.log("init gun?")
        gun.value = initgun;
        //console.log(gun)
      }
    }
    app.provide(INITGUNInjectKey, initGun)
    // LOGIN
    function login(username,passphrase){
      //console.log(gun)
      //console.log(username)
      //console.log(passphrase)
      const user = gun.value.user();
      return  new Promise((resolve, reject) => {
        user.auth(username, passphrase,(ack)=>{
          //console.log(ack);
          if(ack.err){
            console.log("fail!");
            authStatus.value="unauth";
            reject(ack.err);
          }else{
            console.log("Authorized!");
            console.log(ack);
            authStatus.value="auth";
            pair.value = ack.sea;
            resolve(ack);
          }
        });
      });
    }
    app.provide(SIGNINInjectKey, login)
    // SIGNUP
    async function signup(username,passphrase){
      const user = gun.value.user();
      return  new Promise((resolve, reject) => {
        user.create(username, passphrase, function(ack){
          //console.log(ack);
          if(ack.err){
            //authStatus.value="unauth";
            reject(ack.err)

          }
          if(ack.pub){
            //authStatus.value="auth";
            resolve(ack)
          }
        });
      });
    }
    app.provide(SIGNUPInjectKey, signup)
    // SIGNOUT
    function sigout(){
      const user = gun.value.user();
      user.leave();
      console.log(user)
    }
    app.provide(SIGNOUTInjectKey, sigout)
    //CHANGE PASSPHRASE
    function changePassphrase(oldPassprahse, newPassphrase){
      const user = gun.value.user();
    }
    app.provide(CHANGEPASSPRHASEInjectKey, changePassphrase)
  }
}

export default gunPlugin;