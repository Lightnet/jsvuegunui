<template>
    <div>
        <div class="example">{{ msg }}</div>
        <div>
            <table>
                <tr>
                    <td>User:</td>
                    <td><input v-model="username"></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input v-model="passphrase"></td>
                </tr><tr>
                    <td>
                    </td><td style=" text-align: center;">
                        <button @click="clickSubmit">Submit</button>
                        <button @click="clickCancel">Cancel</button>
                    </td>
                </tr>
            </table>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Register!',
            username:'guest',
            passphrase:'guest',
        }
    },
    methods: {
        clickSubmit(){
            console.log("login...");
            console.log(this.username);
            console.log(this.$gun);
            var user = this.$gun.user();

            user.create(this.username, this.passphrase, function(ack){
                //console.log(ack);
                if(ack.err){
                    console.log("fail!");
                    //self.$toast.open({
                        //message:ack.err ,
                        //type: 'is-danger'
                    //});
                }
                if(ack.pub){
                    console.log("created!", ack.pub);
                    //self.$toast.open({
                        //message: 'Alias Created: ' + params.username +'!',
                        //type: 'is-success'
                    //});
                }
            });
        },
        clickCancel(){
            this.$parent.$emit('view','access');
        }
    }
}
</script>

<style>
.example {
  color: red;
}
</style>