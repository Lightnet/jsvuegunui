







https://www.youtube.com/watch?v=zbXREIYNZHE
How to Lazy Load Vue Components in Vue 3
```vue
<script>
import { defineAsyncComponent, ref } from "vue"
const show=ref(false)
const LoginPopup = defineAsyncComponent({
  loader:()=>import("./component/LoginPopup.vue"),
})
</script>
<template>
  <login-popup v-if="show">
  <button @click="show =true">Show Pop Up</button>
</template>
```