<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { SIGNINInjectKey, AUTHSTATUSInjectKey} from "./GunKeys.mjs";
import { routerKey } from "vue-router";

export default {
  inject:{
    login:{from:SIGNINInjectKey},
    router:{from:routerKey},
    authStatus:{from:AUTHSTATUSInjectKey},
  },
  data() {
    return {
      status: 'Ready!',
      username:'q',
      passphrase:'12345678',
    }
  },
  mounted(){
    console.log("MOUNT")
    console.log(this.$refs.inputRef)
    this.$refs.inputRef.focus()
  },
  methods: {
    async clickLogin(){
      try{
        let status = await this.login(this.username, this.passphrase);
        console.log("status")
        console.log(status)
        this.status = "auth";
      }catch(e){
        console.log(e)
        this.status = e;
      }
    },
    clickRegister(){
      console.log("register");
      this.router.push("/signup")
    },
    clickForgot(){
      console.log("forgot");
      this.router.push("/forgot")
    }
  }
}
</script>
<template>
  <template v-if="authStatus=='auth'">
    <div>
      <label> Auth! </label>
    </div>
  </template>
  <template v-if="authStatus=='unauth' || authStatus=='login'">
    <div>
      <table>
        <tbody>
          <tr>
            <td>Login Status:</td>
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
              <button @click="clickRegister">Register</button>
              <button @click="clickForgot">Forgot</button>
              <button @click="clickLogin">Login</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>
<style>
</style>