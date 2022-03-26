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
  setup(props,context){
    console.log(context.attrs)

    const closeModal = ()=>{
      context.emit('close' /* pass payload here */)
    }

    return {
      closeModal
    }

  }
  
}
</script>
<template>

</template>
<style>
</style>