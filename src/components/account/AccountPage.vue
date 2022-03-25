<script setup>

//import AccountInfo from './AccountInfo.vue';
//import AccountProfile from './AccountProfile.vue';
import { ref, shallowRef } from 'vue';
import AccountIndex from './AccountIndex.vue';
import AccountChangePassphrase from './AccountChangePassPhrase.vue';
import AccountPassPhraseHint from './AccountPassPhraseHint.vue';

import AccountSearch from './AccountSearch.vue';

let viewComponent = shallowRef();

const accountMenus=[
  {name:"Profile", component:AccountIndex },
  {name:"Change Passphrase", component:AccountChangePassphrase },
  {name:"Hint", component:AccountPassPhraseHint },
  {name:"Search", component:AccountSearch },
]

function setView(name){
  let item = accountMenus.find(item=>item.name == name)
  if(item){
    viewComponent.value=item.component;
  }else{
    viewComponent.value=null;
  }
}
setView("Profile")
</script>
<template>
  <div>
    <template v-for="item in accountMenus" :key="item.name">
      <button @click="setView(item.name)"> {{item.name}} </button>
    </template>
  </div>
  <div>
    <component :is="viewComponent" />
  </div>
</template>