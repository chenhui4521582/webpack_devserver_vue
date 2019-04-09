import Vue from 'vue'
import template from './tpl'
import './style.scss'
import {mapGetters,mapState} from 'vuex'

export default Vue.extend({
    template,
    data:()=>({
        country:'',
        mobile:'',
        code:'',
        password:'',
        confirmedPassword:''
    }),
    computed:Object.assign({'aa':res=>'111'},mapState(['user_info','page_index'])),
    methods:{
        submit(){
            this.$validator.validateAll().then(res=>{
                let {forworld} = this.$route.query;
                this.$router.push({'path':forworld})
            })
        }
    },
    mounted(){


    }
});
