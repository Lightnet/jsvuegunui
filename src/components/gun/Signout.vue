<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { SIGNOUTInjectKey, AUTHSTATUSInjectKey } from "./GunKeys.mjs";
import { routerKey } from "vue-router";

export default {
  inject:{
    signout:{from:SIGNOUTInjectKey},
    router:{from:routerKey},
    authStatus:{from:AUTHSTATUSInjectKey},
  },
  data() {
    return {
      status: 'Ready!',
    }
  },
  methods: {
    async clickSignOut(){
      console.log("register");
      //console.log(this.router)
      try{
        let status = await this.signout();
        console.log("status")
        console.log(status)
        this.status = "SIGNOUT!";
      }catch(e){
        console.log(e)
        this.status = e;
      }
    },
    clickCancel(){
      this.router.push("/")
    }
  }
}
</script>
<template>
  <template v-if="authStatus=='auth'">
    <div>
      <table>
        <tbody>
          <tr>
            <td>Are you sure to Sign Out?:</td>
            <td>{{status}}</td>
          </tr>
          <tr>
            <td style=" text-align: center;" colspan="2">
              <button @click="clickCancel">Cancel</button>
              <button @click="clickSignOut">Logout</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <template v-if="authStatus=='unath' || authStatus=='login'">
    <label> Error? </label>
  </template>
</template>
<style>
</style>