<template>
    <div>
        <button @click="clickTest">Test</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Login!',
            username:'guest',
            passphrase:'guest',
        }
    },
    methods: {
        async clickTest(){
            //console.log("login...");
            //console.log(this.username);
            //console.log(this.$gun);
            var gun = this.$gun;
            var user = this.$gun.user();
            var self = this;
            console.log(user);

            let alias = await gun.get('alias/'+'test').then();//broken or remove?
            console.log(alias);
        }
    }
}
</script>