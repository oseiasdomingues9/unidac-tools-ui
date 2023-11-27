<script setup lang="ts">
import { useDialog } from 'primevue/usedialog';
import {  inject, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const dialog = useDialog();
const route = useRouter()

const username = "oseias"

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
    {label: 'Configurações', icon: 'pi pi-cog', command : toConfig },
    {label: 'Sair', icon: 'pi pi-sign-out', command : logout}
]);

function showMenu(event : any){
    menu.value.toggle(event);
}

function toConfig(){
    route.push("/config")
}

function logout(){
    console.log("Sair")
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
                    <span class="text-xg mb-1">{{ "Nome Completo" }}</span>
                </div>
                <div>
                    <Button icon="pi pi-cog" raised rounded @click="showMenu"></Button>
                    <Menu ref="menu" id="overlay_menu" :model="items2" :popup="true" />
                </div>
            </div>
        </template>
        <DynamicDialog/>
    </Menubar>
</template>

<style scoped lang="scss">

.logo{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    align-items: center;
}

</style>