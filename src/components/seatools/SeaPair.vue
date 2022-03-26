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
        pair1:""
      , pair2:""
      , datain:""
      , dataout:""
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
    <label> Pair: </label>
    <textarea></textarea><br/>
    <label> Pair: </label>
    <textarea></textarea><br/>
    <label> Data In: </label>
    <textarea></textarea><br/>
    <label> Data Out: </label>
    <textarea></textarea><br/>
  </div>
</template>
<style>
</style>