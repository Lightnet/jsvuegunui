<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { SIGNUPInjectKey } from "./GunKeys.mjs";
import { routerKey } from "vue-router";

export default {
  inject:{
    signup:{
      from:SIGNUPInjectKey
    },
    router:{
      from:routerKey
    }
  },
  data() {
    return {
      status: 'Ready!',
      username:'',
      passphrase:'',
    }
  },
  methods: {
    clickRecovery(){
      //this.signup(this.username, this.passphrase);
    },
    clickCancel(){
      console.log("register");
      //console.log(this.router)
      this.router.push("/login")
    },
  }
}

</script>
<template>
  <div>
    <div>
      <table>
        <tbody>
          <tr>
            <td>Forgot Status:</td>
            <td>{{status}}</td>
          </tr>
          <tr>
            <td>User:</td>
            <td><input v-model="username"></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input v-model="passphrase"></td>
          </tr>
          <tr>
            <td>
            </td>
            <td style=" text-align: center;">
              <button @click="clickRecovery"> Recovery </button>
              <button @click="clickCancel"> Cancel </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
</style>