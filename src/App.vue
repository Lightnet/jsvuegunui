<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { inject } from "vue";
import { AUTHSTATUSInjectKey, INITGUNInjectKey} from "./components/gun/GunKeys.mjs";
const authStatus = inject(AUTHSTATUSInjectKey);
const initGun = inject(INITGUNInjectKey);

initGun();//init gun 

</script>
<template>
  <div>
    <div>
      <router-link to="/">Home</router-link><span> | </span>
      <router-link to="/about">About</router-link><span> | </span>
      <template v-if="authStatus=='auth'">
        <router-link to="/account">Account</router-link><span> | </span>
        <router-link to="/message">Message</router-link><span> | </span>
        <router-link to="/chat">Chat</router-link><span> | </span>
        <router-link to="/graph">Graph</router-link><span> | </span>
        <router-link to="/logout">Logout</router-link><span> | </span>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link><span> | </span>
        <router-link to="/signup">Sign Up</router-link><span> | </span>
      </template>
      <!--<router-link to="/errorpage">error page</router-link><span> | </span>-->
    </div>
    <div>
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </router-view>
    </div>
  </div>
</template>
<style>
</style>