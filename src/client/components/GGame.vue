<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>
        <div class="example">
            {{ msg }}

        </div>
        <BottomBar></BottomBar>
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';
import BottomBar from './BottomBar';

export default {
    components: {
        'indexnav':IndexNav,
        'accountinfo':AccountInfo,
        BottomBar,
    },
    data () {
        return {
            msg: 'Hello world!'
        }
    },
    created(){


        
    },
    beforeDestroy(){
    },
    methods: {
    }
}
</script>

<style>
</style>