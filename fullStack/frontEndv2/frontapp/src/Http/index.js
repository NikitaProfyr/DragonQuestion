import axios from "axios";


export const ApiUrl = ''

const Api = axios.create({
    withCredentials: true,
    baseURL: ApiUrl,
})

Api.interceptors.request.use((config) => {
    config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}` 
    return config
})

export default Api