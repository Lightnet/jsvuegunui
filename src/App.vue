<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { inject, ref } from "vue";
import { AUTHSTATUSInjectKey, GunInjectKey} from "./components/gun/GunKeys.mjs";
import TimeClock from "./components/utilities/TimeClock.vue"
import ViewSeaTool from "./components/seatools/ViewSeaTool.vue";
console.log("SSR CLIENT APP")
const authStatus = inject(AUTHSTATUSInjectKey);
//const gun = inject(GunInjectKey);
//console.log(gun);

//does not work here...
//gun.on('hi', peer => {//peer connect
  //console.log('peer connect!');
  //displayeffectmessage('Connect to peer!');
//});
//gun.on('bye', (peer)=>{// peer disconnect
  //console.log('Disconnected from peer!');
//});

const isSeaTool1 = ref(false);
const isSeaTool2 = ref(false);

function onCloseModal1(){
  isSeaTool1.value=false;
}

</script>
<template>

  <div>
    <router-link to="/">Home</router-link><span> | </span>
    <router-link to="/about">About</router-link><span> | </span>
    <template v-if="authStatus=='auth'">
      <router-link to="/account">Account</router-link><span> | </span>
      <router-link to="/message">Message</router-link><span> | </span>
      <router-link to="/chat">Chat</router-link><span> | </span>
      <router-link to="/groupmessage">Group Message</router-link><span> | </span>
      <router-link to="/graph">Graph</router-link><span> | </span>
      <view-sea-tool/><span> | </span>
      <router-link to="/logout">Logout</router-link><span> | </span>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link><span> | </span>
      <router-link to="/signup">Sign Up</router-link><span> | </span>
    </template>
    
    <!--
      <time-clock/>
      <router-link to="/errorpage">error page</router-link><span> | </span>
      -->
  </div>
  <div style="height:calc(100% - 20px);width:calc(100% - 8px)">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
  <!--
  <my-modal :isMobile="false" >
    <view-sea-tool/>
  </my-modal>
  -->
</template>
<style>
</style>

<!--
    
    -->