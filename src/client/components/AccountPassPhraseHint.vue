<template>
    <div>
        <table>
        <tr>
            <td>Question 1</td>
            <td><input v-model="question1"></td>
        </tr>
        <tr>
            <td>Question 1</td>
            <td><input v-model="question2"></td>
        </tr>
        <tr>
            <td>Hint</td>
            <td><input v-model="hint"></td>
        </tr>
        <tr>
            <td></td>
            <td><button @click="clickchangehint">Sumbit</button></td>
        </tr>
        </table>
    </div>
</template>
<script>
//import AccountInfo from './AccountInfo.vue';
//import IndexNav from './IndexNav.vue';

export default {
    components: {
    },
    data() {
        return {
            username: 'Guest',
            pubid:'',
            question1:'',
            question2:'',
            hint:'',
        }
    },
    created(){
        var user = this.$gun.user();
        console.log(user);
        this.username = user.is.alias;
        this.pubid = user.is.pub;

    },
    methods: {
        async clickchangehint(){
            let user = this.$gun.user();
            let self = this;

            let q1 = this.question1; //get input q1
            let q2 = this.question2;//get input q2
            let hint = this.hint;;//get input hint
            let sec = await Gun.SEA.secret(user.pair().epub, user.pair());//get user for encrypt message
            let enc_q1 = await Gun.SEA.encrypt(q1, sec);//encrypt q1
            user.get('forgot').get('q1').put(enc_q1);//set hash q1 to user data store
            let enc_q2 = await Gun.SEA.encrypt(q2, sec);//encrypt q1
            user.get('forgot').get('q2').put(enc_q2); //set hash q2 to user data store
            sec = await Gun.SEA.work(q1,q2);//encrypt key
            //console.log(sec);
            
            let enc = await Gun.SEA.encrypt(hint, sec);//encrypt hint
            //console.log(enc);
            user.get('hint').put(enc,ack=>{//set hash hint
                //console.log(ack);
                if(ack.ok){
                    //displayeffectmessage('Hint Apply!'); //display message effects
                    self.$root.$emit('dialogmessage','Hint Apply!');
                }
            });
            
        }
    }
}
</script>