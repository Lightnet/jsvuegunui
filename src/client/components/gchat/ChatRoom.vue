<template>
    <div>
        <div id="chatmessagebox" class="col-container" style="">
            <div id="messagebox" class="col" style="background-color:#aaa;overflow-y: scroll;">
                <div v-for="item in messages" :key="item.id">
                    {{ item.alias }} | > | {{ item.message }}
                </div>
            </div>
            <div class="col" style="width:100px; background-color:#bbb;">Test2</div>
        </div>
        <div style="height:30px;width:100%;background-color:gray;">
            <form name="message" action="javascript:void(0);">
                <input name="usermsg" type="text" id="usermsg" size="63" v-model="message"/>
                <input name="submitmsg" type="submit"  id="submitmsg" value="Send" @click="sendmessage" />
            </form>
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
        $("#chatmessagebox").height($win.height()-90);
        $win.on('resize',function(){
            $("#chatmessagebox").height($win.height()-90);
        });
        
        
        $("#messagebox").height($win.height()-100);
        $win.on('resize',function(){
            $("#messagebox").height($win.height()-100);
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

</style>