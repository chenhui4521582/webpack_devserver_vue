import Vue from 'vue';
import Router from 'vue-router';
/* components */
import index from '@modules/index/main'
import home from '@modules/home/main'
import login from '@modules/home/login/main'

/*/ public box /*/
import children_tpl from './children_tpl/main'


Vue.use(Router);

let routes =[
    {
        path:'/',
        component:children_tpl,
        children:[
            {path:'/',component:index,meta:{login:false}}
        ]
    },
    {
        path:'/home',
        component:children_tpl,
        children:[
            {path:'/',component:home,meta:{login:true}},
            {path:'/home/login',name:'home',component:login,meta:{login:true}}
        ]
    }
];

let vue_route = new Router({routes});

export default vue_route