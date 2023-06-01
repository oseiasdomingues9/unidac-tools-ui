import { createRouter, createWebHistory } from 'vue-router'
import Logs from '../components/Logs/Logs.vue'

export default createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            component : Logs
        }
    ]

})