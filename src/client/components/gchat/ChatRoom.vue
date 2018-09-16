<template>
    <div id="wrapper">
        <div id="menu">
            <p class="welcome">Welcome, <b></b></p>
            <p class="logout"><a id="exit" href="#">Exit Chat</a></p>
            <div style="clear:both"></div>
        </div>
        <div id="chatbox">
            <div v-for="item in messages" :key="item.id">
                {{ item.alias }} | > | {{ item.message }}
            </div>
        </div>
        <form name="message" action="javascript:void(0);">
            <input name="usermsg" type="text" id="usermsg" size="63" v-model="message"/>
            <input name="submitmsg" type="submit"  id="submitmsg" value="Send" @click="sendmessage" />
        </form>
    </div>
</template>

<script>
export default {
    components: {
        
    },
    data() {
        return {
            chatdata:null,
            messages:[],
            message:''
        }
    },
    created(){
        let gun = this.$gun;
        this.chatroom = gun.get('chatroom');

        this.chatroom.time((data, key, time)=>{//listen setup
            gun.get(data['#']).once((d,id)=>{
                //console.log(id);
                //console.log(d);
                //console.log(d.message);
                this.messages.push({id:id,alias:d.alias,message:d.message});
            });
        },20);//number display when loaded and time is trigger here if push.
    },
    methods: {
        sendmessage(){
            //this.message
            let user = this.$gun.user();
            console.log(user.is.alias);
            this.chatroom.time({alias:user.is.alias,message:this.message});
        }
    }
}
</script>

<style>
form, p, span {
    margin:0;
    padding:0; }

input { font:12px 'Courier New'; }

a {
    color:#0000FF;
    text-decoration:none; }
  
    a:hover { text-decoration:underline; }
  
#wrapper, #loginform {
    padding-bottom:8px;
    /*margin:0 auto;
    background:#EBF4FB;
    */
    width:504px;
    border:1px solid #ACD8F0; }
  
#loginform { padding-top:18px; }
  
#loginform p { margin: 5px; }
  
#chatbox {
    text-align:left;
    /*
    margin:0 auto;
    */
    margin-bottom:25px;
    padding:10px;
    background:#fff;
    height:270px;
    width:430px;
    border:1px solid #ACD8F0;
    overflow:auto; }
  
#usermsg {
    width:395px;
    border:1px solid #ACD8F0; }
  
#submit { width: 60px; }
  
.error { color: #ff0000; }
  
#menu { padding:20px 20px 20px 20px; }
  
.welcome { float:left; }
  
.logout { float:right; }
  
.msgln { margin:0 0 2px 0; }

</style>