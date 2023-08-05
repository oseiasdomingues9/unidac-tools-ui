<script setup lang="ts">
import { inject } from 'vue';
import ConfigLogs from '../models/ConfigLogs';

const dialogRef : any = inject('dialogRef');
const configLogs: ConfigLogs = dialogRef.value.data.configLogs

function saveConfigLog(){
   dialogRef.value.close(configLogs)
}

function changeTab(){
   console.log("Change Tab")
}

</script>

<template>
<TabView @tab-change="changeTab">
   <TabPanel header="Logs">
      <div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Código de Integração</span>
               <InputSwitch v-model="configLogs.integrationId"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Código de Referência 01</span>
               <InputSwitch v-model="configLogs.refId1"/>
            </div>
         </div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Descrição da Referência 01</span>
               <InputSwitch v-model="configLogs.refName1"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Código de Referência 02</span>
               <InputSwitch v-model="configLogs.refId2"/>
            </div>
         </div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Descrição da Referência 02</span>
               <InputSwitch v-model="configLogs.refName2"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Mensagem</span>
               <InputSwitch v-model="configLogs.message"/>
            </div>
         </div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Hora</span>
               <InputSwitch v-model="configLogs.time"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Tipo de Requisição</span>
               <InputSwitch v-model="configLogs.requestMethod"/>
            </div>
         </div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Formato da Requisição</span>
               <InputSwitch v-model="configLogs.contentType"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Modo Debug</span>
               <InputSwitch v-model="configLogs.debugMode"/>
            </div>
         </div>
         <div class="flex justify-content-center ">
            <Button label="Salvar" @click="saveConfigLog"/>               
         </div>
      </div>
   </TabPanel>
   <TabPanel header="Parâmetros">
      <div class="flex justify-content-between align-items-center">
         <span>Resposta referente ao serviço</span>
      </div>
   </TabPanel>
</TabView>
</template>

<style scoped>

</style>