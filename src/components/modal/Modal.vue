<script setup>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/65002098/how-to-define-type-for-refbinding-on-template-in-vue3-using-typescript
// https://vuejs.org/guide/typescript/composition-api.html#typing-component-props
// https://stackoverflow.com/questions/40365741/default-values-for-vue-component-props-how-to-check-if-a-user-did-not-set-the
// https://vuejs.org/guide/built-ins/teleport.html#basic-usage
// https://dev.to/mandrewcito/vue-js-draggable-div-3mee
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';
//import { getCurrentInstance } from 'vue';

//const app = getCurrentInstance()

const props = defineProps({
  isOpen:{ type: Boolean, default: false },
  width:{ type: String, default: "200px" },
  height:{ type: String, default: "300px" },
  isMobile:{ type: Boolean, default: false },
  x:{ type: Number, default: 0 },
  y:{ type: Number, default: 0 },
});

console.log("modal... props")
console.log(props)
const isOpen = ref(false)
const x = ref(props.x || 0)
const y = ref(props.y || 0)
console.log(typeof props.x)
const positions = reactive({clientX:x.value,clientY:y.value,movementX:0,movementY:0,})
watch(props,()=>{
  if(typeof props.isOpen === 'boolean'){
    isOpen.value =props.isOpen;
  }
  if(typeof props.x === 'number'){
    x.value =props.x;
    console.log(props.x)
    //positions.clientX=props.x
  }
  if(typeof props.y === 'number'){
    y.value =props.y;
    //positions.clientY=props.y
  }
})

const emits = defineEmits(['onClose','pos']);
const width = ref(props.width)
const height = ref(props.height)

const isMobile = ref(props.isMobile)
const modal = ref()
const modalDrag = ref()

function onClose(){
  //console.log(isOpen.value);
  emits('onClose')
  isOpen.value=false;
}

function dragMouseDown(event) {
  event.preventDefault()
  // get the mouse cursor position at startup:
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  document.onmousemove = elementDrag
  document.onmouseup = closeDragElement
}

function elementDrag(event) {
  event.preventDefault()
  positions.movementX = positions.clientX - event.clientX
  positions.movementY = positions.clientY - event.clientY
  positions.clientX = event.clientX
  positions.clientY = event.clientY
  // set the element's new position:
  modal.value.style.top = (modal.value.offsetTop - positions.movementY) + 'px'
  modal.value.style.left = (modal.value.offsetLeft - positions.movementX) + 'px'
}

function closeDragElement(){
  document.onmouseup = null
  document.onmousemove = null
  emits('pos',[(modal.value.offsetLeft - positions.movementX),(modal.value.offsetTop - positions.movementY)])
}

</script>
<template>
  <template v-if="isMobile">
    <Teleport to="body">
        <div v-if="isOpen" ref="modal" id="MODAL" v-bind:style="{position:'absolute',left:x+'px',top:y+'px',backgroundColor:'white',height:height,width:width,zIndex:5}" >
          <div ref="modalDrag" style="backgroundColor:darkgray;" @mousedown="dragMouseDown">
            <button @click="onClose"> Close</button>
          </div>
          <div>
            <slot></slot>
          </div>
        </div>
    </Teleport>
  </template>
  <template v-else>
    <div v-if="isOpen" ref="modal" id="MODAL" v-bind:style="{position:'absolute',left:x+'px',top:y+'px',backgroundColor:'white',height:height,width:width,zIndex:5}" >
      <div ref="modalDrag" style="backgroundColor:darkgray;" @mousedown="dragMouseDown">
        <button @click="onClose"> Close</button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </template>
</template>
<!--

-->