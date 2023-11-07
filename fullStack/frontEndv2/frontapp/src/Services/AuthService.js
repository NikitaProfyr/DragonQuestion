import Api from "../Http";

export default class AuthService {
    static login = async (userName, password) => {
        const {data} = await Api.post('/users/login', {userName, password})
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))
        return data
    }

    static logup(userName, password){    
        const userData = {
            userName: userName,
            password: password
        }
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

    static logout = async () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        return await Api.post('/users/logout')
    }

    static getUserInfo(accessToken){
        return Api.post( `/users/getUser?token=${accessToken}`)
        .then(response => {
            return Promise.resolve(response.data)
        })
    }
}