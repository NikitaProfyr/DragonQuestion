import { useDispatch } from "react-redux"
import AuthService from "../../Services/AuthService"

export const loginAction = async (userName, password, dispatch) => {
    const data = await AuthService.login(userName, password)
    // console.log(data);
    dispatch({type: 'LOGINSUCCES', payload: data})
    // return AuthService.login(userName, password)
    // .then((response) => {
    //     dispatch({type: 'LOGINSUCCES', payload: response.data})
    //     return Promise.resolve()
    // })
    // .catch(err=> {
    //     dispatch({type: 'LOGINFAILED'})
    //     return Promise.reject()
    // })
}

export const logoutAction = (dispatch) => {
    AuthService.logout()
    dispatch({
        type: 'LOGOUT',
    })
}