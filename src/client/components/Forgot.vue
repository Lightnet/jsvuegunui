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
                    <td><input v-model="password"></td>
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
            msg: 'Forgot!',
            username:'guest',
            password:'guest',
        }
    },
    methods: {
        clickSubmit(){
            console.log("login...");
            console.log(this.username);
            console.log(this.$gun);
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