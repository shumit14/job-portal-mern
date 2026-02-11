import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "https://job-portal-mern-3vj3.onrender.com/api"
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')

        if(token){
            config.headers.Authorization = `Bearer ${token}`
    }
        return config
    },
    (error) => Promise.reject(error)
)

export default axiosInstance