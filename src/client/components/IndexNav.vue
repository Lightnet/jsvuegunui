<template>
    <div>
        <div class="GNavBar">
            <a href="#" class="LinkBar" @click="clickHome">Home</a>
            <a href="#" class="LinkBar" @click="clickGame">Game</a>
            <a href="#" class="LinkBar" @click="clickAccount">Account</a>
            <a href="#" class="LinkBar" @click="clickMessages">Messages</a>
            <!--<a href="#" class="LinkBar" @click="clickForum">Forum</a>-->
            <a href="#" class="LinkBar" @click="clickChat">Chat</a>
            <a href="#" class="LinkBar" @click="clickDocument">Documents</a>
            <a href="#" class="LinkBar" @click="clickToDoList">ToDoList</a>
            <a href="#" class="LinkBar" @click="clickLogout">Logout</a>
            <!-- <label class="LinkBar" >Logout</label> -->
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
    },
    methods: {
        clickHome(){
            this.$root.$emit('view','index');
        },
        clickGame(){
            this.$root.$emit('view','game');
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
.GNavBar{
    height:30px;
    /*background-color:lightblue;*/
    margin: 0px;
    /*margin-top: 20px*/
}
.LinkBar{
    font-size: 16px;
    margin: 10px;
    margin-top: 30px
}
</style>