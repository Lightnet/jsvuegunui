<template>
    <div>
        <div class="">Public ID: {{ pubid }}</div>
        <div class="">User: {{ username }}</div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            username: 'Guest',
            pubid:''
        }
    },
    created(){
        var user = this.$gun.user();
        //console.log(user);
        if (user.is == null)
            return;
        this.username = user.is.alias;
        this.pubid = user.is.pub;
    },
    methods: {

    }
}
</script>