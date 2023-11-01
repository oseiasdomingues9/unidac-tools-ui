import { createRouter, createWebHistory } from 'vue-router'
import Login from '../view/Login.vue'
import Logs from '../view/Logs.vue'
import Configuration from '../view/Configuration.vue'

export default createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            redirect : "/login",
        },
        {
            path : '/login',
            component : Login,
            //beforeEnter : authGuard
        },
        {
            path : '/logs',
            component : Logs,
            //beforeEnter : authGuard
        },
        {
            path : '/config',
            component : Configuration,
            //beforeEnter : authGuard
        },
    ]

})