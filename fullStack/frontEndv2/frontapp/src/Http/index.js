import axios from "axios";


export const ApiUrl = 'http://127.0.0.1:8000'

let Api = null;

const ApiWithOutToken = axios.create({
    baseURL: ApiUrl,
})

const ApiWithToken = axios.create({
    withCredentials: true,
    baseURL: ApiUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
    },
    
})

if(localStorage.getItem('accessToken') === null){
    Api = ApiWithOutToken
}
else{
    Api = ApiWithToken
}

export default Api