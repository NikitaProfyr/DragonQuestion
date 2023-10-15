import { QuizService } from "../../Services/QuizService"
import { GET_CURRENT_QUIZ, GET_QUIZ } from "../Reducers/reducerQuiz"

 


export const getQuizAction = async (dispatch) => {
    const data = await QuizService.getQuiz()
    dispatch({type: GET_QUIZ, payload: data})
}

export const getCurrentQuiz = async (idQuiz, dispatch) => {
    const data = await QuizService.getCurrentQuiz(idQuiz)
    dispatch({type: GET_CURRENT_QUIZ, payload: data})
}