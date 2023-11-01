<script setup lang="ts">
import ConfigLogs from '../components/config/ConfigLogs.vue';

function changeTab(){
   console.log("Change Tab")
}

</script>

<template>
   <TabView @tab-change="changeTab" class="w-10 mx-auto">
      <TabPanel header="Logs">
         <ConfigLogs/>
      </TabPanel>
      <TabPanel header="Parametros">
      </TabPanel>
</TabView>

</template>

<style scoped>

</style>