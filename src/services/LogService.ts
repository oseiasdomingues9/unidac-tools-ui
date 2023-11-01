import axios from "./Axios"

let base = "/logs/"

export default{
    findLogs(filterLog : any){
        return axios.post(base + 'all',filterLog)
    },
    security(role : any,token : any){
        return axios.get('security/' + role, {
            headers: { 
                Authorization: "Bearer " + token 
            }}
            )
    }
}