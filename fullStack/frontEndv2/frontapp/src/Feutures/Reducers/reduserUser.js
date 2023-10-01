import { Navigate } from "react-router-dom"
import AuthService from "../../Services/AuthService"

const LOGINSUCCES = 'LOGINSUCCES'
const LOGINFAILED = 'LOGINFAILED'
const LOGOUT = 'LOGOUT'

const user = JSON.parse(localStorage.getItem('user')) 

const stateUser = user 
? { userInfo: user, isActive: true } 
: { userInfo: null, isActive: false }     


const reducerUser = (state = stateUser, action) => {
    const {type, payload} = action; 

    switch(type){
        case LOGINSUCCES:
            return {...state, userInfo: payload.user, isActive: true}
        case LOGINFAILED:
            return {...state, userInfo: null, isActive: false}
        case LOGOUT:
            return {...state, userInfo: null, isActive: false}    
        // case SIGNUP:
        //     return <Navigate to = "/authorization" />
        default: 
            return state
    }
}

export default reducerUser 