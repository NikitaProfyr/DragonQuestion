import AuthService from "../../Services/AuthService"

const LOGIN = 'LOGIN'


const stateUser = {
    user: {},
    isActive: false,
}
     


const reducerUser = (state = stateUser, action) => {
    switch(action.type){
        case LOGIN:
            let response = AuthService.login(action.value.userName , action.value.password)
            localStorage.setItem('accessToken', response.data.accesToken)
            return {...state, isActive: true}
        default: 
            return state
    }
}

export default reducerUser 