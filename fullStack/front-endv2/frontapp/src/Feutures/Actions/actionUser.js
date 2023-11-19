import AuthService from "../../Services/AuthService"

// export const loginAction = async (userName, password, dispatch) => {
//     const data = await AuthService.login(userName, password)
//     dispatch({type: 'LOGINSUCCES', payload: data})
// }

export const loginAction = async (userName, password) => {
        const data = await AuthService.login(userName, password)
        return {type: 'LOGINSUCCES', payload: data} 
    }

export const logoutAction = (dispatch) => {
    AuthService.logout()
    dispatch({
        type: 'LOGOUT',
    })
}