<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import SEA from "gun/sea"
//import { GunInjectKey } from "../gun/GunKeys.mjs";
export default {
  inject:{
    //gun:{from:GunInjectKey}
  },
  components: {
  },
  data() {
    return {
        pair1:""
      , pairObj1:{}
      , pair2:""
      , pairObj2:{}
      , epub:""
      , message:""
      , sign:""
      , verify:""
      , cryptData:""
    }
  },
  methods: {
    async GenSeaOne(){
      let pair = await SEA.pair();
      this.pair1 = JSON.stringify(pair)
      this.pairObj1 = pair;
    },
    async GenSeaTwo(){
      let pair = await SEA.pair();
      this.pair2 = JSON.stringify(pair)
      this.pairObj2 = pair;
    },
    async encode(){
      this.cryptData = await SEA.encrypt(
        this.message, 
        await SEA.secret(this.pairObj2.epub, this.pairObj1));
    },
    async decode(){
      this.message = await SEA.decrypt(this.cryptData, await SEA.secret(this.pairObj1.epub, this.pairObj2));
    },
    clearCryptData(){
      this.cryptData="";
    },
    clearMessage(){
      this.message="";
    }

  }
}
</script>
<template>
  <div>
    <label> Pair: </label><button @click="GenSeaOne"> Gen 1 </button><br>
    <textarea v-model="pair1"></textarea><br/>
    <label> Pair: </label><button @click="GenSeaTwo"> Gen 2 </button><br>
    <textarea v-model="pair2"></textarea><br/>
    <label> Message: </label><button @click="clearMessage"> Clear </button><br/>
    <textarea v-model="message"></textarea><br/>
    <button @click="encode"> encrypt </button><button @click="decode"> decrypt </button><br>
    <label> cryptData: </label><button @click="clearCryptData"> Clear </button> <br/>
    <textarea v-model="cryptData"></textarea><br/>
    
  </div>
</template>
<style>
</style>