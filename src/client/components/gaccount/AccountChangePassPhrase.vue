<template>
    <div>
        Change Passphrase:
        <table>
        <tr>
            <td>Passphrase</td>
            <td><input v-model="oldpassphrase"></td>
        </tr>
        <tr>
            <td>New Passphrase</td>
            <td><input v-model="newpassphrase"></td>
        </tr>
        <tr>
            <td></td>
            <td><button @click="changepassphrase">Change</button></td>
        </tr>
        </table>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            oldpassphrase:'',
            newpassphrase:'',
            message:'Hello World',
            dialog:null,
        }
    },
    created(){
        var user = this.$gun.user();
        //console.log(user);
        //this.username = user.is.alias;
        //this.pubid = user.is.pub;
    },
    //beforeMount(){},
    //mounted(){},
    //beforeDestroy(){
        //console.log("beforeDestroy");
    //},
    //destroy(){
        //console.log("destory");
    //},
    methods: {
        changepassphrase(){
            let user = this.$gun.user();
            //$("#dialog").dialog('open');
            console.log(user)
            if (user.is ==null){
                this.$root.$emit('dialogmessage',"Alias is Null");
                return
            }
            let self = this;
            
            user.auth(user.is.alias, this.oldpassphrase, (ack) => {//user auth call
			    //console.log(ack);
			    let status = ack.err || "Saved!";//check if there error else saved message.
			    //displayeffectmessage(status);//dsiplay message effect
                console.log(status);
                //this.message = status;
                //$("#dialog").dialog('open');
                self.$root.$emit('dialogmessage',status);
                
		    }, {change: this.newpassphrase});//set config to change password
            
        }
    }
}
</script>
