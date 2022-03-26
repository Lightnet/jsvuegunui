<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { GunInjectKey,SEAInjectKey } from "../gun/GunKeys.mjs";
import { routerKey } from "vue-router";
export default {
  inject:{
    gun:{from:GunInjectKey},
    SEA:{from:SEAInjectKey},
    router:{from:routerKey}
  },
  watch:{
    alias:async function(val){//watch input alias variable changes
      let gun = this.gun;
      let alias = await gun.get('~@'+val).then(); //broken or remove?
      console.log(alias);
      if(!alias){
        this.statusdisplay = 'Not Found!';
        return;
      }else{
        this.statusdisplay = 'Found!';
      }
      let publickey = '';
      for(var obj in alias){
        console.log(obj);
        publickey = obj;
      }
      publickey = publickey.substring(1,publickey.length);//remove ~ string begin
      this.publickey = publickey;
    }
  },
  data() {
    return {
      msg: 'Recover Forgot Passphase!',
      publickey:'',
      alias:'',
      question1:'',
      question2:'',
      hint:'',
      statusdisplay:'Normal',
    }
  },
  methods: {
    async clickSubmit(){
      console.log("Recover login...");
      //console.log(this.alias);
      //console.log(this.$gun);
      let gun = this.gun;
      //let user = this.$gun.user();
      let alias = (this.alias || '').trim(); //get alias input
      let q1 = (this.question1 || '').trim(); //get q1 input
      let q2 = (this.question2 || '').trim(); //get q2 input
      //console.log('get forgot hint');
      if(!alias){
        console.log('Empty!');
        return;
      }
      if((!q1)||(!q2)){
        console.log('Q Empty!');
        return;
      }   
      //console.log(alias);
      //Make sure the alias and public key are working
      alias = await gun.get('~@'+this.alias).then();//look for hash id
      let publickey = '';
      for(var obj in alias){
        //console.log(obj);
        publickey = obj;
      }
      publickey = publickey.substring(1,publickey.length);
      if(!publickey){
        return;
      }
      //let publickey = this.publickey;
      let to = this.gun.user(publickey);
      let who = await to.get('alias').then();
      //let who = await gun.get('alias/'+alias).then() || {};//get alias data
      //console.log(who);
      if(!who){
        //console.log(who);
        console.log('Not Alias!');
        return;
      }
      //let hint = await gun.get('alias/'+alias).map().get('hint').then();//get hash hint string
      let hint = await to.get('hint').then();
      let dec = await this.SEA.work(q1,q2);//get q1 and q2 string to key hash
      hint = await this.SEA.decrypt(hint,dec);//get hint and key decrypt message
      //console.log('hint',hint);
      if(hint !=null){//check if hint is string or null
        //$('#hint').val(hint);//get hint and set input value
        this.hint = hint;
      }else{
        //$('#hint').val('Fail Decrypt!');//if null set input to message user.
        this.hint = 'Fail Decrypt!';
      }
      console.log("end checked...");
    },
    clickCancel(){
      //this.$parent.$emit('view','access');
      this.router.push("/login")
    }
  }
}
</script>
<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>User:</td>
          <td><input v-model="alias"> Status:{{statusdisplay}}</td>
        </tr>
        <tr>
          <td>Question 1:</td>
          <td><input v-model="question1"></td>
        </tr><tr>
          <td>Question 2:</td>
          <td><input v-model="question2"></td>
        </tr><tr>
          <td>Hint:</td>
          <td><input v-model="hint"></td>
        </tr>
        <tr>
          <td>
          </td>
          <td style=" text-align: center;">
            <button @click="clickSubmit">Submit</button>
            <button @click="clickCancel">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
</style>