import { combineReducers, createStore } from 'redux'
import reducerUser from './reduserUser'

const rootReducer = combineReducers({
    reducerUser: reducerUser
})

export const store = createStore(rootReducer)