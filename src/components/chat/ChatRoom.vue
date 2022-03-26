<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://gun.eco/docs/RAD#api
// https://github.com/amark/gun/issues/1209

import {unixTime} from "../../libs/helper.mjs";
import { GunInjectKey,SEAInjectKey } from "../gun/GunKeys.mjs";
export default {
  inject:{
    gun:{from:GunInjectKey},
    SEA:{from:SEAInjectKey}
  },
  components: {
  },
  data() {
    return {
      messages:[],
      message:"",
      secret:"public",
      chatroom:null
    }
  },
  mounted(){      

  },
  created(){
    this.initChat()
  },
  methods: {
    initChat(){
      this.chatroom = this.gun.get('chatroom');
      //this.chatroom.map().once(this.qcallback);

      let createTime = unixTime();
      console.log(createTime)
      createTime = createTime - (1000 )

      //this.chatroom.get({'.': {'>': String(createTime)},'%': 50000}).once().map().once(this.qcallback);
      this.chatroom.get({'.': {'>': String(createTime)},'%': 100}).once().map().once(this.qcallback);
    },
    async qcallback(data,key){
      console.log('incoming messages...')
      //console.log("data",data);
      if(data == null)return;
      if(data.message != null){
        
        //console.log(this.secret)
        //let enc = this.secret;
        //console.log("this.secret",this.secret)
        let enc = await this.SEA.work("public","chat");
        let msg = await this.SEA.decrypt(data.message,enc);
        //console.log("MESSAGE",msg);
        if(!msg){// if fail decode skip
          return;
        }
        let element = {id:key,alias:data.alias, message:msg};
        this.messages = [...this.messages,element];
        this.updatechatscoll()
      }
    },
    async sendmessage(){
      //this.message
      let user = this.gun.user();
      if(!this.message){
        return;
      }
      let createTime = unixTime();
      //console.log(user.is.alias);
      
      let sec = await this.SEA.work("public","chat");//encrypttion key default?
      let enc = await this.SEA.encrypt(this.message,sec);

      this.gun.get('chatroom').get(createTime).put({
        alias:user.is.alias,
        message:enc
      },(ack)=>{
        console.log(ack);
      });
      this.message = "";
      
    },
    updatechatscoll(){
      setTimeout(()=>{
        if(typeof document !== "undefined"){
          let element = document.getElementById("messagebox");
          element.scrollTop = element.scrollHeight;
        }
      },50);
    }
  }
}
</script>
<template>
  <div style="height:100%;">
    <div id="chatmessagebox" class="col-container" style="height:calc(100% - 40px);">
      <div id="messagebox" class="col" style="height:calc(100% - 10px);background-color:#aaa;overflow-y: scroll;">
        <div v-for="item in messages" :key="item.id">
          {{ item.alias }} | > | {{ item.message }}
        </div>
      </div>
      <div class="col" style="width:100px; background-color:#bbb;"></div>
    </div>
    <div style="height:40px;width:100%;background-color:gray;">
      <div class="chatboxinput">
        <input type="text" size="63" v-model="message" @change="sendmessage" />
        <input type="submit" value="Send" @click="sendmessage" />
      </div>
    </div>
  </div>
</template>
<style>
.chatboxinput{
  padding: 8px;
  /*border: 1px solid #4CAF50;*/
}
</style>
