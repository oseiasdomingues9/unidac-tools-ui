import axios from "axios"

const http = axios.create({
   baseURL: 'http://localhost:8080/api/logs'
})

export default{
    findLogs(filterLog : any){
        return http.post('all',filterLog)
    }
}