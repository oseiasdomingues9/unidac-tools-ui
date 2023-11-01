import ConfigLogs from "../models/ConfigLogs"
import axios from "./Axios"

let base = "/config/"

export default{
    findByUserId(userId : any){
        return axios.get(base + 'logs/find-by-id/' + userId)
    },
    saveConfigLogs(configLogs : ConfigLogs){
        return axios.post(base + 'logs/save',configLogs)
    }
}