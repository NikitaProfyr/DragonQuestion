import axios from "axios";


export const ApiUrl = 'http://127.0.0.1:8000'

const Api = axios.create({
    withCredentials: true,
    baseURL: ApiUrl,
})

Api.interceptors.request.use((config) => {
    config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}` 
    console.log(config.headers)
    return config
})

export default Api