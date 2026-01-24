import axios from "axios"

const api = axios.create({
    method:"GET POST",
    baseURL:"http://localhost:3000/api/auth/",
    timeout:500000,
    headers:{
        "Content-Type":"application/json",
    }
})

export default api;