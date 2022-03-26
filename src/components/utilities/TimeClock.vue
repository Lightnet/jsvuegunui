<script>
import Gun from "gun/gun"
export default {
  data () {
    return {
      time:'00:00:00',
      timer:null,
    }
  },
  created(){
    this.updatetime();
    this.timer = setInterval(()=>{this.updatetime()},1000);
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  methods: {
    updatetime(){
      let time = new Date(Gun.state());
      //this.time = time.toLocaleString() +' '+ (time.getMilliseconds()/1000).toFixed(3).slice(1);
      this.time = time.toLocaleString();
      //console.log("update?");
    },
  }
}
</script>
<template>
  <strong> Time: {{time}} </strong>
</template>
<style>
</style>