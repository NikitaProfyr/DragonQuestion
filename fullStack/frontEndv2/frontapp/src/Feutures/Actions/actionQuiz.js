import { QuizService } from "../../Services/QuizService"
import { GET_QUIZ } from "../Reducers/reducerQuiz"

 


export const getQuizAction = (dispatch) => {
    return QuizService.getQuiz()
    .then(response => {
        dispatch({type: GET_QUIZ, payload: response.data})
        return Promise.resolve()
    })
}