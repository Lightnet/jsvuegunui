<template>
    <div>
        Alias Search
        <table>
        <tr>
            <td>Public Key</td>
            <td><input v-model="alias"></td>
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
//import AccountInfo from './AccountInfo.vue';
//import IndexNav from './IndexNav.vue';
export default {
    components: {
    },
    data() {
        return {
            username: 'Guest',
            pubid:'',
            alias:'',
            born:'',
            education:'',
            skills:'',
        }
    },
    created(){
        var user = this.$gun.user();
        console.log(user);
        this.username = user.is.alias;
        this.pubid = user.is.pub;

    },
    methods: {
        
    }
}
</script>