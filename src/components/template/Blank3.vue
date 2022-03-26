<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/
import { h } from "vue"
export default {
  props: {
    level:Number
  },
  setup(props,context){
    console.log('here')

    return ()=>
      h(
        'h'+props.level,
        {},//props and attributes: optional
        context.slot.default() //render our default slot
      )
  }
}
</script>