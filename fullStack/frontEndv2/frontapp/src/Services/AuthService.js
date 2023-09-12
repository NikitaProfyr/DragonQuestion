import Api from "../Http";

export default class AuthServide {
    static login(email, password){
        return Api.post('/login', {email, password})
    }

    static registration(email, password){
        return Api.post('/login', {email, password})
    }

    static logout(email, password){
        return Api.post('/login', {email, password})
    }
}