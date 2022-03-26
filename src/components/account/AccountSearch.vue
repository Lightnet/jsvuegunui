<script>
import { GunInjectKey } from "../gun/GunKeys.mjs";
export default {
  inject:{
    gun:{from:GunInjectKey}
  },
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  watch: {
    value:function(newvalue,oldvalue){
      //console.log(this.value);
      //console.log("value???");
      this.lookupalias();
    }
  },
  components: {
  },
  data() {
    return {
      pubid:'',
      identity:'',
      alias:'',
      born:'',
      education:'',
      skills:'',
      LI:{},
    }
  },
  created(){
    //this.$on('searchalias',this.lookupalias);
  },
  methods: {
    async lookupalias(event){
      //console.log("looking...");
      let to = this.gun.user(this.pubid);
      let user = this.gun.user();
      let who = await to.get('alias').then();
      if (!who){
          this.alias = '';
          this.identity = '';
          this.born = '';
          this.education = '';
          this.skills = '';
          return;
      }
      this.alias = who;

      let identity = await to.get('alias').then();
      this.identity = identity;
      //let alias = await to.get('profile').get('alias').then();
      this.searchprofile()
    },
    async searchprofile(){
      let self = this;
      let user = this.gun.user();
      let find = this.gun.user(this.pubid);

      find.get('profile').get('alias').once(ack=>{
        console.log(ack)
        self.alias=ack;
      })
      find.get('profile').get('born').once(ack=>{
        console.log(ack)
        self.born=ack;
      })
      find.get('profile').get('education').once(ack=>{
        console.log(ack)
        self.education=ack;
      })
      find.get('profile').get('alias').once(ack=>{
        console.log(ack)
        self.alias=ack;
      })
      find.get('profile').get('skills').once(ack=>{
        console.log(ack)
        self.skills=ack;
      })
      /*
      find.get('profile').on(function(data, key, at, ev){//get map data
        //console.log(data);
        //console.log(key);
        ev.off(); //pervent loops listen add on?
        Gun.node.is(data, async function(v, k){
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
      //console.log(pkey)
      var mix = await Gun.SEA.secret(await user.get('epub').then(), user.pair());
      //let epub = await user.get('epub').then();
      pkey = await Gun.SEA.decrypt(pkey, mix);
      //console.log(pkey)
      let val = await Gun.SEA.decrypt(_value, pkey);
      //console.log(val)
      return val || _value;
    },
  }
}
</script>
<template>
  <div>
    Alias Public Key Search
    <table>
      <tbody>
        <tr>
          <td>Public Key</td>
          <!--
              <input :value="value" @input="lookupalias">
          -->
          <td><input v-model="pubid" @input="lookupalias"></td>
        </tr>
        <tr>
          <td>Identity</td>
          <td><input v-model="identity" disabled></td>
        </tr>
        <tr>
          <td>Alias</td>
          <td><input v-model="alias"></td>
        </tr>
        <tr>
          <td>Born</td>
          <td><input v-model="born"></td>
        </tr>
        <tr>
          <td>Education</td>
          <td><input v-model="education"></td>
        </tr>
        <tr>
          <td>Skills</td>
          <td><input v-model="skills"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>