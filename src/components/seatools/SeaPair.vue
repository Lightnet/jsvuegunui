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
      this.cryptData = await SEA.encrypt(this.message, this.pairObj1);
      this.sign = await SEA.sign(this.cryptData, this.pairObj1);
    },
    async decode(){
      this.cryptData = await SEA.verify(this.verify, this.pairObj1.pub);
      console.log(this.cryptData)
      this.message = await SEA.decrypt(this.cryptData, this.pairObj1);
      this.cryptData = JSON.stringify(this.cryptData)
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
    <label> Pair1: </label><button @click="GenSeaOne"> Gen 1 </button><br>
    <textarea v-model="pair1"></textarea><br/>
    <!--
    <label> Pair2: </label><button @click="GenSeaTwo"> Gen 2 </button><br>
    <textarea v-model="pair2"></textarea><br/>
    -->
    <label> Message: </label><button @click="clearMessage"> Clear </button> <br/>
    <textarea v-model="message"></textarea><br/>
    <label> cryptData: </label><button @click="clearCryptData"> Clear </button> <br/>
    <textarea v-model="cryptData"></textarea><br/>
    <label> Sign: </label><button @click="encode"> Sign </button><br>
    <textarea v-model="sign"></textarea><br/>

    <label> Verify: </label><button @click="decode"> Verify </button><br>
    <textarea v-model="verify"></textarea><br/>
  </div>
</template>
<style>
</style>