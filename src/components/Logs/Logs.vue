<script setup lang="ts">import { reactive, ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import LogsRequestResponse from './LogsRequestResponse.vue';
import { AxiosError } from 'axios';
import LogsServices from '../../services/LogService';
import Logs from '../../models/Logs';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import moment from 'moment';

const filters = ref();
let logs = reactive<Logs[]>([]);
//Paginação
const dialog = useDialog();
const size = ref(25)
const isLoading = ref(true)

const props = defineProps<{
    configValue: any,
}>();

console.log(props)

//Rest
function searchLogByFilter(filterLog : any){
    LogsServices.findLogs(filterLog).then((res : any) => {
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
        integrationId: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
        originId: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
        originName: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]},
        integrationName: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]},
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
    //filters.value.status.constraints[0].value = "E"
    console.log("lastError")
    console.log(props)
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

const hidden = ref(false)

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

const statuses = ref(['S', 'E']);

</script>

<template>
    <div>
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
            <Column field="integrationId" header="Integração" filterField="integrationId" dataType="numeric" class="text-center vertical-align-middle" sortable :hidden="hidden">
                <template #body="{ data }">
                    {{ data.integrationId }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="number" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="originId" header="Origem" filterField="integrationId" dataType="numeric" class="text-center vertical-align-middle" sortable>
                <template #body="{ data }">
                    {{ data.originId }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="number" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="originName" header="Tipo de Origem" filterField="originName" dataType="text" class="text-center vertical-align-middle">
                <template #body="{ data }">
                    {{ data.originName }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="integrationName" header="Entidade" filterField="integrationName" dataType="text" class="text-center vertical-align-middle">
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
            <Column field="status" header="Status" class="text-center vertical-align-middle">
                <template #body="{ data }">
                    <v-icon :name="getSeverity(data.status)" scale="1.2" :fill="getColor(data.status)" />                
                </template>
                <template #filter="{ filterModel }">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Select One" class="p-column-filter" >
                        <template #option="slotProps">
                            <span>{{ slotProps.option == 'S' ? 'Sucesso': 'Erro'}}</span>                        
                        </template>
                    </Dropdown>
                </template>
            </Column>
            <Column field="exchange" header="Dados" class="text-center vertical-align-middle">
                <template #body="col">
                    <Button @click="openDialog(col.data)" type="button" class="h-2rem w-3rem bg-blue-600 border-none">
                        <template #icon>
                            <v-icon name="bi-eye" scale="1" fill="var(--primary-100)"/>                
                        </template>
                    </Button>
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

</style>../../services/API