import Vue from 'vue'
import './style.scss';
import template from './tpl.html'
import loading from '../../component/loaing/main'
import {mapState} from 'vuex'

export default Vue.extend({
    name:'index',
    template,
    components:{
        loading
    },
    data:() => ({
        email:'12345',
        red:'red',
        is_show: true
    }),
    created(){
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods:{
        submit(){
            this.$validator.validateAll().then(res=>{
                console.log(res);
                console.log(this.email)
            })
        }
    }
})