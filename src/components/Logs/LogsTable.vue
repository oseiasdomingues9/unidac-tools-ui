<script setup lang="ts">import { onMounted, reactive, ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import LogsRequestResponse from './LogsRequestResponse.vue';
import { AxiosError } from 'axios';
import api from '../../services/api';
import Logs from '../../models/Logs';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import moment from 'moment';

const filters = ref();
let logs = reactive<Logs[]>([]);
//Paginação
const dialog = useDialog();
const size = ref(25)
const isLoading = ref(true)

//Rest
function searchLogByFilter(filterLog : any){
    api.findLogs(filterLog).then((res) => {
        Object.assign(logs,res.data)
        logs.forEach(x => {
            x.date = moment(x.date).toDate()
            x.time = moment(x.time).format("HH:mm:ss")
        })
        isLoading.value = false;
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
        integrationName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]},
        integrationId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        originId: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        originName: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.OR, constraints: [{ value: moment().toDate(), matchMode: FilterMatchMode.DATE_IS }] },
        time: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    };
};
initFilters();

function clearFilter(){
    initFilters();
};
//Filtro inicial
let filterLog = reactive({
    "operation" : filters.value.date.operator,
    "match1" :  filters.value.date.constraints[0].matchMode,
    "matchValue1" : formatDate(filters.value.date.constraints[0].value),
    "match2" :  '',
    "matchValue2" : '',
})
searchLogByFilter(filterLog);

//Filtro por data
function doFilterByDate(filterDate : any){
    isLoading.value = true
    let filterModel = filterDate.filterModel
    filterLog.operation =  filterModel.operator
    filterLog.match1 = filterModel.constraints[0].matchMode
    console.log(filterModel.constraints[0].value)
    console.log(formatDate(filterModel.constraints[0].value))
    filterLog.matchValue1 = formatDate(filterModel.constraints[0].value)
    if(filterModel.constraints.length > 1){
        if(filterModel.constraints[1].value != null){
            filterLog.matchValue2 = formatDate(filterModel.constraints[1].value)
            filterLog.match2 = filterModel.constraints[1].matchMode
        }
    }
    searchLogByFilter(filterLog);
    filterDate.filterCallback();
}

//Modal
function openDialog(logs: Logs){
    dialog.open(LogsRequestResponse, {
        data:{
            logs : logs
        }
    });
}

//Teste

function teste(){
    console.log("Teste")
}

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
    isLoading.value = true

    filters.value.date.constraints[0].value = moment().subtract(days,'days').toDate()
    filters.value.date.constraints[0].matchMode = FilterMatchMode.DATE_AFTER

    filters.value.date.constraints.push({
        "value" : moment().toDate(),
        "matchMode" : FilterMatchMode.DATE_BEFORE
    })

    filterLog = {
        "operation" : filters.value.date.operator,
        "match1" :  filters.value.date.constraints[0].matchMode,
        "matchValue1" : formatDate(filters.value.date.constraints[0].value),
        "match2" :  filters.value.date.constraints[1].matchMode,
        "matchValue2" : formatDate(filters.value.date.constraints[1].value),
    }

    searchLogByFilter(filterLog);
}

const toggle = (event : any) => {
    menu.value.toggle(event);
};


</script>

<template>
    <div class="">
        <DataTable :value="logs" v-model:filters="filters"  tableStyle="min-width: 50rem" stripedRows paginator :rows="size" :rowsPerPageOptions="[25,50,100]" :loading="isLoading" dataKey="id" filterDisplay="menu" sortField="id" :sort-order="-1"
        :globalFilterFields="['integrationId', 'originId', 'originName', 'message', 'date','time','status']" >
            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Limpar" outlined @click="clearFilter()" />
                    <div class="flex align-items-center justify-content-center">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />              
                            <InputText v-model="filters['global'].value" placeholder="Pesquisa..." />
                        </span>
                        <Button type="button" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu"  class="ml-2">
                            <v-icon name="co-filter" scale="1" fill="var(--primary-200)"/>                
                        </Button>
                        <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
                    </div>  
                </div>
            </template>
            <template #empty> Nenhum registro foi encontrado. </template>
            <template #loading> Carregando dados os logs. Por favor, aguarde. </template>
            <Column field="integrationId" header="Integração" class="text-center vertical-align-middle" sortable></Column>
            <Column field="originId" header="Origem" class="text-center vertical-align-middle" sortable></Column>
            <Column field="originName" header="Tipo de Origem" class="text-center vertical-align-middle"></Column>
            <Column field="integrationName" header="Entidade" class="text-center vertical-align-middle">
                <template #body="{ data }">
                    {{ data.integrationName }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="message" header="Mensagem" class="text-center vertical-align-middle"></Column>
            <Column field="date" header="Data" filterField="date" dataType="date" class="text-center vertical-align-middle" sortable> 
                <template #body="{ data }">
                    {{ moment(data.date).format("DD/MM/YYYY") }}
                </template>
                <template #filter="{ filterModel }">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
                </template>
                <template #filterapply="value">
                    <Button label="Aplicar" @click="doFilterByDate(value)"></Button>
                </template>
            </Column>
            <Column field="time" header="Hora" filterField="time" dataType="text" class="text-center vertical-align-middle" sortable> 
                <template #body="{ data }">
                    {{ data.time }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="status" header="Status" class="text-center vertical-align-middle"></Column>
            <Column field="exchange" header="Dados" class="text-center vertical-align-middle">
                <template #body="col">
                    <Button @click="openDialog(col.data)" type="button" icon="pi pi-search" class="p-button-success" style="margin-right: .5em; height: 10px;"> </Button>
                </template>
            </Column>
            <DynamicDialog />
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