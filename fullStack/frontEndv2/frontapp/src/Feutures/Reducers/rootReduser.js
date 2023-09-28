import { combineReducers, createStore, applyMiddleware } from 'redux'
import reducerUser from './reduserUser'
import thunk from 'redux-thunk'


// const rootReducer = combineReducers({
//     reducerUser: reducerUser
// })

export const store = createStore(
    combineReducers({
        reducerUser: reducerUser,
    }),
    {},
    applyMiddleware(thunk)
);