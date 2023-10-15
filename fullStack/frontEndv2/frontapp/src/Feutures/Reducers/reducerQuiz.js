import { QuizService } from "../../Services/QuizService"

export const GET_QUIZ = 'GET_QUIZ'
export const GET_CURRENT_QUIZ = 'GET_QURRENT_QUIZ'

const stateQuiz = {
    quiz: [],
    currentQuiz: {},
}


export const reducerQuiz = (state = stateQuiz, action) => {
    const {type, payload} = action

    switch(type){
        case GET_QUIZ:
            return {...state, quiz: [...payload]}
        case GET_CURRENT_QUIZ:
            return {...state, currentQuiz: payload}
        default:
            return state
    }

}