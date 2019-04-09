import Vue from 'vue'
import './style.scss'
import template from './tpl'

let no_data = Vue.extend({
    template,
    data:()=>({isShow:this.is_show||false}),
    props:['is_show'],
    methods:{}
});

export default no_data
