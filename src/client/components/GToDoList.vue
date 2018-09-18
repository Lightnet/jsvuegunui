<template>
    <div>
        <accountinfo></accountinfo>
        <indexnav></indexnav>
        <div>
            ToDoList
            <BaseInputText 
			v-model="newTodoText"
			placeholder="New todo"
			@keydown.enter.native="addTodo"
		/>
        
		<div id="todolistscroll" style="overflow:auto;">
			<ul v-if="todos.length">
				<TodoListItem
					v-for="todo in todos"
					:key="todo.id"
					:todo="todo"
					@keydown.enter.native="editchange"
					@edit="editTodo"
					@remove="removeTodo"
				/>
			</ul>
			<p v-else>
				Nothing left in the list. Add a new todo in the input above.
			</p>
		</div>
        </div>
    </div>
</template>

<script>
import AccountInfo from './AccountInfo.vue';
import IndexNav from './IndexNav.vue';

import BaseInputText from './todolist/BaseInputText.vue'
import TodoListItem from './todolist/TodoListItem.vue'

export default {
    components: {
        'indexnav':IndexNav,
        'accountinfo':AccountInfo,
        BaseInputText, 
        TodoListItem
    },
    data() {
        return {
            todolistinput:'',
            newTodoText: '',
		    todoid:'',
			todos: [],
			todolistidhandle:'todolistscroll',
        }
    },
    created(){
        var user = this.$gun.user();
        //console.log(user);
		let gun = this.$root.$gun;
		this.gun_todolist = user.get('todolist');
		let self = this;
		this.gun_todolist.map().once(function(data, id){
			if ((data == null)||(data == 'null'))
				return;
			self.todos.push({
				id: id,
				text: data.text,
				bedit: false,
			});
      	});
    },
    methods: {
        addTodo () {
			const trimmedText = this.newTodoText.trim();
			//console.log('trimmedText',trimmedText);
			if (trimmedText) {
				//this.todos.push({
					//id: nextTodoId++,
					//text: trimmedText
				//})
				this.gun_todolist.set({
					text:trimmedText,
					//bedit:false
				});
				this.newTodoText = ''
			}
		},
		editTodo(id){
			//console.log('edit',id);
			this.todos.filter(todo => {
				if(todo.id == id){
					todo.bedit = todo.bedit != true;
					//console.log(todo.bedit);
				}
			});
		},
		isEmpty(str) {
    		return (!str || 0 === str.length);
		},
		editchange(event){
			//console.log(event);
			//console.log(event.target.id);
			let id = event.target.id;
			let str_text = event.target.value;
			let user = this.$gun.user();

			//console.log(this.isEmpty(str_text));
			if(this.isEmpty(str_text)){
				//console.log('empty string...');
				this.$message('Empty!');
				return;
			}

			user.get('todolist').get(id).put({text:str_text},function(ack){
				//console.log(ack);
			});

			this.todos.filter(todo => {
				if(todo.id == id){
					todo.bedit = todo.bedit != true;
					//console.log(todo.bedit);
				}
			});
		},
		removeTodo (idToRemove) {
			//console.log("idToRemove:",idToRemove);
			//this.$root.$gun.get('thoughts').get(idToRemove).put(null);
			//this.gun_thoughts.get(idToRemove).put(null);
			//this.$root.user.get('thoughts').get(idToRemove).once(function(value){
				//console.log(value);
			//});
            //this.$root.user.get('thoughts').get(idToRemove).put(undefined);
            var user = this.$gun.user();
			user.get('todolist').get(idToRemove).put('null');
			this.todos = this.todos.filter(todo => {
				return todo.id !== idToRemove
			});
		}
    }
}
</script>