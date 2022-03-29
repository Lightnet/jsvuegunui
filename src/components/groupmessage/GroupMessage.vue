<script setup>
import SEA from "gun/sea"
import { inject, onMounted, onUnmounted, ref, unref } from 'vue';
import { isEmpty, nanoid16, nanoid32, unixTime } from "../../libs/helper.mjs";
import { GunInjectKey } from '../gun/GunKeys.mjs';

const gun = inject(GunInjectKey);

const isAdmin = ref(true)
const publicKey = ref("")
const groupMessageID = ref("")
const groupMessages = ref([])

const message = ref("");
const messages = ref([]);
let gunGroupMessage = null;
let privateShareKey = null;
const scrollMessages = ref(null);

getGroupList();

function getGroupList(){
  let user = gun.user();
  user.get('groupmessage').once().map().once(function(data,key){
    if(data !=null){
      //console.log(data)
      addGroupMap(key,data);
    }
  });
}

async function addGroupMap(index, data){
  let user = gun.user();
  let name = await user.get('groupmessage').get(index).get('info').get('name').then();
  if(name){
    //setGroups(item=>[...item,{id: index, name : name}])
    groupMessages.value = [...groupMessages.value,{id: index, name : name}]
  }
}

function clickJoin(){
  initGroupChat();
}

async function createGroupMessage(){
  let user = gun.user();// get user graph
  let pair = user._.sea;//user pair
  let seaPair = await SEA.pair();
  let genGroupMessageID = seaPair.pub;
  let genSharekey = nanoid32();
  let groupName = "group message "+nanoid16();//id name
  let groupDescription= "group message";//id description

  let enc = await SEA.encrypt(genSharekey, pair);//encode share key
  let encPair = await SEA.encrypt(seaPair, pair);
  console.log(enc);
  console.log(encPair);

  user.get('groupmessage')
    .get(genGroupMessageID).get('sharekey').put(enc);
  user.get('groupmessage')
    .get(genGroupMessageID).get('key').put(encPair);

  let dh = await SEA.secret(pair.epub, pair);
  enc = await SEA.encrypt(genSharekey, dh);

  // sharekey
  user.get('groupmessage')
    .get(genGroupMessageID)
    .get('pub')
    .get(pair.pub)
    .put(enc);

  user.get('groupmessage')
    .get(genGroupMessageID)
    .get('info')
    .put({
      pub:pair.pub,
      name:groupName,
      description:groupDescription,
      date:unixTime()
    });
  gun.get(genGroupMessageID)
    .get('info')
    .put({
      pub:pair.pub,
      name:groupName,
      description:groupDescription,
      date:unixTime()
    });

}
// INIT CHAT
async function initGroupChat(){
  let groupKey = (unref(groupMessageID) || "").trim();
  console.log(groupKey)
  if(isEmpty(groupKey)){
    console.log("EMPTY");
    return;
  }
  console.log("groupKey:",groupKey);
  let user = gun.user();
  let pair = user._.sea;
  //GET ENC SHARE KEY
  let pub = await gun.get(groupKey).get('info').get('pub').then();
  let title = await gun.get(groupKey).get('info').get('name').then();
  if(!pub){
    console.log('init group chat id not found!')
    return;
  }
  //UI element
  //admin check
  if(pub == user.is.pub){

  }else{ // member

  }

  let to = gun.user(pub);
  let epub =await to.get('epub').then();
  let encsharekey = await to.get('groupmessage').get(groupKey).get('pub').get(pair.pub).then();
  console.log("encsharekey")
  console.log(encsharekey)
  let dh = await SEA.secret(epub, pair);
  console.log("dh")
  console.log(dh)
  let dec = await SEA.decrypt(encsharekey, dh);
  console.log(dec);
  if(dec==null){
    console.log("NULL SHARE KEY!");
    //setisRoom(false);
    return;
  }
  privateShareKey = dec;
  if(gunGroupMessage){
    gunGroupMessage.off();
  }

  gunGroupMessage = gun.get(groupKey);

  async function qcallback(data,key){
    console.log('incoming messages...')
    //console.log("key",key);
    //console.log("data",data);
    if(data == null)return;
    if(data.message != null){
      let message = window.atob(data.message);
      let decmsg = await SEA.decrypt(message,privateShareKey);
      if(decmsg!=null){
        console.log('incoming message...');
        //add message
        //setMessages(item=>[...item,{id: key,text : data.alias + ": " + decmsg}])
        messages.value = [...messages.value,{id: key,text : data.alias + ": " + decmsg}]
        setTimeout(()=>{
          handleScrollDown();
        },100);
        
      }
    }
  }

  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2);
  let date = ("0" +currentDate.getDate()).slice(-2);
  let timestring = year + "/" + month + "/" + date + ":";

  gunGroupMessage.get('message').get({'.': {'>': timestring},'%': 50000}).map().once(qcallback);
  console.log('END GROUP CHAT LISTEN',groupKey)

}
//Send Message
async function sendMessage(){
  console.log('ENTER MESSAGE');
  let user = gun.user();
  if(!user.is){ return }//check if user exist
  let msg = (unref(message) || '').trim();
  if(!msg) return;//check if not id empty
  let who = await user.get('alias').then();

  if(gunGroupMessage){
    let enc = await SEA.encrypt(msg, privateShareKey);

    enc = window.btoa(enc);//gun graph need to be string not SEA{} that will reject that is not soul of user
    //timestamp()
    
    gunGroupMessage.get('message').get(timestamp()).put({
      alias:who,
      message:enc
    });
  }
}
function timestamp(){
  let currentDate = new Date();
  //console.log(currentDate);
  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1 ) ).slice(-2);
  let date = ("0" +currentDate.getDate()).slice(-2);
  let hour = ("0" +currentDate.getHours()).slice(-2);
  let minute = ("0" +currentDate.getMinutes()).slice(-2);
  let second = ("0" +currentDate.getSeconds()).slice(-2);
  let millisecond = currentDate.getMilliseconds();
  return year + "/" + (month) + "/" + date + ":" + hour+ ":" + minute+ ":" + second+ ":" + millisecond;        
}

async function addGroupMessage(){
  let groupKey = (unref(groupMessageID) || "").trim();
  let user = gun.user();
  if(!user.is)return;
  if(isEmpty(groupKey)){
    console.log("EMPTY GROUP ID");
    return;
  }
  let gkey = await gun.get(groupKey).then();
  if(gkey == undefined){
    console.log("NOT FOUND!");
    return;
  }
  let guninfo = gun.get(groupKey).get('info');
  let pub = await guninfo.get('pub').then();
  let title = await guninfo.get('name').then();
  let description = await guninfo.get('description').then();
  let date = await guninfo.get('date').then();
  let dataGroup ={
    pub:pub,
    name: title,
    description:description,
    date:date
  };
  console.log(dataGroup)
  user.get('groupmessage').get(groupKey).get('info').put(dataGroup);

}

async function removeGroupMessage(){
  // need to check for admin delete
  let groupKey = (unref(groupMessageID) || "").trim();
  let user = gun.user();
  if(!user.is)return;
  if(isEmpty(groupKey)){
    console.log("Empty!")
    return;
  }
  let gkey = await gun.get(groupKey).then();
  if(gkey == undefined){
    console.log("NOT FOUND!");
    return;
  }
  user.get('groupmessage').get(groupKey).put(null);
  console.log("remove group message")
  groupMessages.value=groupMessages.value.filter(item=>item.id != groupKey)
  groupMessageID.value=""
}

function clickCreateGroupMessage(){
  createGroupMessage()
}

function clickDeleteGroupMessage(){

}

async function clickGrantAlias(){
  let groupKey = (unref(groupMessageID) || "").trim();
  if(isEmpty(groupKey)){
    console.log("EMPTY groupKey");
    return;
  }
  let pkey = privateShareKey;
  let pubKey = (unref(publicKey) || "").trim();
  if(isEmpty(pubKey)){
    console.log("EMPTY pubKey");
    return;
  }
  let pownid = await gun.get(groupKey).get('info').get('pub').then();
  if(pownid == pubKey){
    console.log("owner!");
    return;
  }
  let user = gun.user();
  let pair = user._.sea;
  let to = gun.user(pubKey);
  let who = await to.get('alias').then();

  if(!who)return;

  if(!pkey)return;

  let pub = await to.get('pub').then();
  let epub = await to.get('epub').then();
  let dh = await SEA.secret(epub, pair);
  let enc = await SEA.encrypt(pkey, dh);

  user.get('groupmessage')
    .get(groupKey)
    .get('pub')
    .get(pub).put(enc);

  console.log(pkey);
  console.log("finish grant!", pub);
}

async function clickRevokeAlias(){
  let groupKey = (unref(groupMessageID) || "").trim();
  if(isEmpty(groupKey)){
    console.log("EMPTY groupKey");
    return;
  }

  let pkey = privateShareKey;
  let pubKey = (unref(publicKey) || "").trim();
  if(isEmpty(pubKey)){
    console.log("EMPTY pubKey");
    return;
  }
  let pownid = await gun.get(groupKey).get('info').get('pub').then();
  if(pownid == pubKey){
    console.log("owner!");
    return;
  }
  let user = gun.user();
  //let pair = user._.sea;
  let to = gun.user(pubKey);
  let who = await to.get('alias').then();

  if(!who)return;

  if(!pkey)return;

  let pub = await to.get('pub').then();
  user.get('groupmessage')
    .get(groupKey)
    .get('pub')
    .get(pub).put(null);
  console.log(pkey);
  console.log("finish revoke!", pub);

}

onMounted(()=>{

})

onUnmounted(()=>{

})

function handleScrollDown(){
  //console.log("??scrollMessages.value")
  //console.log(scrollMessages.value)
  if((scrollMessages.value!=null)&&(scrollMessages.value?.scrollHeight!=null)){
    //scrollMessages.value.scrollTop = scrollMessages.value.scrollHeight + 10;
    scrollMessages.value.scrollTop = scrollMessages.value.scrollHeight;
  }
}

function handleScroll(e){
  //console.log("scrollMessages.value")
  //console.log(scrollMessages.value)
  //if ((e.target.scrollHeight-30) <= e.target.scrollTop) {
    //alert("oi sou Eduardo Martins");
    //console.log("scroll???")
  //}
}
</script>
<template>
  <div style="height:calc(100% - 18px)">
    <div>
      <label> Group Message ID: </label>
      <input v-model="groupMessageID" @change="(e)=>groupMessageID=e.target.value" size="30" />
      <select v-model="groupMessageID" @change="(e)=>groupMessageID=e.target.value">
        <option value="" >Select Group ID</option>
        <option v-for="item in groupMessages" :key="item.id" :value="item.id" >{{item.name}}</option>
      </select>
      <button @click="clickJoin"> Join </button>
      <button @click="addGroupMessage"> Add </button>
      <button @click="removeGroupMessage"> Remove </button>
      <button @click="clickCreateGroupMessage"> Create </button>
    </div>
    
    <template v-if="isAdmin">
      <div>
        <button @click="clickDeleteGroupMessage"> Delete </button>
        <label>Public Key:</label>
        <input v-model="publicKey" @change="(e)=>publicKey=e.target.value"/>
        <button @click="clickGrantAlias"> Grant </button>
        <button @click="clickRevokeAlias"> Revoke </button>
      </div>
    </template>
    <div style="height:calc( 100% - 2*18px)">
      <div ref="scrollMessages" id="CHATMESSAGEs" v-on:scroll.passive="handleScroll" style="height:calc( 100% - 18px);overflow-y: scroll;"> 
        <div v-for="item in messages" :key="item.id"> {{item.text}} </div>
      </div>
      <div id="CHATBOX" style="height:18px"> 
        <input v-model="message" @change="(e)=>message=e.target.value" v-on:keyup.enter="sendMessage"/><button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>