<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import { AxiosError } from 'axios';
import { FilterMatchMode } from 'primevue/api';
import moment from 'moment';
import ConfigLogs from '../models/ConfigLogs';
import ConfigService from '../services/ConfigService';
import Logs from '../models/Logs';
import LogsServices from '../services/LogService';
import LogsRequestResponse from "../components/logs/LogsRequestResponse.vue";
import LogsFilter from "../components/logs/LogsFilter.vue";

const filters = ref();
let logs = reactive<Logs[]>([]);
//Paginação
const dialog = useDialog();
const rows = ref(25)
const isLoading = ref(true)

const props = defineProps<{
    configLogs: ConfigLogs,
}>();

onMounted(() => {
    isLoading.value = true;
    loadLazyData();
});

const loadLazyData = () => {
    isLoading.value = true;

    setTimeout(() => {
        searchLogByFilter(filterLog)
        console.log("AAAA")
        setTimeout(() => {
            isLoading.value = false;
        },Math.random() * 1000 + 250);
    }, Math.random() * 1000 + 250);
};

let sortField = "id";
let sortOrder = -1;

//Filtro inicial
let filterLog = reactive({
    "dateStart" : moment().toDate(),
    "dateEnd" :  moment().toDate(),
    "page" : 0,
    "rows" : rows,
    "sortField"  : sortField,
    "sortOrder" : sortOrder
})

const onPage = (event : any) => {
    filterLog.page = event.page
    filterLog.rows = event.rows 
    filterLog.sortField = sortField
    filterLog.sortOrder = sortOrder
    loadLazyData();
};
const onSort = (event: any) => {
    filterLog.page = 0
    filterLog.rows = rows.value

    sortField = event.sortField
    filterLog.sortField = sortField

    sortOrder = event.sortOrder
    filterLog.sortOrder = sortOrder
    loadLazyData();
};



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

//Rest
function searchLogByFilter(filterLog : any){
    LogsServices.findLogs(filterLog).then((res : any) => {
        console.log(res)

        Object.assign(logs,res.data.logsDTO)
        totalRecords.value = res.data.totalRows
        logs.forEach(x => {
            x.date = moment(x.date).toDate()
            x.time = moment(x.time).format("HH:mm:ss")
        })
    }).catch((err : AxiosError) => {
        console.log(err)
        isLoading.value = false;
    });
}

//Uteis
const formatDate = (value : any) => {
    return moment(value).format("DD/MM/YYYY")
};


//Filtro
function initFilters(){
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};
initFilters();

function clearFilter(){
    initFilters();
};


//Modal
function openDialog(logs: Logs){
    dialog.open(LogsRequestResponse, {
        props: {
                    header: 'Dados',
                    style: {
                        width: '80vw',
                    },
                    breakpoints:{
                        '960px': '75vw',
                        '640px': '90vw'
                    },
                    modal: true
        },
        data:{
            logs : logs
        }
    });
}

//Teste
const totalRecords = ref(0);


const menu = ref();
const items = ref([
    {
        label: 'Registro de Falhas',
        command : lastError
    },
    {
        label: 'Ultimos 3 dias',
        command : last3Days
    },
    {
        label: 'Ultimos 7 dias',
        command : last7Days
    },
    {
        label: 'Ultimos 30 dias',
        command : last30Days
    }
]);

function lastError(){
    filters.value.status.constraints[0].value = "E"
    console.log("lastError")
}

function last3Days(){
    lastByDays(3)
}

function last7Days(){
    lastByDays(7)
}

function last30Days(){
    lastByDays(30)
}

function lastByDays(days : number){
    console.log(days)
}

const toggle = (event : any) => {
    menu.value.toggle(event);
};

const getSeverity = (status : any) => {
    switch (status) {
        case 'S':
            return 'fc-checkmark';
        case 'E':
            return 'bi-x-lg';
        default:
            return 'hi-refresh'

    }
};

const getColor = (status : any) => {
    switch (status) {
        case 'S':
            return '#13E700';
        case 'E':
            return '#E80000';
        default:
            return '#2A16FF';

    }
};


function testeEvento(){
    menu.value.hide()
}

function openFilter(){
    dialog.open(LogsFilter, {
        props: {
            header: 'Filtro',
            style: {
                width: '40vw',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true
        }
    });
}

</script>

<template>
    <div>
        <DataTable :value="logs" v-model:filters="filters" tableStyle="min-width: 50rem" stripedRows paginator :rows="rows" :rowsPerPageOptions="[25,50,100]" :loading="isLoading" dataKey="id" filterDisplay="menu" sortField="id" :sort-order="-1"
        :globalFilterFields="['integrationId', 'refId1', 'refName1','refId2', 'refName2', 'message', 'date','time','status']" @row-dblclick="openDialog($event.data)" @page="onPage($event)" @sort="onSort($event)" :totalRecords="totalRecords" lazy>
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Limpar" outlined @click="clearFilter()" />
                    <div class="flex align-items-center justify-content-center">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />              
                            <InputText v-model="filters['global'].value" placeholder="Pesquisa..." />
                        </span>
                        <Button type="button" @mouseenter="toggle" @click="openFilter()" aria-haspopup="true" aria-controls="overlay_tmenu"  class="ml-2" >
                            <v-icon name="co-filter" scale="1" fill="var(--primary-200)"/>                
                        </Button>
                        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup @mouseleave="testeEvento()"/>
                    </div>  
                </div>
            </template>
            <template #empty> Nenhum registro foi encontrado. </template>
            <template #loading> Carregando dados os logs. Por favor, aguarde... </template>
            <Column field="integrationId" header="Integração" filterField="integrationId" dataType="numeric" class="text-center vertical-align-middle" sortable :hidden="!configLogs.integrationId">
                <template #body="{ data }">
                    {{ data.integrationId }}
                </template>
            </Column>
            <Column field="refId1" :header="!configLogs.refId2 ? 'Referência' : 'Referência 01'" filterField="refId1" dataType="numeric" class="text-center vertical-align-middle" sortable :hidden="!configLogs.refId1">
                <template #body="{ data }">
                    <span v-if="configLogs.refName1" style="font-size: 12px;">{{ data.refName1 }}<br/></span>
                    <span>{{ data.refId1 }}</span>
                </template>
            </Column>
            <Column field="refId2" header="Referência 02" filterField="refId2" dataType="numeric" class="text-center vertical-align-middle" sortable :hidden="!configLogs.refId2">
                <template #body="{ data }">
                    <span v-if="configLogs.refName2" style="font-size: 12px;">{{ data.refName2 }}<br/></span>
                    <span>{{ data.refId2 }}</span>
                </template>
            </Column>
            <Column field="integrationName" header="Entidade" filterField="integrationName" dataType="text" class="text-center vertical-align-middle" :showFilterMatchModes="false">
                <template #body="{ data }">
                    {{ data.integrationName }}
                </template>
            </Column>
            <Column field="message" header="Mensagem" class="text-center vertical-align-middle" :hidden="!configLogs.message" ></Column>
            
            <Column field="date" header="Data" dataType="date" class="text-center vertical-align-middle" sortable :showFilterMenu="false"> 
                <template #body="{ data }">
                    {{ moment(data.date).format("DD/MM/YYYY") }}
                </template>
            </Column>
            <Column field="time" header="Hora" filterField="time" dataType="text" class="text-center vertical-align-middle" sortable :hidden="!configLogs.time"> 
                <template #body="{ data }">
                    {{ data.time }}
                </template>
            </Column>
            <Column field="status" header="Status" class="text-center vertical-align-middle">
                <template #body="{ data }">
                    <v-icon :name="getSeverity(data.status)" scale="1.2" :fill="getColor(data.status)" />                
                </template>
            </Column>
            <DynamicDialog/>
        </DataTable>
    </div>
</template>



<style scoped>
:deep(.p-datatable .p-column-header-content){
    display: inline;
}
:deep(.p-column-filter-menu-button.p-column-filter-menu-button-active){
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.87);
}

:deep(.p-column-filter-menu-button.p-column-filter-menu-button-active:hover){
    color: rgba(255, 255, 255, 0.87);
    border-color: transparent;
    background: rgba(255, 255, 255, 0.15);;    
}

</style>