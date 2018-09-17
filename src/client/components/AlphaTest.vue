<template>
    <div>
        <button @click="clickTest">Test</button>
        <input v-model="aliaspublickey">
    </div>
</template>

<script>
export default {
    watch:{
        aliaspublickey:async function(val){
            let gun = this.$gun;
            let alias = await gun.get('~@'+val).then(); //broken or remove?
            console.log(alias);
        }
    },
    data() {
        return {
            aliaspublickey:''
        }
    },
    methods: {
        async clickTest(){
            var gun = this.$gun;
            var user = this.$gun.user();
            var self = this;
            console.log(user);
            //let alias = await gun.get('alias/'+'test').then();//broken or remove?
            let alias = await gun.get('~@'+'test').then();//broken or remove?
            console.log(alias);
        }
    }
}
</script>