import axios from "./Axios"

let base = "/auth/"

export default{

    login(login : any, password : any){
        let data = {
            "login" : login,
            "password" : password
        }
        return axios.post(base + 'login',data)
    },

    logout(){
        return axios.get(base + 'logout',{headers:{"user" : localStorage.getItem("user")}})
    }
    
}