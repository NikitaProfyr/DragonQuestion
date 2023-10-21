import { Alert } from "bootstrap";
import Api from "../Http";

export class QuizService {
    static getQuiz = async () => {
        const { data } = await Api.get('quiz/getquiz')
        return data
    }
    static getCurrentQuiz = async (idQuiz) => {
        const { data } = await Api.get(`quiz/getquiz/${idQuiz}`)
        return data
    }
    static getUserQuiz = async (idUser) => {
        const { data } = await Api.get(`/quiz/getquiz/user/${idUser}`)
            .catch(() => ({}))
        return data
    }
    static createQuiz = (quiz, userId) => {
        console.log(quiz);  
        // console.log(userId);
        // console.log();
        return Api.post('/quiz/createquiz',
            {
                quiz: quiz,
                userId: {
                    id: userId
                }
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data;'
                }
            }
        )
    }
}


export const validationQuiz = (quiz) => {
    let cheack = true

    // if(quiz.title === "" || quiz.description === "") {
    //     cheack = false
    // }
    // quiz.question.map((item) => {
    //     if(item.title === "" ) {
    //         console.log(Object.size(item.answer))
    //         cheack = false
    //     };
    //     item.answer.map((itemAnswer) => {
    //         if(itemAnswer.title === ""){
    //             cheack = false
    //         };
    //     })
    // })
    return cheack

}