<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { SIGNUPInjectKey } from "./GunKeys.mjs";
import { routerKey } from "vue-router";

export default {
  inject:{
    signup:{from:SIGNUPInjectKey},
    router:{from:routerKey}
  },
  data() {
    return {
      status: 'Ready!',
      username:'',
      passphrase:'12345678',
    }
  },
  mounted(){
    console.log("MOUNT")
    console.log(this.$refs.inputRef)
    this.$refs.inputRef.focus()
  },
  methods: {
    async clickRegister(){
      console.log("register");
      //console.log(this.router)
      try{
        let status = await this.signup(this.username, this.passphrase);
        console.log("status")
        console.log(status)
        this.status = "Created!";
      }catch(e){
        console.log(e)
        this.status = e;
      }
    },
    clickCancel(){
      console.log("login");
      this.router.push("/login")
    }
  }
}
</script>
<template>
  <div>
    <div>
      <table>
        <tbody>
          <tr>
            <td>Register Status:</td>
            <td>{{status}}</td>
          </tr>
          <tr>
            <td>User:</td>
            <td><input ref="inputRef" v-model="username"></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input v-model="passphrase"></td>
          </tr>
          <tr>
            <td style=" text-align: center;" colspan="2">
              <button @click="clickCancel">Cancel</button>
              <button @click="clickRegister">Register</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
</style>