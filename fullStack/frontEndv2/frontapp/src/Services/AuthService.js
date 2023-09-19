import Api from "../Http";

export default class AuthService {
    static login(email, password){
        return Api.post('/users/login', {email, password}).then(response => {
            console.log(response.data)
        })
    }

    static registration(email, password){
        return Api.post('/login', {email, password})
    }

    static logout(email, password){
        return Api.post('/login', {email, password})
    }

    static getUserName(){
        const token = document.cookie 
        console.log(token)
        // return Api.post('/users/getUser', token.accesToken)
    }
}