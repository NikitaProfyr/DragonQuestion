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
        console.log(userId);  
        // console.log(userId);
        // console.log(JSON.stringify({quiz: quiz, userId:{id: userId}}));

        return Api.post('/quiz/createquiz',{
            quiz: quiz,
            userId:{id: userId},
        },
        )
    }
    static delQuiz = async (quiz, idUser) => {
        return await Api.delete("/quiz/deletequiz/" + `?quizData=${quiz}&idUser=${idUser}`
        )
    }
    static createImageQuiz = async (image) => {
        console.log(image);
        const data = await Api.post('/quiz/download/image', image, {headers:{'Content-type':'multipart/form-data'}})
        .catch(
            (error) => {console.log(error);}
        )
        return data.data
    }
    static getImage = async (imgUrl) => {
        console.log(`/quiz/image/${imgUrl}`);
        const data = await Api.get(`/quiz/image/?urlImage=` + imgUrl)
        console.log(data);
        return data
        .catch(() => {
            return '../../image/currentQuizDragon.png'
        })
    } 
    static updateCurrentQuiz = async (quiz) => {
        console.log(quiz);
        return await Api.put('/quiz/updatequiz/', quiz)
    }
    static updateImage = async(formdata) => {
        console.log(formdata.get('quizId'));
        console.log(formdata.get('image'));
        const data = await Api.put('/quiz/update/image', formdata, {headers:{'Content-type':'multipart/form-data'}})
        .catch(
            (error) => {console.log(error);}
        )
        return data.data
    }


}
    