import Api from "../Http";

export default class AuthService {
    static login(userName, password){
        return Api.post('/users/login', {userName, password})
        .then(response => {
            return Promise.resolve(response)
        }) 
    }

    static logup(userName, password){
        
        const userData = {
            userName: userName,
            password: password
        }
        console.log(userData)
        var answer = false
        Api.post('/users/logup', userData).then(response => {
            if (response.status === 400){
                answer = false
            }
            if (response.status === 200){
                console.log("ebat`")
                answer = true
            }
        })
        console.log(answer, "3232")
        return answer
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