<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { inject } from "vue";
import { GunInjectKey } from "../gun/GunKeys.mjs";
import GraphNode from "./GraphNode.vue"

const gun = inject(GunInjectKey);
console.log(gun)
const user = gun.user();
console.log(user)


</script>
<template>
  <label> User gun graph: </label>
  <graph-node :graph="user"/>
</template>
<style>
</style>