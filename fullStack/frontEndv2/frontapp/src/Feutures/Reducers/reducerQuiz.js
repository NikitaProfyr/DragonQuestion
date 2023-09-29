
export const GET_QUIZ = 'GET_QUIZ'

const stateQuiz = {
    quiz: []
}


export const reducerQuiz = (state = stateQuiz, action) => {
    const {type, payload} = action

    switch(type){
        case GET_QUIZ:
            return {...state, quiz: payload}
        default:
            return state
    }

}