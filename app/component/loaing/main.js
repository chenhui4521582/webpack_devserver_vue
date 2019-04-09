import Vue from 'vue'
import './style.scss'
import template from './tpl'

let loading = Vue.extend({
    template,
    data: () => ({
        isShow:false
    }),
    props:['is_show']
});

export default loading
