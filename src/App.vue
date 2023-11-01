<script setup lang="ts">
import { useRouter } from 'vue-router';
import Header from './components/Header.vue'

const route = useRouter()

function showHeader() {
    return !route.currentRoute.value.fullPath.includes("login")
}



</script>

<template>
    <Header v-if="showHeader()"/>    
    <router-view></router-view>
  <NavBar/>
</template>

<style scoped>
</style>
