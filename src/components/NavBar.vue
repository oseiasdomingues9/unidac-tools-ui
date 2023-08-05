<script setup lang="ts">
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
import { useDialog } from 'primevue/usedialog';
import { inject, onMounted, reactive, ref } from 'vue';
import ConfigScreen from './ConfigScreen.vue';
import ConfigLogs from '../models/ConfigLogs';
import ConfigService from '../services/ConfigService';


const dialog = useDialog();

const kc : any = inject(VueKeycloakJs.KeycloakSymbol)

const username = localStorage.getItem('keycloak-user')
console.log(localStorage.getItem('keycloak-token'))

const items = ref([
    {
        label : "Logs",
        to: "/logs"
    },
    {
        label : "Parâmetros",
        to: "/params"
    },

])


const menu = ref();
const items2 = ref([
    {label: 'Configurações', icon: 'pi pi-cog', command : openDialog },
    {label: 'Sair', icon: 'pi pi-sign-out', command : logout}
]);

function showMenu(event : any){
    console.log(kc.fullName)
    console.log(kc.tokenParsed.email)

    menu.value.toggle(event);
}

let configLogs = reactive<ConfigLogs>({
    integrationId: false,
    refId1: false,
    refName1: false,
    refId2: false,
    refName2: false,
    message: false,
    time: false,
    requestMethod: false,
    contentType: false,
    debugMode: false,
    username: ''
});

function teste(){ 
   ConfigService.findByUsername(username).then((res : any) =>{
      configLogs.integrationId = res.data.integrationId;
      configLogs.refId1 = res.data.refId1;
      configLogs.refName1 = res.data.refName1;
      configLogs.refId2 = res.data.refId2;
      configLogs.refName2 = res.data.refName2;
      configLogs.message = res.data.message,
      configLogs.time = res.data.time,
      configLogs.requestMethod = res.data.requestMethod,
      configLogs.contentType = res.data.contentType,
      configLogs.debugMode = res.data.debugMode
      console.log(configLogs)
   })
}

teste();

function openDialog(){
    dialog.open(ConfigScreen, {
        props: {
            header: 'Configurações',
            style: {
                width: '80vw',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true,
        },
        data:{
            configLogs : configLogs
        },
        onClose(options : any) {
            Object.assign(configLogs,options.data)
            configLogs.username = username
            ConfigService.saveConfigLogs(configLogs).then((res : any)=> {
                console.log(res)
            })
        }
    });
}





function logout(){
    kc.keycloak.logout()
}

</script>

<template>
    <Menubar :model="items" class="bg-blue-600 border-noround border-none">
        <template #start>
            <div class="logo">
                <v-icon name="bi-tools" scale="2.5" fill="var(--yellow-200)"/>                
                <span class="ml-1 text-5xl text-bluegray-200">Unidac Tools</span>
            </div>
        </template>
        <template #end>
            <div class="flex">
                <div class="flex align-items-center justify-content-center flex-column p-1 mr-2 border-round-md">
                    <span class="text-xg mb-1">{{ kc.fullName }}</span>
                </div>
                <div>
                    <Button icon="pi pi-cog" raised rounded @click="showMenu"></Button>
                    <Menu ref="menu" id="overlay_menu" :model="items2" :popup="true" />
                </div>
            </div>
        </template>
    </Menubar>
    <router-view :configLogs="configLogs"></router-view>
</template>

<style scoped lang="scss">

.logo{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    align-items: center;
}

</style>