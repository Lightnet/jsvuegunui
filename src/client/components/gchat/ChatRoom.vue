<template>
    <div>
        <div>Room</div>

        <div>
            <!--
                <div v-for="item in messages" :key="item">
            -->
            <div v-for="item in messages" :key="item.id">
                {{ item.alias }} | > | {{ item.message }}
            </div>

        </div>
        <div>
            <input v-model="message"><button @click="sendmessage">Send</button>
        </div>
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