<script setup lang="ts">
import { ref } from 'vue';

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

</script>

<template>
    <Menubar :model="items">
        <template #start>
            <img alt="Logos Logs" src="/images/logo.svg" height="40" class="mr-2" />
        </template>
    </Menubar>
    <router-view></router-view>
</template>



<style scoped>

</style>