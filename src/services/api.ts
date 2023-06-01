import axios from "axios"

const http = axios.create({
   baseURL: 'http://localhost:8080/api/logs'
})

export default{
    findLogs(){
        return http.get('all')
    }
}