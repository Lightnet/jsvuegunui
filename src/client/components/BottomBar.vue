<template>
    <div id="BottomBar">
        <GTimeClock />
    </div>
</template>

<script>
import GTimeClock from './GTimeClock'

export default {
    components: {
        GTimeClock
    },
    data(){
        return {
        }
    }
}
</script>

<style>

#BottomBar{
    position: fixed;
    /*
    border-style:solid;
    border-radius: 1px;
    */
    padding: 0px 0px;

    height:20px;
    width: 100%;
    bottom: 0;
}
</style>