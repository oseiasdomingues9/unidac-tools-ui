<script setup lang="ts">
import { reactive } from 'vue';
import ConfigLogs from '../../models/ConfigLogs';
import ConfigService from '../../services/ConfigService';


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
    userId: ''
});

function teste(){ 
   ConfigService.findByUserId(localStorage.getItem("user")).then((res : any) =>{
        Object.assign(configLogs,res.data)


  
      configLogs.userId = localStorage.getItem("user")
   })
}

teste();

teste


function saveConfigLog(){
    console.log(configLogs.integrationId)
    console.log(configLogs.refId1)
   ConfigService.saveConfigLogs(configLogs)
                .then((res : any)=> {
                    console.log(res)
                })
                }
</script>

<template>
    <div>
        <div class="flex justify-content-between align-items-center mb-2">
            <spacer/>
            <h1>Configurações dos Logs</h1>
            <Button icon="pi pi-save" @click="saveConfigLog"  text rounded/>               
        </div>
        <div class="flex flex-row">
            <div class="flex flex-wrap border-1 border-round-md surface-border w-5 mr-3 p-2 justify-content-center">
                <div class="flex align-items-center w-full justify-content-center p-2">
                    <h3>Campos</h3>
                </div>
                <div class="flex flex-column gap-2 p-2">
                    <div class="flex align-items-center">
                        <Checkbox v-model="configLogs.integrationId" inputId="integrationId" :binary="true"/>
                        <label for="integrationId" class="ml-2"> Código de Integração </label>
                    </div>
                    <div class="flex align-items-center">
                        <Checkbox v-model="configLogs.refId1" inputId="refId1" :binary="true"/>
                        <label for="refId1" class="ml-2"> Código de Referência 01 </label>
                    </div>
                    <div class="flex align-items-center">
                        <Checkbox v-model="configLogs.refName2" inputId="ingredient1" name="pizza" value="Cheese" :binary="true"/>
                        <label for="ingredient1" class="ml-2"> Descrição da Referência 01  </label>
                    </div>
                    <div class="flex align-items-center">
                        <Checkbox v-model="configLogs.time" inputId="ingredient1" name="pizza" value="Cheese" :binary="true"/>
                        <label for="ingredient1" class="ml-2"> Hora </label>
                    </div>
                    <div class="flex align-items-center">
                        <Checkbox v-model="configLogs.requestMethod" inputId="ingredient1" name="pizza" value="Cheese" :binary="true" />
                        <label for="ingredient1" class="ml-2"> Tipo de Requisição </label>
                    </div>
                </div>
                <div class="flex flex-column gap-2 p-2">
                    <div class="flex align-items-center">
                    <Checkbox v-model="configLogs.refName1" inputId="ingredient1" name="pizza" value="Cheese" :binary="true"/>
                    <label for="ingredient1" class="ml-2"> Descrição da Referência 01 </label>
                    </div>
                    <div class="flex align-items-center">
                    <Checkbox v-model="configLogs.refId2" inputId="ingredient1" name="pizza" value="Cheese" :binary="true"/>
                    <label for="ingredient1" class="ml-2"> Código de Referência 02 </label>
                    </div>
                    <div class="flex align-items-center">
                    <Checkbox v-model="configLogs.message" inputId="ingredient1" name="pizza" value="Cheese" :binary="true"/>
                    <label for="ingredient1" class="ml-2"> Mensagem </label>
                    </div>
                    <div class="flex align-items-center">
                    <Checkbox v-model="configLogs.contentType" inputId="ingredient1" name="pizza" value="Cheese" :binary="true"/>
                    <label for="ingredient1" class="ml-2"> Formato da Requisição </label>
                    </div>
                </div>

            </div>
            <div class="flex flex-wrap border-1 border-round-md surface-border w-7 ml-3 p-2 justify-content-center">
                <div class="flex flex-column gap-2 p-2 w-5 mr-4">
                    <div class="flex align-items-center justify-content-between">
                    <span>Modo Debug</span>
                    <InputSwitch v-model="configLogs.debugMode"/>
                    </div>
                </div>
                <div class="flex flex-column gap-2 p-2 w-5 ml-4">
                    <div class="flex align-items-center justify-content-between">
                    <span>Modo Debug</span>
                    <InputSwitch v-model="configLogs.debugMode"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>