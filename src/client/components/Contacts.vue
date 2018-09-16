<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>
        <div>
            Contacts
        </div>
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';
export default {
    components: {
        'indexnav':IndexNav,
        'accountinfo':AccountInfo,
    },
    data() {
        return {
            username: 'Guest',
            pubid:''
        }
    },
    created(){
        var user = this.$gun.user();
        //console.log(user);
        if (user.is == null)
            return;
        this.username = user.is.alias;
        this.pubid = user.is.pub;

    },
    methods: {
        
    }
}
</script>