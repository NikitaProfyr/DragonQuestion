import { Navigate } from "react-router-dom"
import AuthService from "../../Services/AuthService"

const LOGIN = 'LOGIN'
const LOGUP = 'LOGUP'
const CHEK_LOGIN = 'CHEK_LOGIN'
const GET_CURRENT_USER = 'GET_CURRENT_USER'

const stateUser = {
    user: {},
    isActive: false,
    info: {}
}
     


const reducerUser = (state = stateUser, action) => {
    switch(action.type){
        case GET_CURRENT_USER:
            console.log(action.value)
            // return {...state, info: action.value }
            return state
        case CHEK_LOGIN:
            return {...state, isActive: action.value}
        case LOGIN:
            AuthService.login(action.value.userName , action.value.password)
            return {...state, isActive: true}
        case LOGUP:
            AuthService.logup(action.value.userName, action.value.password)
            return <Navigate to = "/authorization" />
        default: 
            return state
    }
}

export default reducerUser 