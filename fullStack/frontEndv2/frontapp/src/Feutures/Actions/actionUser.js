import AuthService from "../../Services/AuthService"

export const loginAction = (userName, password) => (dispatch) => {
    return AuthService.login(userName, password)
    .then((response) => {
        dispatch({type: 'LOGINSUCCES', payload: response.data})
        return Promise.resolve()
    })
    .cath(err=> {
        dispatch({type: 'LOGINFAILED'})
        return Promise.reject()
    
    })
}