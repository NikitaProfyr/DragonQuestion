import { QuizService } from "../../Services/QuizService"
import { GET_CURRENT_QUIZ, GET_QUIZ, GET_QUIZ_USER } from "../Reducers/reducerQuiz"

 


export const getQuizAction = async (dispatch) => {
    const data = await QuizService.getQuiz()
    dispatch({type: GET_QUIZ, payload: data})
}

export const getCurrentQuiz = async (idQuiz, dispatch) => {
    const data = await QuizService.getCurrentQuiz(idQuiz)
    dispatch({type: GET_CURRENT_QUIZ, payload: data})
}

export const getUserQuiz = async (idUser, dispatch) => {
    const data = await QuizService.getUserQuiz(idUser)
    dispatch({type: GET_QUIZ_USER, payload: data})
}