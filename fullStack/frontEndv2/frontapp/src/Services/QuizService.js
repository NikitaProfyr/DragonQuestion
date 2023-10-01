import Api from "../Http";

export class QuizService{
    static getQuiz = async () => {
        const {data} = await Api.get('quiz/getquiz')
        // console.log(data);
        return data
    }
}