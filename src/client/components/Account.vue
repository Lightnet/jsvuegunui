<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>
        Account
        <accountpassphrasehint></accountpassphrasehint>
        <accountchangepassphrase></accountchangepassphrase>
        <accountprofile></accountprofile>
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';

import AccountChangePassPhrase from './gaccount/AccountChangePassPhrase.vue';
import AccountPassPhraseHint from './gaccount/AccountPassPhraseHint.vue';

import AccountProfile from './gaccount/AccountProfile.vue';
import AccountSearch from './gaccount/AccountSearch.vue';

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
        if (user.is == null)
            return;
        this.username = user.is.alias;
        this.pubid = user.is.pub;

    },
    methods: {
        
    }
}
</script>