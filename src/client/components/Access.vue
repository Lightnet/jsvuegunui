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
                        <button @click="clickRegister">Register</button>
                    </td><td style=" text-align: center;">
                        <button @click="clickLogin">Login</button>
                        <button @click="clickForgot">Forgot</button>
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
            msg: 'Login!',
            username:'guest',
            passphrase:'guest',
        }
    },
    methods: {
        clickLogin(){
            //console.log("login...");
            //console.log(this.username);
            //console.log(this.$gun);
            var user = this.$gun.user();
            var self = this;

            user.auth(this.username, this.passphrase,(ack)=>{
                //console.log(ack);
                if(ack.err){
                    console.log("fail!");
                    //self.$toast.open({
                        //message: 'Auth attempt failed!',
                        //type: 'is-danger'
                    //});
                }else{
                    console.log("Authorized!");
                    self.$parent.$emit('view','index');
                    //self.$toast.open({
                        //message: 'Authorized!',
                        //type: 'is-success'
                    //});
                    //bus.$emit('login');
                    //bus.$emit('action','hidelogin');
                }
            });
        },
        clickRegister(){
            this.$parent.$emit('view','register');
            console.log("register");
        },
        clickForgot(){
            this.$parent.$emit('view','forgot');
        }
    }
}
</script>

<style>
.example {
  color: red;
}
</style>