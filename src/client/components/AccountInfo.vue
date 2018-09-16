<template>
    <div>
        <Label>Alias:{{ username }}</Label><button @click="copykey">Copy Public Key</button><input id="currentowneraliaspulbickey" v-model="pubid" size="90" readonly>
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
        copykey(){
            let CodeToCopy = document.querySelector('#currentowneraliaspulbickey');
            CodeToCopy.select();
            document.execCommand('copy');
        }
    }
}
</script>