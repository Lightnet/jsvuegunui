<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>

        
        <BottomBar />
        <!--
        <AliasContacts></AliasContacts>
        <AlphaTest></AlphaTest>
        <accountpassphrasehint></accountpassphrasehint>
        <accountchangepassphrase></accountchangepassphrase>
        <accountprofile></accountprofile>
        <accountsearch></accountsearch>
        -->
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';
import BottomBar from './BottomBar';

//import AccountChangePassPhrase from './gaccount/AccountChangePassPhrase.vue';
//import AccountPassPhraseHint from './gaccount/AccountPassPhraseHint.vue';
//import AccountProfile from './gaccount/AccountProfile.vue';
//import AccountSearch from './gaccount/AccountSearch.vue';

//import AliasContacts from './gaccount/AliasContacts.vue';
import AlphaTest from './AlphaTest.vue';

export default {
    components: {
        'indexnav':IndexNav,
        'accountinfo':AccountInfo,
        //'accountprofile':AccountProfile,
        //'accountsearch':AccountSearch,

        //'accountchangepassphrase':AccountChangePassPhrase,
        //'accountpassphrasehint':AccountPassPhraseHint,
        //AliasContacts,
        BottomBar,
        AlphaTest,

    },
    data() {
        return {
            //username: 'Guest',
            //pubid:''
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