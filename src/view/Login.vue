<script setup lang="ts">
import { ref } from 'vue';
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';

const username = ref()
const password = ref()
const router = useRouter();
const errorMessage = ref()


function login(){
    AuthService.login(username.value,password.value).then((res : any) => {
        localStorage.setItem('user', res.data.userId);
        localStorage.setItem('authenticated', 'true');
        router.push('/logs'); 
    }).catch((err : any) => {
        errorMessage.value = err.message
    })
}


</script>

<template>
    <div class="flex flex-column mx-auto mt-8 w-3">
        <div class="flex flex-row w-full mx-auto">
            <Card class="w-full h-full bg-black-alpha-20 p-4">
                <template #title> 
                    <div class="text-center">
                        <span>Login</span> 
                    </div>
                </template>
                <template #content>
                    <div class="flex flex-column justify-content-center w-full h-25rem gap-3">
                        <div class="flex flex-column gap-2">
                            <span class="p-input-icon-left">    
                                <i class="pi pi-user" />
                                <InputText id="username" v-model="username" placeholder="Usuario" class="w-full"/>
                            </span>
                        </div>
                        <div class="flex flex-column gap-2">
                            <span class="p-input-icon-left">    
                                <i class="pi pi-lock" />
                                <InputText id="password" v-model="password" placeholder="Senha" class="w-full"  type="password"/>
                            </span>
                        </div>
                        <Button label="Login" @click="login" class="bg-orange-500 mt-5 hover:bg-orange-700"></Button>
                        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<style scoped>

</style>