<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>
        <div>
            Chat
            <ChatRoom></ChatRoom>
        </div>
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';

import ChatRoom from './gchat/ChatRoom.vue';
export default {
    components: {
        'indexnav':IndexNav,
        'accountinfo':AccountInfo,
        ChatRoom
    },
    data() {
        return {
            username: 'Guest',
            pubid:''
        }
    },
    created(){
        var user = this.$gun.user();
        console.log(user);
        this.username = user.is.alias;
        this.pubid = user.is.pub;

    },
    methods: {
        
    }
}
</script>