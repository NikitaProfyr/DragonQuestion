import { QuizService } from "../../Services/QuizService"
import { GET_QUIZ } from "../Reducers/reducerQuiz"

 


export const getQuizAction = async (dispatch) => {
    const data = await QuizService.getQuiz()
    dispatch({type: GET_QUIZ, payload: data})
}