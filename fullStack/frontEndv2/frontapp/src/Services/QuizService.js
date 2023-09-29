import Api from "../Http";

export class QuizService{
    static getQuiz = () => {
        return Api.get('quiz/getquiz')
        .then(response => {
            return Promise.resolve(response)
        })
    }
}