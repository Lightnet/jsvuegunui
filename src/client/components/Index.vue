<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>
        

        <accountpassphrasehint></accountpassphrasehint>

        <!--
        <accountchangepassphrase></accountchangepassphrase>
        <accountprofile></accountprofile>
        <accountsearch></accountsearch>
        -->
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';

import AccountChangePassPhrase from './AccountChangePassPhrase.vue';
import AccountPassPhraseHint from './AccountPassPhraseHint.vue';

import AccountProfile from './AccountProfile.vue';
import AccountSearch from './AccountSearch.vue';


export default {
    components: {
        'indexnav':IndexNav,
        'accountinfo':AccountInfo,
        'accountprofile':AccountProfile,
        'accountsearch':AccountSearch,

        'accountchangepassphrase':AccountChangePassPhrase,
        'accountpassphrasehint':AccountPassPhraseHint,
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
        if (user.is ==null){
            this.$root.$emit('dialogmessage',"Alias is Null");
            return
        }
        this.username = user.is.alias;
        this.pubid = user.is.pub;
    },
    methods: {
        searchuser(){
            
        },
    }
}
</script>

<style>
.example {
  color: red;
}
</style>