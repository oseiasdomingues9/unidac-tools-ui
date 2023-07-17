import { keycloak } from './../plugins/keycloak';
import ConfigLogs from "../models/ConfigLogs"
import api from "./API"

let base = "/config/"

export default{
    findByUsername(username : any){
        return api.get(base + 'logs/find-by-username/' + username)
    },
    saveConfigLogs(configLogs : ConfigLogs){
        return api.post(base + 'logs/save',configLogs)
    }
}