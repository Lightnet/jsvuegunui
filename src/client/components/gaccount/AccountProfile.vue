<template>
    <div>
        Profile: (Press Enter to update profile.)
        <table>
        <tr>
            <td>Alias</td>
            <td><input v-on:keyup.13="inputalias" v-model="alias"><button @click="grant('alias')">+</button></td>
        </tr>
        <tr>
            <td>Born</td>
            <td><input v-on:keyup.13="inputborn" v-model="born"><button @click="grant('born')">+</button></td>
        </tr>
        <tr>
            <td>Education</td>
            <td><input v-on:keyup.13="inputeducation" v-model="education"><button @click="grant('education')">+</button></td>
        </tr>
        <tr>
            <td>Skills</td>
            <td><input v-on:keyup.13="inputskills" v-model="skills"><button @click="grant('skills')">+</button></td>
        </tr>
        </table>
        
    </div>
</template>
<script>
import $ from 'jquery';

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
        this.alias = await this.getprofilevar('alias', this.alias);

        this.born = await user.get('profile').get('born').then();
        this.born = await this.getprofilevar('born', this.born);

        this.education = await user.get('profile').get('education').then();
        this.education = await this.getprofilevar('education', this.education);

        this.skills = await user.get('profile').get('skills').then();
        this.skills = await this.getprofilevar('skills', this.skills);
    },
    methods: {
        async getprofilevar(_name,_value){
			let user = this.$gun.user();

            let pkey = await user.get('trust').get(user.pair().pub).get(_name+'profile').then();
            console.log(pkey)
			var mix = await Gun.SEA.secret(await user.get('epub').then(), user.pair());
			let epub = await user.get('epub').then();
			pkey = await Gun.SEA.decrypt(pkey, mix);
			//console.log(pkey)
			let val = await Gun.SEA.decrypt(_value, pkey);
			//console.log(val)
			return val || _value;
		},
        async inputalias(event){
            let user = this.$gun.user();
            //user.get('profile').get('alias').secret(this.alias,ack=>{
				//console.log(ack);
            //});
            //user.get('profile').get('alias').put(this.alias);
            user.get('profile').get('alias').secret(this.alias);
            console.log("alias");
        },
        async inputborn(event){
            let user = this.$gun.user();
            //user.get('profile').get('born').secret(this.born,ack=>{
				//console.log(ack);
            //});
            user.get('profile').get('born').secret(this.born);
            console.log("born");
        },
        async inputeducation(event){
            let user = this.$gun.user();
            //user.get('profile').get('education').secret(this.education,ack=>{
				//console.log(ack);
            //});
            user.get('profile').get('education').secret(this.education);
            console.log("education");
        },
        async inputskills(event){
            //console.log("enter",event.target.value);
            let user = this.$gun.user();
            //user.get('profile').get('skills').secret(this.skills,ack=>{
				//console.log(ack);
            //});
            user.get('profile').get('skills').secret(this.skills);
            console.log("skills");
        },
        grant(param){
            console.log(param);
            //$("#DialogGrant").data('param_1',param);
            //$("#DialogGrant").dialog('open');
            //$("#DialogGrant").data('param_1',param).dialog('open');
            //$("#DialogGrantAlias")['param_1']=param;
            document.getElementById("keyparam").value = param;
            $("#DialogGrant").dialog('open');
            
        }
    }
}
</script>