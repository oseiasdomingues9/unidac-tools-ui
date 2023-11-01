import { createApp } from 'vue'

import './style.css'

import { primevue } from './plugins/primevue'
import { highlight } from './plugins/highlight'
import { icons } from './plugins/icons'

import pt from "./locales/pt.json";

import App from './App.vue'
import router from './routes/router'
import PrimeVue from 'primevue/config'
import moment from 'moment'

moment.locale('pt-br');

const app = createApp(App);
app.use(PrimeVue,{
    locale : pt
});

app.use(router)
app.use(primevue);
app.use(highlight);
app.use(icons);



app.mount('#app')




