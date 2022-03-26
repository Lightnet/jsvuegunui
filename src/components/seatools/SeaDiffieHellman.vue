<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { GunInjectKey } from "../gun/GunKeys.mjs";
export default {
  inject:{
    gun:{from:GunInjectKey}
  },
  props: ['foo'],
  components: {
  },
  data() {
    return {
      pair1:"",
      pair2:"",
      share:"",
      encrypt:"",
    }
  },
  methods: {
    foo(){
    }
  }
}
</script>
<template>
  <div>
    <label> Pair1: </label>
    <input v-model="pair1" /><br/>

    <label> Pair2: </label>
    <input v-model="pair2" /><br/>

    <label> Share: </label>
    <textarea v-model="share" /><br/>

    <label> Encrypto: </label>
    <textarea v-model="encrypt" /><br/>
  </div>
</template>
<style>
</style>