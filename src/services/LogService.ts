import api from "./api"

let base = "/logs/"

export default{
    findLogs(filterLog : any){
        return api.post(base + 'all',filterLog)
    },
    security(role : any,token : any){
        return api.get('security/' + role, {
            headers: { 
                Authorization: "Bearer " + token 
            }}
            )
    }
}