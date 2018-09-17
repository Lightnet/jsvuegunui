<template>
    <div>
        <strong v-if="bregister">
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
        </strong>
        <strong v-else>
            {{msg}} <button @click="clickCancel">Home</button>
        </strong>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Register!',
            username:'guest',
            passphrase:'guest',
            bregister:true,
        }
    },
    methods: {
        clickSubmit(){
            console.log("login...");
            //console.log(this.username);
            //console.log(this.$gun);
            var user = this.$gun.user();
            var self = this;

            user.create(this.username, this.passphrase, function(ack){
                //console.log(ack);
                if(ack.err){
                    //console.log("fail!");
                    self.msg = "Register Alias Fail!";
                }
                if(ack.pub){
                    //console.log("created!", ack.pub);
                    self.msg = "Alias Created!";
                    self.bregister = false;
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