<script setup lang="ts">
import moment from 'moment';
import Dialog from 'primevue/dialog';
import { inject, ref } from 'vue';


let date = ref([
    moment().toDate(),
    moment().toDate()
])

const dialogRef : any = inject('dialogRef');

let time = ref([
    
])

function close(params : any) {
    dialogRef.value.close(params);
}

let timeStart = ref();
let timeEnd = ref();
let invalid = '';

let value1: any;

function teste(){

    if(timeStart.value > timeEnd.value){
        invalid = "p-invalid"
    }else{
        invalid = ""
    }
}

</script>

<template>
    <div>
        <Card>
            <template #content>
                <div class="flex flex-column gap-2">
                    <div>
                        <label for="locale-user" class="font-bold block mb-2"> Calendario </label>
                        <Calendar v-model="date" dateFormat="dd/mm/yy" selectionMode="range" :manualInput="false" showIcon showButtonBar class="w-full"/>
                    </div>
                    <div class="flex flex-row gap-3">
                        <div class="w-full">
                            <label for="locale-user" class="font-bold block mb-2"> Hora inicial </label>
                            <Calendar class="w-full" v-model="timeStart" dateFormat="HH:mm:ss"  :manualInput="false" showIcon timeOnly v-on:date-select="teste" :class="invalid"/>
                        </div>
                        <div class="w-full">
                            <label for="locale-user" class="font-bold block mb-2"> Hora final </label>
                            <Calendar class="w-full" v-model="timeEnd" dateFormat="HH:mm:ss" :manualInput="false" showIcon timeOnly v-on:date-select="teste" :class="invalid" />
                        </div>
                    </div>
                    <div>
                        <label for="locale-user" class="font-bold block mb-2"> User Locale </label>
                        <InputNumber v-model="value1" inputId="integeronly" class="w-full"/>
                    </div>
                    <Button @click="close(date)"/>
                </div>
            </template>
        </Card>
    </div>
</template>



<style scoped>

</style>