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
      worker1:"",
      worker2:"",
      message:"",
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
    <label> Worker: </label>
    <input v-model="worker1" /><br/>

    <label> Worker: </label>
    <input v-model="worker1" /><br/>

    <label> Data: </label>
    <textarea v-model="message" /><br/>

    <label> Encrypto: </label>
    <textarea v-model="encrypt" /><br/>
  </div>
</template>
<style>
</style>