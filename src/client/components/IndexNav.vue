<template>
    <div>
        <div>
            <a href="#" @click="clickHome">Home</a>
            <a href="#" @click="clickAccount">Account</a>
            <a href="#" @click="clickMessages">Messages</a>
            <a href="#" @click="clickForum">Forum</a>
            <a href="#" @click="clickChat">Chat</a>
            <a href="#" @click="clickDocument">Document</a>
            <a href="#" @click="clickToDoList">ToDoList</a>
            <a href="#" @click="clickLogout">Logout</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: 'Guest',
            pubid:''
        }
    },
    created(){
        var user = this.$gun.user();
        //console.log(user);
        if(user.is == null)
            return;
        this.username = user.is.alias;
        this.pubid = user.is.pub;
    },
    methods: {
        clickHome(){
            this.$root.$emit('view','index');
        },
        clickAccount(){
            this.$root.$emit('view','account');
        },
        clickMessages(){
            this.$root.$emit('view','messages');
        },
        clickForum(){
            this.$root.$emit('view','forum');
        },
        clickChat(){
            this.$root.$emit('view','chat');
        },
        clickDocument(){
            this.$root.$emit('view','documents');
        },
        clickToDoList(){
            this.$root.$emit('view','todolist');
        },
        clickLogout(){
            var user = this.$gun.user();
            //console.log(user);
            user.leave();
            //this.$root.$emit('view','access');
            location.reload();
        },
    }
}
</script>

<style>
.example {
  color: red;
}
</style>