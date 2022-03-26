<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import {GunInjectKey} from "./gun/GunKeys.mjs";
import { inject } from 'vue';
import Login from "./gun/Login.vue";

const gun = inject(GunInjectKey);

gun.on('hi', peer => {//peer connect
  console.log('peer connect!');
  //displayeffectmessage('Connect to peer!');
});
gun.on('bye', (peer)=>{// peer disconnect
  console.log('Disconnected from peer!');
});

</script>
<template>
<div>
  <!--<label> Hello World</label>-->
  <Login />
</div>
</template>

<style>

</style>