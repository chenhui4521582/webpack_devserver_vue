import template from './tpl'
import Vue from 'vue'
import './style.css'

export default Vue.extend({
    template,
    data:()=>({

    }),
    mounted () {
        console.log(this.$root)
    }
})
