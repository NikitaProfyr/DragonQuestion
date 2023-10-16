import Api from "../Http";

export class QuizService{
    static getQuiz = async () => {
        const {data} = await Api.get('quiz/getquiz')
        return data
    }
    static getCurrentQuiz = async (idQuiz) => {
        const {data} = await Api.get(`quiz/getquiz/${idQuiz}`)
        return data
    }
    static getUserQuiz = async (idUser) => {
        const {data} = await Api.get(`/quiz/getquiz/user/${idUser}`)
        .catch(() => ({}))
        return data
    }
}