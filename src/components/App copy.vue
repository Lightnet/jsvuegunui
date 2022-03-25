<script>
//{
//import $ from 'jquery';
//import Index from './Index.vue';
//import Access from './Access.vue';
//import Register from './Register.vue';
//import Forgot from './Forgot.vue';
//import Account from './Account.vue';
//import Messages from './GMessages.vue';
//import Forum from './GForum.vue';
//import Chat from './GChat.vue';
//import Documents from './GDocuments.vue';
//import ToDoList from './GToDoList.vue';
//import bus from './bus';
//}
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
            //username:'Guest',
            guntime:'',
            dialogmessage:'Hello',
            publickey:'',
            granttype:'',
        }
    },
    created(){
        this.$on('view', this.view);
        this.$root.$on('dialogmessage', this.dialogmessage_event);
        //bus.$on('view', this.view);
    },
    mounted(){
        var self = this;
        $("#dialog_message").dialog();
        $("#dialog_message").dialog('close');

        $("#DialogGrant").dialog({
            buttons: {
                "Ok": async function() {
                    
                    //let param = $("DialogGrant").data('param_1');
                    //let param = $("DialogGrant")['param_1'];
                    //let param = document.getElementById("keyparam").value;
                    //console.log(param);
                    let key = self.publickey = document.getElementById('inputpublickeygrant').value;
                    console.log(key);
                    let to = self.$gun.user(key);
                    let who = await to.get('alias').then();
                    if(!who){
                        console.log('No Alias!');
                    }else{
                        //AliasTag
                        document.getElementById('AliasTag').innerText = who;
                        //$("#DialogGrantAlias")['param_1']=param;
                        $("#DialogGrantAlias").dialog('open');
                    }
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                $( this ).dialog( "close" );
                }
            }
        });
        $("#DialogGrant").dialog('close');

        $("#DialogGrantAlias").dialog({
            buttons: {
                "Ok": async function() {
                    //user.get('profile').get('born')
                    //let to = self.$gun.user(key);
                    //let who = await to.get('alias').then();
                    let user = self.$gun.user();
                    //user.get('profile').get('born');
                    //let param = $("DialogGrantAlias").data('param_1');
                    //console.log(param);
                    let param = document.getElementById("keyparam").value;
                    let key = self.publickey = document.getElementById('inputpublickeygrant').value;
                    let to = self.$gun.user(key);
                    console.log(param);
                    user.get('profile').get(param).grant(to);
                    $(this).dialog("close");
                },
                Cancel: function() {
                $( this ).dialog( "close" );
                }
            }
        });
        $("#DialogGrantAlias").dialog('close');
        
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

<template>
    <div>
        <div class="container">
			<component :is="currentView" ></component>
		</div>

        <div id="dialog_message" title="Message">
            <p>{{dialogmessage}}</p>
        </div>

        <div id="DialogGrant" title="Alias Grant">
            <strong id="keyparam" value="none" />
            Alias Public Key:<input id="inputpublickeygrant" type="text">
        </div>

        <div id="DialogGrantAlias" title="Alias Permission">
            Alias <label id="AliasTag"> Name </label>
        </div>
    </div>
</template>

<style>
.parent{
    min-height:100%;
    width:400px;
    margin: 0;
	padding: 0;
    background:red;
}

html, body, #fullheight {
    min-height: 100% !important;
    height: 100%;
}

body {
    font:16px 'Courier New';
    color: #222;
}

button {
    font:14px 'Courier New';
}

select{
    font:14px 'Courier New';
}

input{
    font:14px 'Courier New';
}
</style>