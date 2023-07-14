<script setup lang="ts">
import { inject, reactive, ref } from 'vue';
import ConfigService from '../services/ConfigService';
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'
import ConfigLogs from '../models/ConfigLogs';



const configs = reactive<ConfigLogs>({
   integrationId: false,
   originId: false,
   originName: false,
   message: false,
   time: false,
   requestMethod: false,
   contentType: false,
   debugMode: false
});


function teste(){
   ConfigService.findConfig().then((res : any) =>{
         configs.integrationId = res.data[0].integrationId;
         configs.originId = res.data[0].originId;
   });
}

function check(event : any){
   console.log(configs.integrationId)
}

const symbol = VueKeycloakJs.KeycloakSymbol
const kc : any = inject(symbol)

console.log(kc)

const dialogRef : any = inject('dialogRef');

function returnData(){
   dialogRef.value.close("Lere goyyyyyy")
}

teste();
</script>

<template>
<TabView @tab-change="teste">
   <TabPanel header="Logs">
      <div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Código de Integração</span>
               <InputSwitch v-model="configs.integrationId"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Código de Origem</span>
               <InputSwitch v-model="configs.originId"/>
            </div>
         </div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Descrição da Origem</span>
               <InputSwitch v-model="configs.originName"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Mensagem</span>
               <InputSwitch v-model="configs.message"/>
            </div>
         </div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Hora</span>
               <InputSwitch v-model="configs.time"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Tipo de Requisição</span>
               <InputSwitch v-model="configs.requestMethod"/>
            </div>
         </div>
         <div class="grid">
            <div class="col flex justify-content-between justify-content-center pr-3">
               <span>Formato da Requisição</span>
               <InputSwitch v-model="configs.contentType"/>
            </div>
            <div class="col flex justify-content-between justify-content-center pl-3">
               <span>Modo Debug</span>
               <InputSwitch v-model="configs.debugMode"/>
            </div>
         </div>
         <div class="flex justify-content-center ">
            <Button label="Salvar" @click="returnData"/>               
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