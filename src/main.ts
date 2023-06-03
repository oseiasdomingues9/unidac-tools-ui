import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './routes/router'

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import Fieldset from 'primevue/fieldset';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import DynamicDialog from'primevue/dynamicdialog';
import DialogService from 'primevue/dialogservice';
import moment from 'moment'

import pt from "./locales/pt.json";

import "primevue/resources/themes/soho-dark/theme.css"
//import "primevue/resources/themes/lara-light-blue/theme.css"
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";


const app = createApp(App);
app.use(PrimeVue,{
    locale : pt
});
app.use(router)
app.use(ToastService)
app.use(DialogService);

app.component('Button',Button);
app.component('InputText',InputText);
app.component('InputNumber',InputNumber);
app.component('Card',Card);
app.component('Fieldset',Fieldset);
app.component('Menubar',Menubar);
app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('Toolbar',Toolbar);
app.component('Calendar',Calendar);
app.component('InputMask',InputMask);
app.component('Dropdown',Dropdown);
app.component('Dialog',Dialog);
app.component('ProgressSpinner',ProgressSpinner);
app.component('Toast',Toast);
app.component('DynamicDialog',DynamicDialog);


moment.locale('pt-br');


app.mount('#app')
