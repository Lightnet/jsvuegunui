<template>
  <div>
    <div>
      Forum
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      username: 'Guest',
      pubid:''
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