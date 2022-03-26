<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { ref } from "vue"
import GraphNode from "./GraphNode.vue";

export default {
  props: ['graph',],
  setup(props,context){
    console.log(props.graph)
    let _graph = props.graph
    let graphs=[]
    const graphsRef = ref([]);
    if(_graph){
      _graph.map().once((data,key)=>{
        //console.log("data>>>>>>")
        //console.log(data)
        //console.log(typeof data)
        //console.log(key)
        if(key !== '_'){
          graphs=[...graphs,{key:key, data:data, isShow:false, isList:false}]
          graphsRef.value=graphs
        }else{
          console.log(key);
        }
      })
    }
    const graph = props.graph;
    return{
      test:'text'
      , graphs
      , graphsRef
      , graph
    }
  },
  methods:{
    checkDataType(dataType){
      //console.log(typeof dataType)
      return typeof dataType;
    },
  }
}
</script>
<template>
  <template v-for="item in graphsRef" :key="item.key">
    <div>
      <label> Key [{{checkDataType(item.data)}}]: {{item.key}} </label> 
      <button @click="item.isShow = !item.isShow"> {{item.isShow ? "value -" : "value +"}} </button>
      <template v-if="checkDataType(item.data)==='object'">
        <button @click="item.isList = !item.isList"> {{item.isList ? "List -" : "List +"}} </button>
        <template v-if="item.isList">
          <graph-node :graph="graph.get(item.key)"/>
        </template>
      </template>
      <br/>
      <template v-if="item.isShow">
        <label> Value: </label>
        <template v-if="(typeof item.data === 'string')">  
          <input v-model="item.data" />
        </template>
        <template v-else-if="(typeof item.data === 'number')">  
          <input v-model="item.data" />
        </template>
        <template v-else-if="(typeof item.data === 'object')">  
          <textarea > {{item.data}}</textarea>
        </template>
        <template v-else>  
          <textarea> {{item.data}}</textarea>
        </template>
      </template>
    </div>
  </template>
</template>