<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>
        <messagebox></messagebox>
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';
import GMessageBox from './gmessages/GMessageBox.vue';

export default {
    components: {
        'indexnav':IndexNav,
        'accountinfo':AccountInfo,
        'messagebox':GMessageBox,
    },
    data() {
        return {
            //username: 'Guest',
            //pubid:''
        }
    },
    created(){
        //var user = this.$gun.user();
        //console.log(user);
        //this.username = user.is.alias;
        //this.pubid = user.is.pub;
    },
    methods: {
        
    }
}
</script>