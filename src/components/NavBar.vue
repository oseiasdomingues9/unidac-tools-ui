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
    <Menubar :model="items" class="bg-blue-600 border-noround border-none">
        <template #start>
            <div class="logo">
                <v-icon name="bi-tools" scale="2.5" fill="var(--yellow-200)"/>                
                <span class="ml-1 text-5xl text-bluegray-200">Unidac Tools</span>
            </div>
        </template>
    </Menubar>
    <router-view></router-view>
</template>




<style scoped lang="scss">

.logo{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    align-items: center;
}



</style>