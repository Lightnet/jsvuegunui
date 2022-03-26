<script>
/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default {
	props: {
		todo: {
			type: Object,
			required: true
		}
	},
	computed: {
		inputListeners: function () {
			var vm = this;
			// `Object.assign` merges objects together to form a new object
			return Object.assign({},
				// We add all the listeners from the parent
				this.$listeners,
				// Then we can add custom listeners or override the
				// behavior of some listeners.
				{
					// This ensures that the component works with v-model
					input: function (event) {
						//console.log(event);
						//vm.$emit('input', event.target.value);//doesn't work with http://element.eleme.io
						vm.$emit('input', event);
					}
				}
			)
		}
	}
}
</script>
<template>
	<li>
		<div class="box-card">
			<span v-if="!todo.bedit">{{ todo.text }}</span>
			<input v-if="todo.bedit" v-model="todo.text" :id="todo.id" v-on="inputListeners">
			<!--<span style="float: right; padding: 3px 0"> -->
			<button @click="$emit('edit', todo.id)">Edit</button>
			<button @click="$emit('remove', todo.id)">Remove</button>
			<!--</span>-->
		</div>
	</li>
</template>