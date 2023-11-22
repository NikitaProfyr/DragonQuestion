import Api from "../Http";

export class QuizService {
    static getQuiz = async (page, size) => {
        const { data } = await Api.get(`quiz/getquiz?page=${page}&size=${size}`)
        return data
    }
    static getCurrentQuiz = async (idQuiz) => {
        const { data } = await Api.get(`quiz/getquiz/${idQuiz}`)
        return data
    }
    static getUserQuiz = async (idUser, page, size) => {
        const { data } = await Api.get(`/quiz/getquiz/user/${idUser}?page=${page}&size=${size}`)
            .catch(() => ({}))
        return data
    }
    static createQuiz = (quiz, userId) => {
        console.log(quiz);  
        console.log(userId);  
        // console.log(userId);
        // console.log(JSON.stringify({quiz: quiz, userId:{id: userId}}));

        return Api.post('/quiz/createquiz',{
            quizData: quiz,
            userId:{id: userId},
        },
        )
    }
    static delQuiz = async (quiz, idUser) => {
        return await Api.delete(`/quiz/deletequiz/?quizData=${quiz}&idUser=${idUser}`
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
        // console.log(`/quiz/image/${imgUrl}`);
        const data = await Api.get(`/quiz/image/?urlImage=${imgUrl}`)
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
    static createQuizResults = async (userId, quizId, result) => {
        return await Api.post(`/quiz/create-result?userId=${userId}&quizId=${quizId}&result=${result}` 
        )
    }
    static getQuizResultsUser = async (userId, page, size) => {
        const {data} = await Api.get(`/quiz/result?idUser=${userId}&page=${page}&size=${size}`)
        return data
    }
}
    