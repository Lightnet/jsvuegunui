<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { toRaw, unref } from "vue";
import { GunInjectKey } from "../gun/GunKeys.mjs";
export default {
  inject:{
    gun:{from:GunInjectKey}
  },
  components: {
  },
  data() {
    return {
      alias:'',
      born:'',
      education:'',
      skills:'',
    }
  },
  async created(){
    this.getProfileInfo()
  },
  methods: {
    async getProfileInfo(){
      let self = this;
      let user = this.gun.user();
      let find = this.gun.user();
      user.get('profile').get('alias').once(ack=>{
        //console.log(ack)
        self.alias=ack;
      })
      user.get('profile').get('born').once(ack=>{
        //console.log(ack)
        self.born=ack;
      })
      user.get('profile').get('education').once(ack=>{
        //console.log(ack)
        self.education=ack;
      })
      user.get('profile').get('alias').once(ack=>{
        //console.log(ack)
        self.alias=ack;
      })
      user.get('profile').get('skills').once(ack=>{
        //console.log(ack)
        self.skills=ack;
      })

      /*
      find.get('profile').on(function(data, key, at, ev){//get map data
        //console.log(data);
        //console.log(key);
        ev.off(); //pervent loops listen add on?
        console.log(Gun)
        //Gun.node.is(data, async function(v, k){
        Gun.is(data, async function(v, k){
          console.log("HELLO WO")
          //console.log(k);// variable
          //console.log(v);// crypt
          var key = await find.get('trust').get(user.pair().pub).get(k+'profile').then();
          var mix = await Gun.SEA.secret(await find.get('epub').then(), user.pair());
          key = await Gun.SEA.decrypt(key, mix);
          var val = await Gun.SEA.decrypt(v, key);
          if(k == 'alias'){
            self.alias = val || v
          }
          if(k == 'born'){
            self.born = val || v
          }
          if(k == 'education'){
            self.education = val || v
          }
          if(k == 'skills'){
            self.skills = val || v
          }
          //console.log(val);
        });
      });
      */
    },
    async getprofilevar(_name,_value){
      let user = this.gun.user();

      let pkey = await user.get('trust').get(user.pair().pub).get(_name+'profile').then();
      console.log(pkey)
      var mix = await Gun.SEA.secret(await user.get('epub').then(), user.pair());
      let epub = await user.get('epub').then();
      pkey = await Gun.SEA.decrypt(pkey, mix);
      //console.log(pkey)
      let val = await Gun.SEA.decrypt(_value, pkey);
      //console.log(val)
      return val || _value;
    },
    async inputProfileName(event){
      //console.log("value",event.target.value);
      //console.log("name",event.target.name);
      //console.log("type",event.target.type);
      let user = this.gun.user();
      //user.get('profile').get('skills').secret(this.skills,ack=>{
        //console.log(ack);
      //});
      //user.get('profile').get('skills').secret(this.skills);
      user.get('profile').get(event.target.name).put(event.target.value);
    },
    grant(param){
      console.log(param);
      //$("#DialogGrant").data('param_1',param);
      //$("#DialogGrant").dialog('open');
      //$("#DialogGrant").data('param_1',param).dialog('open');
      //$("#DialogGrantAlias")['param_1']=param;
      //document.getElementById("keyparam").value = param;
      //$("#DialogGrant").dialog('open');
    }
  }
}
</script>
<template>
  <div>
    Profile: (Press Enter to update profile.)
    <table>
      <tbody>
        <tr>
          <td>Alias</td>
          <td><input name="alias" @change="inputProfileName" v-model="alias"><button @click="grant('alias')">+</button></td>
        </tr>
        <tr>
          <td>Born</td>
          <td><input name="born" @change="inputProfileName" v-model="born"><button @click="grant('born')">+</button></td>
        </tr>
        <tr>
          <td>Education</td>
          <td><input name="education" @change="inputProfileName" v-model="education"><button @click="grant('education')">+</button></td>
        </tr>
        <tr>
          <td>Skills</td>
          <td><input name="skills" @change="inputProfileName" v-model="skills"><button @click="grant('skills')">+</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>