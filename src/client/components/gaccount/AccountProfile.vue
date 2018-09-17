<template>
    <div>
        Profile: (Press Enter to update profile.)
        <table>
        <tr>
            <td>Alias</td>
            <td><input v-on:keyup.13="inputalias" v-model="alias"></td>
        </tr>
        <tr>
            <td>Born</td>
            <td><input v-on:keyup.13="inputborn" v-model="born"></td>
        </tr>
        <tr>
            <td>Education</td>
            <td><input v-on:keyup.13="inputeducation" v-model="education"></td>
        </tr>
        <tr>
            <td>Skills</td>
            <td><input v-on:keyup.13="inputskills" v-model="skills"></td>
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
            alias:'',
            born:'',
            education:'',
            skills:'',
        }
    },
    async created(){
        var user = this.$gun.user();
        //console.log(user);
        this.alias = await user.get('profile').get('alias').then();
        this.born = await user.get('profile').get('born').then();
        this.education = await user.get('profile').get('education').then();
        this.skills = await user.get('profile').get('skills').then();

        //console.log('data',data);
        //let pkey = await user.get('trust').get(user.pair().pub).get('skills'+'profile').then();
        //console.log('pkey',pkey);
        //var mix = await Gun.SEA.secret(await user.get('epub').then(), user.pair());
        //pkey = await Gun.SEA.decrypt(pkey, mix);
        //let val = await Gun.SEA.decrypt(data, pkey);
        //console.log(val);
    },
    methods: {
        async inputalias(event){
            let user = this.$gun.user();
            //user.get('profile').get('alias').secret(this.alias,ack=>{
				//console.log(ack);
            //});
            user.get('profile').get('alias').put(this.alias);
            console.log("alias");
        },
        async inputborn(event){
            let user = this.$gun.user();
            //user.get('profile').get('born').secret(this.born,ack=>{
				//console.log(ack);
            //});
            user.get('profile').get('born').put(this.born);
            console.log("born");
        },
        async inputeducation(event){
            let user = this.$gun.user();
            //user.get('profile').get('education').secret(this.education,ack=>{
				//console.log(ack);
            //});
            user.get('profile').get('education').put(this.education);
            console.log("education");
        },
        async inputskills(event){
            //console.log("enter",event.target.value);
            let user = this.$gun.user();
            //user.get('profile').get('skills').secret(this.skills,ack=>{
				//console.log(ack);
            //});
            user.get('profile').get('skills').put(this.skills);
            console.log("skills");
        }
    }
}
</script>