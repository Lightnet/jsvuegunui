<template>
    <div>
        Alias Public Key Search
        <table>
        <tr>
            <td>Public Key</td>
            <!--
                <input :value="value" @input="lookupalias">
            -->
            <td><input v-model="pubid" @input="lookupalias"></td>
        </tr>
        <tr>
            <td>Identity</td>
            <td><input v-model="identity" disabled></td>
        </tr>
        <tr>
            <td>Alias</td>
            <td><input v-model="alias"></td>
        </tr>
        <tr>
            <td>Born</td>
            <td><input v-model="born"></td>
        </tr>
        <tr>
            <td>Education</td>
            <td><input v-model="education"></td>
        </tr>
        <tr>
            <td>Skills</td>
            <td><input v-model="skills"></td>
        </tr>
        </table>
    </div>
</template>
<script>

export default {
    props: {
    	value: {
      		type: String,
      		default: '',
    	}
    },
    watch: {
        value:function(newvalue,oldvalue){
            //console.log(this.value);
            console.log("value???");
            this.lookupalias();
        }
    },
    components: {
    },
    data() {
        return {
            pubid:'',
            identity:'',
            alias:'',
            born:'',
            education:'',
            skills:'',
        }
    },
    created(){
        //this.$on('searchalias',this.lookupalias);
    },
    methods: {
        async lookupalias(event){
            console.log("looking...");


            let to = this.$gun.user(this.pubid);

            let who = await to.get('alias').then();
            if (!who){
                this.alias = '';
                this.identity = '';
                this.born = '';
                this.education = '';
                this.skills = '';
                return;
            }
            this.alias = who;

            let identity = await to.get('alias').then();
            this.identity = identity;

            let alias = await to.get('profile').get('alias').then();
            this.alias = alias;

            let born = await to.get('profile').get('born').then();
            this.born = born;

            let education = await to.get('profile').get('education').then();
            this.education = education;

            let skills = await to.get('profile').get('skills').then();
            this.skills = skills;
        }
    }
}
</script>