import api from "./API"

let base = "/config/"

export default{
    findConfig(){
        return api.get(base + 'logs/all')
    }
}