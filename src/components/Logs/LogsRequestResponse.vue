<script setup lang="ts">import { inject } from 'vue';
import Logs from '../../models/Logs';

import jsonTest from "../../jsonTest.json";
import { useClipboard } from '@vueuse/core'

console.log(jsonTest)

const { copy } = useClipboard()


const dialogRef : any = inject('dialogRef');
const logs: Logs = dialogRef.value.data.logs
logs.msgRequest = JSON.stringify(jsonTest,null, 3);
logs.msgResponse = JSON.stringify(jsonTest,null, 3);


function teste(event : any){
  console.log(event)
}
</script>

<template>
  <TabView @tab-change="teste">
    <TabPanel header="Request">
      <div class="flex justify-content-between align-items-center">
        <span>Requisição  referente ao serviço {{ logs.integrationName }}</span>
        <Button @click="copy(logs.msgRequest)" icon="pi pi-clone" text></Button>
      </div>
      <div class="flex justify-content-center">
        <highlightjs language="json" :code="logs.msgRequest" class="format"/>
      </div>
    </TabPanel>
    <TabPanel header="Response">
      <div class="flex justify-content-between align-items-center">
        <span>Resposta referente ao serviço {{ logs.integrationName }}</span>
        <Button @click="copy(logs.msgResponse)" icon="pi pi-clone" text></Button>
      </div>
      <div class="flex justify-content-center">
        <highlightjs language="json" :code="logs.msgResponse" class="format"/>
      </div>
    </TabPanel>
  </TabView>
</template>

<style scoped>

.format {
  line-height: 1.2;
  overflow: auto;
  display: block;
  word-wrap: break-word;
  white-space: pre-wrap;
}



</style>