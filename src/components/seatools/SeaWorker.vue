<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import SEA from "gun/sea"
//import { GunInjectKey } from "../gun/GunKeys.mjs";
export default {
  //inject:{
    //gun:{from:GunInjectKey}
  //},
  //components: {
  //},
  data() {
    return {
      worker1:"",
      worker2:"",
      message:"",
      encrypt:"",
    }
  },
  methods: {
    async encode(){
      var sec = await SEA.work(this.worker1, this.worker2);
      this.encrypt = await Gun.SEA.encrypt(this.message, sec);//encrypt
    },
    async decode(){
      var sec = await SEA.work(this.worker1, this.worker2);
      this.message = await Gun.SEA.decrypt(this.encrypt, sec);//encrypt hint
    }
  }
}
</script>
<template>
  <div>
    <label> Worker: </label><br/>
    <input v-model="worker1" /><br/>

    <label> Worker: </label><br/>
    <input v-model="worker2" /><br/>

    <label> Data: </label><button @click="encode"> Encode </button><br/>
    <textarea v-model="message" /><br/>

    <label> Encrypto: </label> <button @click="decode"> Decode </button><br/>
    <textarea v-model="encrypt" /><br/>
  </div>
</template>
<style>
</style>