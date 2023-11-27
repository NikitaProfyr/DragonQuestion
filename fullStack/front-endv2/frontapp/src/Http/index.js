import axios from "axios";

// export const ApiUrl = 'http://localhost:8000'
export const ApiUrl = 'http://127.0.0.1:8000'

let Api = null;

const ApiWithOutToken = axios.create({
    withCredentials: true,
    baseURL: ApiUrl,
})

const ApiWithToken = axios.create({
    withCredentials: true,
    baseURL: ApiUrl,
})

ApiWithToken.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken')
    return config
})

ApiWithToken.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401){
        try {
            const accessToken = await ApiWithOutToken.get('/users/refresh', {withCredentials: true})
            console.log(accessToken.data.accessToken);
            localStorage.setItem('accessToken', accessToken.data.accessToken)
            return await ApiWithToken.request(originalRequest)
        } catch (e) {
            console.log(e);
        }
    }
})

if(localStorage.getItem('accessToken') === null){
    Api = ApiWithOutToken
}
else{
    Api = ApiWithToken
}

export default Api