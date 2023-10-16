import { QuizService } from "../../Services/QuizService"

export const GET_QUIZ = 'GET_QUIZ'
export const GET_CURRENT_QUIZ = 'GET_QURRENT_QUIZ'
export const GET_QUIZ_USER = 'GET_QUIZ_USER'

const stateQuiz = {
    quiz: [],
    quizUser: [],
    currentQuiz: {},
}


export const reducerQuiz = (state = stateQuiz, action) => {
    const {type, payload} = action

    switch(type){
        case GET_QUIZ_USER:
            return {...state, quizUser: payload}
        case GET_QUIZ:
            return {...state, quiz: [...payload]}
        case GET_CURRENT_QUIZ:
            return {...state, currentQuiz: payload}
        default:
            return state
    }

}