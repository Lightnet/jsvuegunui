<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { GunInjectKey } from "../gun/GunKeys.mjs";
import SeaWorkerVue from "./SeaWorker.vue";
import SeaPairVue from "./SeaPair.vue";
import SeaDiffieHellman from "./SeaDiffieHellman.vue";
export default {
  inject:{
    gun:{from:GunInjectKey}
  },
  props: ['foo'],
  components: {

  },
  data() {
    return {
      views:[
        {name:"Worker",comp:SeaWorkerVue},
        {name:"Pair",comp:SeaPairVue},
        {name:"Diffie-Hellman",comp:SeaDiffieHellman},
      ],
      viewcomp:null,
      view:"Worker"
    }
  },
  methods: {
    foo(){

    },
    viewComp(){
      let item = this.views.find(item=>item.name == this.view)
      console.log(item);
      if(item){
        return item.comp
      }else{
        return null;
      }
    }
  }
}
</script>
<template>
  <label> Select: </label>
  <select v-model="view">
    <option> Select Type Sea Tools </option>
    <option v-for="item in views" :key="item.name"> {{item.name}} </option>
  </select>
  <component :is="viewComp()"/>

</template>
<style>
</style>