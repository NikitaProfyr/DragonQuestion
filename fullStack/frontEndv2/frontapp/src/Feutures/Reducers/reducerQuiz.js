import { QuizService } from "../../Services/QuizService"

export const GET_QUIZ = 'GET_QUIZ'

const quizQuery = QuizService.getQuiz().then(response => Promise.resolve(response.data))

const stateQuiz = {
    quiz: quizQuery
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