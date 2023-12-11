import AuthService from "../../Services/AuthService"
// import UPDATE_USER from "../Reducers/reduserUser"
// export const loginAction = async (userName, password, dispatch) => {
//     const data = await AuthService.login(userName, password)
//     dispatch({type: 'LOGINSUCCES', payload: data})
// }

export const loginAction = async (userName, password, dispatch) => {
        const data = await AuthService.login(userName, password)
        return dispatch({type: 'LOGINSUCCES', payload: data}) 
    }

export const logoutAction = (dispatch) => {
    AuthService.logout()
    dispatch({
        type: 'LOGOUT',
    })
}

export const updateUserAction = async (dispatch, userName, id, email) => {
    const data = await AuthService.updateUserData(userName, id, email)
    dispatch({type: "UPDATE_USER", payload: data})
}