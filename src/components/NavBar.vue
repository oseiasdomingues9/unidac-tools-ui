<script setup lang="ts">
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js';
import { useDialog } from 'primevue/usedialog';
import { inject, ref } from 'vue';
import ConfigScreen from './ConfigScreen.vue';

const dialog = useDialog();

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
    menu.value.toggle(event);
}

const configValue = ref();

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
            modal: true
        },
        onClose(options : any) {
            configValue.value = options.data; // {id: 12}
        }
    });
}

const symbol = VueKeycloakJs.KeycloakSymbol
const kc : any = inject(symbol)

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
            <div>
                <Button icon="pi pi-cog" raised rounded @click="showMenu"></Button>
                <Menu ref="menu" id="overlay_menu" :model="items2" :popup="true" />
            </div>
        </template>
    </Menubar>
    <router-view :configValue="configValue"></router-view>
</template>

<style scoped lang="scss">

.logo{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    align-items: center;
}

</style>