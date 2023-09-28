import { useDispatch } from "react-redux"
import AuthService from "../../Services/AuthService"



export const loginAction = (userName, password, dispatch) => {

    return AuthService.login(userName, password)
    .then((response) => {
        dispatch({type: 'LOGINSUCCES', payload: response.data})
        return Promise.resolve()
    })
    .catch(err=> {
        dispatch({type: 'LOGINFAILED'})
        return Promise.reject()
    
    })
}

export const logoutAction = (dispatch) => {
    AuthService.logout()
    dispatch({
        type: 'LOGOUT',
    })
}