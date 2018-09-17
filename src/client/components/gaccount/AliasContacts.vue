<template>
    <div>
        Contacts:
        <select v-model="selectitem" @change="selectcontact">
            <option>None</option>
            <option v-for="item in contacts" :key="item.id" v-bind:value="item.pub"> {{item.alias}}</option>
        </select>
        <button @click="addcontact">Add</button>
        <input v-model="aliassearch" v-on:keyup="checkalias">
        <button @click="removecontact">Remove</button>
        <label>Status:{{statussearch}}</label>
    </div>
</template>
<script>
export default {
    components: {
        
    },
    data() {
        return {
            aliassearch:'',
            statussearch:'Normal',
            bfound:'',
            alias:'',
            publickey:'',
            contacts:[],
            selectitem:'',
        }
    },
    created(){
        this.UpdateContactList();
    },
    methods: {
        UpdateContactList(){
            let self = this;
            let user = this.$gun.user();
            self.contacts = [];

            user.get('contact').once().map().once((data,id)=>{
                //console.log(data);
                if(!data.alias)//check for name to exist
                    return;
                //var option = $('#' + id).get(0) || $('<option>').attr('id', id).appendTo('#contacts');//check if option id exist else create.
                if(data){
                    if(data == 'null'){
                        //$(option).hide();//hide element
                        return;
                    }
                    //console.log('data',data);
                    self.contacts.push({id:id,alias:data.alias,pub:data.pub});
                }
            });
        },
        selectcontact(event){
            //console.log("event");
            //console.log(event.target);
            //console.log(this.selectitem);
            this.aliassearch = this.selectitem;
            this.checkalias();
        },
        async addcontact(){
            if (this.bfound == false)
                return;
            let user = this.$gun.user();
            user.get('contact').get(this.alias).put({alias:this.alias,pub:this.publickey});
            this.publickey = '';
            //console.log("Add Contact");
            this.UpdateContactList();
        },
        removecontact(){
            if (this.bfound == false)
                return;
            let user = this.$gun.user();
            user.get('contact').get(this.alias).put('null');//null contact list match id
            this.UpdateContactList();
        },
        async checkalias(event){
            //console.log("typing...");
            //console.log(event.target.value);
            let publickey = null;
            if (event == null){
                publickey = this.publickey;
            }else{
                publickey = event.target.value;
            }
            let to = this.$gun.user(publickey);
            let who = await to.get('alias').then();
            if(!who){
                this.statussearch = 'No Alias!';
                this.bfound = false;
                return;
            }else{
                this.statussearch = 'Found! ' + who;
                this.bfound = true;
                this.publickey = publickey;
                this.alias = who;
                this.$emit('publickey',this.publickey);
            }
        }
    }
}
</script>