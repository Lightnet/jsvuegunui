<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import {INITGUNInjectKey} from "./gun/GunKeys.mjs";
import { inject } from 'vue';
import Login from "./gun/Login.vue";

//const initGun = inject(INITGUNInjectKey);
//initGun();// set up gun

</script>
<template>
<div>
  <!--<label> Hello World</label>-->
  <Login />
</div>
</template>

<style>

</style>