<script>
import { toRaw } from "vue";
import { GunInjectKey,SEAInjectKey } from "../gun/GunKeys.mjs";
export default {
  inject:{
    gun:{from:GunInjectKey},
    SEA:{from:SEAInjectKey},
  },
  components: {
  },  
  data() {
    return {
      messages:[],
      contacts:[],
      bdisplaycontact:true,
      alias:'',
      publickey:'',
      messagesubject:'',
      messagecontent:'',
      selectitem:'',
      bfound:false,
      statussearch:'Normal',
      chatboxheight:134,
      chatmessageheight:136,
    }
  },
  created(){

  },
  mounted(){
    this.UpdateContactList();
    console.log("mount message!")
  },
  unmounted(){
    console.log("unmount message!")
  },
  methods: {
    togglecontact(){
      if(this.bdisplaycontact){
        this.bdisplaycontact = false;
      }else{
        this.bdisplaycontact = true;
      }
    },
    async sendprivatemessage(){
      console.log("SEND MESSAGE...")
      let user = this.gun.user();
      let gun = this.gun;
      //let userprivatemessageid = await user.get('privatemessage').get('key').then();//create private message table incase of spam
      //create it
      if(!user.is){ return }//check if user exist
      let pub = (this.publickey || '').trim();
      let message = (this.messagecontent || '').trim();
      if(!message) return;//check if not message empty
      if(!pub) return;//check if not id empty
      let to = gun.user(pub);//get alias
      let who = await to.then() || {};//get alias data
      if(!who.alias){
        //console.log("No Alias!");
        return;
      }
      //console.log(who);
      console.log(toRaw(who));
      console.log(message)

      let sec = await this.SEA.secret(toRaw(who).epub, toRaw(user._.sea)); // Diffie-Hellman
      let enc = await this.SEA.encrypt(message, sec); //encrypt message
      console.log(enc);
      //console.log(to);
      user.get('messages').get(pub).set(enc);
      this.messagecontent = '';
    },
    async viewprivatemessages(){
      let user = this.gun.user();
      let gun = this.gun;
      this.messages = [];
      //let userprivatemessageid = await user.get('privatemessage').get('key').then();//create private message table incase of spam
      //create it
      if(!user.is){ return }//check if user exist
      let pub = (this.publickey || '').trim();
      //let message = (this.messagecontent || '').trim();
      //if(!message) return;//check if not message empty
      if(!pub) return;//check if not id empty
      let to = gun.user(pub);//get alias
      let who = await to.then() || {};//get alias data
      if(!who.alias){
        console.log("No Alias!");
        this.messages = [];
        return;
      }
      this.UI.dec = await this.SEA.secret(who.epub, user._.sea); // Diffie-Hellman
      console.log("INIT MESSAGES");
      let self= this;
      //user.get('messages').get(pub).once().map().once((data,id)=>{
      user.get('messages').get(pub).map().once((data,id)=>{
        console.log("TO USER")
        self.UI(data,id,user.is.alias)
      });
      //to.get('messages').get(user._.sea.pub).once().map().once((data,id)=>{
      to.get('messages').get(user._.sea.pub).map().once((data,id)=>{
        console.log("TO OWNER")
        self.UI(data,id,who.alias)
      });
      console.log("end messages");
    },
    async UI(say, id, alias){
      console.log("SAY MESSAGES...")
      //console.log(say)
      say = await this.SEA.decrypt(say, this.UI.dec);
      console.log(say)
      this.messages.push({id:id,alias:alias,message:say});
      this.scrollDown();  
    },
    UpdateContactList(){
      let self = this;
      let user = this.gun.user();
      self.contacts = [];

      user.get('contact').once().map().once((data,id)=>{
        //console.log(data);
        if(!data.alias)//check for name to exist
          return;
        //var option = $('#' + id).get(0) || $('<option>').attr('id', id).appendTo('#contacts');//check if option id exist else create.
        if(data){
          if(data == 'null'){
              //$(option).hide();//hide element
          }
          //console.log('data',data);
          self.contacts.push({id:id,alias:data.alias,pub:data.pub});
          //console.log({id:id,alias:data.alias,pub:data.pub});
          //$(option).text(data.name);//set text
        } else {
          //$(option).hide();//hide element
        }
      });
    },
    selectcontact(event){
      //console.log("event");
      //console.log(event.target);
      //console.log(this.selectitem);
      this.publickey = this.selectitem;
      this.checkalias();
    },
    async addcontact(){
      if (this.bfound == false)
          return;
      let user = this.gun.user();
      user.get('contact').get(this.alias).put({alias:this.alias,pub:this.publickey});
      //this.publickey = '';
      //console.log("Add Contact");
      this.UpdateContactList();
    },
    removecontact(){
      if (this.bfound == false)
        return;
      let user = this.gun.user();
      user.get('contact').get(this.alias).put('null');//null contact list match id
      this.UpdateContactList();
    },
    async checkalias(event){
      //console.log("typing...");
      //console.log(event.target.value);
      let publickey = null;
      if (event == null){
        publickey = this.publickey;
      }else{
        publickey = event.target.value;
      }
      let to = this.gun.user(publickey);
      let who = await to.get('alias').then();
      if(!who){
        this.statussearch = 'No Alias!';
        this.bfound = false;
        return;
      }else{
        this.statussearch = 'Found! ' + who;
        this.bfound = true;
        this.publickey = publickey;
        this.alias = who;
        console.log("INIT MESSAGE?????.......")
        this.viewprivatemessages();
      }
      
    },
    scrollDown(){
      let element = document.getElementById("messagebox");
      element.scrollTop = element.scrollHeight+10;
    }
  }
}
</script>

<template>
  <div style="height:calc(100%)">
    <div id="chatmessagebox" class="col-container" style="height:calc(100% - 78px)">
      <div id="messagebox" class="col" style="height:calc(100% - 10px);background-color:#aaa;overflow-y: scroll;">
        <div v-for="item in messages" :key="item.id">
          {{ item.alias }} | > | {{ item.message }}
        </div>
      </div>
      <div class="col" style="width:100px; background-color:#bbb;"></div>
    </div>
    <div style="height:70px;width:100%;background-color:gray;padding: 4px;">
      <button @click="togglecontact">Contact</button>
        <template v-if="bdisplaycontact">
          <select v-model="selectitem" @change="selectcontact">
            <option selected="true"> None </option>
            <option v-for="item in contacts" :key="item.id" v-bind:value="item.pub"> {{item.alias}}</option>
          </select>
          Public Key:
          <input v-model="publickey" v-on:keyup="checkalias">
          <button @click="addcontact">Add</button>
          <button @click="removecontact">Remove</button>
        </template>
      <label>Status:{{statussearch}}</label>
      <br>Content:<textarea v-model="messagecontent" v-on:keyup.enter="sendprivatemessage" />  
      <button @click="sendprivatemessage">Send</button>
    </div>
  </div>
</template>