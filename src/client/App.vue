<template>
    <div>
        <div class="container">
			<component :is="currentView" ></component>
		</div>

        <div id="dialog_message" title="Message">
            <p>{{dialogmessage}}</p>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

import Index from './components/Index.vue';
import Access from './components/Access.vue';
import Register from './components/Register.vue';
import Forgot from './components/Forgot.vue';

import Account from './components/Account.vue';
import Messages from './components/GMessages.vue';
import Forum from './components/GForum.vue';
import Chat from './components/GChat.vue';
import Documents from './components/GDocuments.vue';
import ToDoList from './components/GToDoList.vue';

import bus from './bus';

export default {
    components: {
        'index':Index,
        'access':Access,
        'register':Register,
        'forgot':Forgot,

        'account':Account,
        'messages':Messages,
        'forum':Forum,
        'chat':Chat,
        'documents':Documents,
        'todolist':ToDoList,
    },
    data () {
        return {
            currentView: 'access',
            username:'Guest',
            guntime:'',
            dialogmessage:'Hello',
        }
    },
    created(){
        this.$on('view', this.view);
        this.$root.$on('dialogmessage', this.dialogmessage_event);
        //bus.$on('view', this.view);
    },
    mounted(){
        $("#dialog_message").dialog();
        $("#dialog_message").dialog('close');
    },
    methods: {
        dialogmessage_event(event){
            this.dialogmessage = event;
            $("#dialog_message").dialog('open');
        },
		view(event){
            //console.log("view event", event);
            if(event == 'index'){
				this.currentView = 'index';
            }
            if(event == 'access'){
				this.currentView = 'access';
            }
            if(event == 'register'){
				this.currentView = 'register';
            }
            if(event == 'forgot'){
				this.currentView = 'forgot';
            }

            if(event == 'account'){
				this.currentView = 'account';
            }
            if(event == 'chat'){
				this.currentView = 'chat';
            }
            if(event == 'messages'){
				this.currentView = 'messages';
            }
            if(event == 'documents'){
				this.currentView = 'documents';
            }
            if(event == 'forum'){
				this.currentView = 'forum';
            }
            if(event == 'todolist'){
				this.currentView = 'todolist';
            }
        }
    }
}
</script>

<style>
body {
    font:16px 'Courier New';
    color: #222;
}

button {
    font:14px 'Courier New';
}


</style>