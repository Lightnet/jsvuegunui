<template>
    <div>
        <div id="chatmessagebox" class="col-container" style="">
            <div id="messagebox" class="col" style="background-color:#aaa;overflow-y: scroll;">
                <div v-for="item in messages" :key="item.id">
                    {{ item.alias }} | > | {{ item.message }}
                </div>
            </div>
            <div class="col" style="width:100px; background-color:#bbb;"></div>
        </div>
        <div style="height:40px;width:100%;background-color:gray;">
            <div class="chatboxinput">
                <input type="text" size="63" v-model="message"/>
                <input type="submit" value="Send" @click="sendmessage" />
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

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
    mounted(){
        
        let $win = $(window);
        $("#chatmessagebox").height($win.height()-114);
        $win.on('resize',function(){
            $("#chatmessagebox").height($win.height()-114);
        });
        
        
        $("#messagebox").height($win.height()-120);
        $win.on('resize',function(){
            $("#messagebox").height($win.height()-120);
        });
        
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
.chatboxinput{
    padding: 8px;
    /*border: 1px solid #4CAF50;*/
}
</style>