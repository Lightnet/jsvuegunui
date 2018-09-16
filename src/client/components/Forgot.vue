<template>
    <div>
        <div class="example">{{ msg }}</div>
        
        <div>
            <table>
                <tr>
                    <td>User:</td>
                    <td><input v-model="alias"></td>
                </tr><tr>
                    <td>Question 1:</td>
                    <td><input v-model="question1"></td>
                </tr><tr>
                    <td>Question 2:</td>
                    <td><input v-model="question2"></td>
                </tr><tr>
                    <td>Hint:</td>
                    <td><input v-model="hint"></td>
                </tr><tr>
                    <td>
                    </td><td style=" text-align: center;">
                        <button @click="clickSubmit2">Submit</button>
                        <button @click="clickCancel">Cancel</button>
                    </td>
                </tr>
            </table>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Forgot!',
            alias:'guest',
            question1:'test',
            question2:'test',
            hint:'',
        }
    },
    methods: {
        async clickSubmit2(){
            //let alias = (this.alias || '').trim(); //get alias input
            let gun = this.$gun;
            //let who = await gun.get('ze-BvHhrnMK7pWT_wQWIn9xv8dNv_jPv8kGLeatdMRQ.e0woKEJBUeYxbWQda8gkMTvKWsMVI_UaJ_Azgwyxxek').then() || {};//get alias data
            //console.log(who)
            //console.log(alias)
            let alias = await gun.get('alias/'+this.alias).then();//broken or remove?
            console.log(alias);
            //let who = await gun.get('alias').then() || {};//get alias data
            //let who = await gun.get('pub').then() || {};//get alias data
            //console.log(who);
            //var to = gun.user('ze-BvHhrnMK7pWT_wQWIn9xv8dNv_jPv8kGLeatdMRQ.e0woKEJBUeYxbWQda8gkMTvKWsMVI_UaJ_Azgwyxxek');
            //var who = await to.get('alias').then();
            //console.log(who);

        },
        async clickSubmit(){
            console.log("login...");
            console.log(this.alias);
            console.log(this.$gun);
            let gun = this.$gun;
            
            let alias = (this.alias || '').trim(); //get alias input
            let q1 =  (this.question1 || '').trim(); //get q1 input
            let q2 = (this.question2 || '').trim(); //get q2 input
            //console.log('get forgot hint');
            if(!alias){
                console.log('Empty!');
                return;
            }
            if((!q1)||(!q2)){
                console.log('Q Empty!');
                return;
            }
                
            console.log(alias);
            let who = await gun.get('alias/'+alias).then() || {};//get alias data
            console.log(who);
            if(!who._){
                //console.log(who);
                console.log('Not Alias!');
                return;
            }
            let hint = await gun.get('alias/'+alias).map().get('hint').then();//get hash hint string
            let dec = await Gun.SEA.work(q1,q2);//get q1 and q2 string to key hash
            hint = await Gun.SEA.decrypt(hint,dec);//get hint and key decrypt message
            if(hint){//check if hint is string or null
                //$('#hint').val(hint);//get hint and set input value
                this.hint = hint;
            }else{
                //$('#hint').val('Fail Decrypt!');//if null set input to message user.
                this.hint = 'Fail Decrypt!';
            }
            console.log("end checked...");


        },
        clickCancel(){
            this.$parent.$emit('view','access');
        }
    }
}
</script>

<style>
.example {
  color: red;
}
</style>