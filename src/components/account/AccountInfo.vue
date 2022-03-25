<script>

import { GunInjectKey } from "../gun/GunKeys.mjs";
export default {
  inject:{
    gun:{from:GunInjectKey}
  },
  components: {
  },
  data() {
    return {
      username: 'Guest',
      pubid:'',
      inputsize1:92,
      inputsize2:42,
      publickeywidth:42,
      bshowkey:false
    }
  },
  created(){
    var user = this.gun.user();
    //console.log(user);
    if (user.is == null)
      return;
    this.username = user.is.alias;
    this.pubid = user.is.pub;
  },
  methods: {
    copykey(){
      let CodeToCopy = document.querySelector('#currentowneraliaspulbickey');
      CodeToCopy.select();
      //document.execCommand('copy');
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(CodeToCopy.value);
      console.log(CodeToCopy.value)
    },
    togglepublickeydisplay(){
      if(this.bshowkey){
        this.bshowkey = false;
        this.publickeywidth = this.inputsize2;
      }else{
        this.bshowkey = true;
        this.publickeywidth = this.inputsize1;
      }
    }
  }
}
</script>
<template>
  <div class="HeaderPublicKey">
    <label>Alias:{{ username }}</label>
    <button @click="togglepublickeydisplay">Public Key</button>
    <button @click="copykey">Copy</button>
    <input id="currentowneraliaspulbickey" v-model="pubid" :size="publickeywidth" readonly>
  </div>
</template>
<style>
.HeaderPublicKey{
  height:24px;
}
</style>
