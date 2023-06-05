<script setup lang="ts">import { inject } from 'vue';
import Logs from '../../models/Logs';

const dialogRef : any = inject('dialogRef');
const logs: Logs = dialogRef.value.data.logs

</script>

<template>
    <div class="container">
        <pre>{{ logs.msgRequest }}</pre>
    </div>
</template>

<style scoped>
.container{
    width: 75vw;
    height: 50vh;
    padding:50px ;
}

pre {
  background: #252525;
  border-left: 3px solid #f36d33;
  color: rgb(231, 228, 228);
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  max-width: 100%;
  overflow: auto;
  padding: 1em 1.5em;
  display: block;
  word-wrap: break-word;
  white-space: pre-wrap;
}

</style>