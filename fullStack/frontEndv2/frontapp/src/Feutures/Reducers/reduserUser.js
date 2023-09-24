import { Navigate } from "react-router-dom"
import AuthService from "../../Services/AuthService"

const LOGIN = 'LOGIN'
const LOGUP = 'LOGUP'

const stateUser = {
    user: {},
    isActive: false,
}
     


const reducerUser = (state = stateUser, action) => {
    switch(action.type){
        case LOGIN:
            AuthService.login(action.value.userName , action.value.password)
            .then(response => {
                localStorage.setItem('accessToken', response.data.accesToken)
            })
            return {...state, isActive: true}
        case LOGUP:
            AuthService.logup(action.value.userName, action.value.password)
            return <Navigate to = "/authorization" />
        default: 
            return state
    }
}

export default reducerUser 