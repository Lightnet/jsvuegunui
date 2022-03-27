<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://vuejs.org/api/built-in-special-attributes.html#is

import { GunInjectKey } from "../gun/GunKeys.mjs";
import SeaWorkerVue from "./SeaWorker.vue";
import SeaPairVue from "./SeaPair.vue";
import SeaDiffieHellman from "./SeaDiffieHellman.vue";
import Modal from "../modal/Modal.vue";
export default {
  inject:{
    gun:{from:GunInjectKey}
  },
  components: {
    "seaworker": SeaWorkerVue,
    "seapair": SeaPairVue,
    "seadiffiehellman": SeaDiffieHellman,
    Modal
},
  data() {
    return {
      views:[
        {name:"Worker",comp:SeaWorkerVue},
        {name:"Pair",comp:SeaPairVue},
        {name:"Diffie-Hellman",comp:SeaDiffieHellman},
      ],
      viewcomp:"seaworker",
      view:"Worker",
      isOpen:false,
      x:0,
      y:0,
    }
  },
  watch: {
  },
  methods: {
    selectTool(event){
      if(event.target.value == "Worker"){
        this.viewcomp="seaworker";
      }
      if(event.target.value == "Pair"){
        this.viewcomp="seapair";
      }
      if(event.target.value == "Diffie-Hellman"){
        this.viewcomp="seadiffiehellman";
      }
    },
    modalPos(event){
      console.log(event)
      this.x = event[0];
      this.y = event[1];
    }
  }
}
</script>
<template>
  <button @click="isOpen =!isOpen"> Sea Tool  </button>
  <Modal :isOpen="isOpen" @pos="modalPos" :x="x" :y="y">
    <div>
      <label> Select: </label>
      <select v-model="view" @change="selectTool">
        <option> Select Type Sea Tools </option>
        <option v-for="item in views" :key="item.name"> {{item.name}} </option>
      </select>
      <component :is="viewcomp"/>
    </div>
  </Modal>
</template>
<style>
</style>