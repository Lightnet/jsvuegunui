<template>
    <div>
        Contacts:
        <select>
            <option>None</option>
        </select>
        <button @click="addcontact">Add</button>
        <input v-model="aliassearch" v-on:keyup="checkalias">
        <label>Status:{{statussearch}}</label>
        <!--
        <button @click="removecontact">Remove</button>
        -->
    </div>
</template>
<script>
export default {
    components: {
        
    },
    data() {
        return {
            aliassearch:'',
            statussearch:'Normal',
        }
    },
    created(){
        //var user = this.$gun.user();
        //console.log(user);
        //if (user.is == null)
            //return;
        //this.username = user.is.alias;
        //this.pubid = user.is.pub;
    },
    methods: {
        addcontact(){

        },
        removecontact(){

        },
        async checkalias(event){
            console.log("typing...");
            console.log(event.target.value);
            //let user = this.$gun.user();

            let to =this.$gun.user(event.target.value);
            let who = await to.get('alias').then();
            if(!who){
                this.statussearch = 'No Alias!';
                return;
            }else{
                this.statussearch = 'Found! ' + who;
            }
            
        }
    }
}
</script>