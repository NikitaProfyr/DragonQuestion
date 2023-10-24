import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getCurrentQuiz } from '../../Feutures/Actions/actionQuiz'
import CarouselForm from './CarouselForm'
import { Spinner } from 'react-bootstrap'
import { addQuestionAction } from '../../Feutures/Actions/actionQuiz';
import { QuizService } from '../../Services/QuizService';
import Carousel from 'react-bootstrap/Carousel';
import galka from '../../image/icon300pn.png'
import cross from '../../image/cross13.png'
import './quiz-cud.css'
import { ROUTES } from '../../utils/routes'

const QuizUpdate = () => {
    const [isLoading, setIsLoading] = useState(true)
    const quiz = useSelector(state => state.reducerQuiz.currentQuiz)
    const param = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.reducerUser.userInfo)
    const [index, setIndex] = useState(quiz.question.length - 1)


    useEffect(() => {
        getCurrentQuiz(param.id, dispatch)
    }, [])

    useEffect(() => {
        setIsLoading(false)
        console.log(quiz)
    }, [quiz])

    const handleSubmit = (selectedIndex) => {
        setIndex(selectedIndex)
    }
    const addAnswer = (e, item) => {
        e.preventDefault()
        item.answer.push({
            title: "",
            right: false
        })
        dispatch(addQuestionAction(quiz))
    }
    const cheackAnswer = (item) => {
        item.right === true ?
            item.right = false :
            item.right = true
        dispatch(addQuestionAction(quiz))
    }
    const removeAnswer = (e, item, ansItem) => {
        e.preventDefault()
        const index = item.answer.indexOf(ansItem)
        delete item.answer[index]
        item.answer = item.answer.filter(element => element !== null)
        dispatch(addQuestionAction(quiz))
    }
    const addQuestion = (e) => {
        e.preventDefault()
        quiz.question.push({
            title: "",
            answer: []
        }
        )
        setIndex(quiz.question.length - 1)
        dispatch(addQuestionAction(quiz))
    }
    const removeQuestion = (e, item) => {
        e.preventDefault()
        if (quiz.question.length < 2) {
            return alert("опрос должен содержать минимум 1 опрос")
        }
        const index = quiz.question.indexOf(item)
        delete quiz.question[index]
        quiz.question = quiz.question.filter(item => item !== null)
        setIndex(quiz.question.length - 1)
        dispatch(addQuestionAction(quiz))

    }
    const addImage = (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        // quiz.image = formData.get('file')
        quiz.image = formData
        // console.log(formData.get('file'));
        // console.log(quiz.image);
        dispatch(addQuestionAction(quiz))
        // console.log(quiz);
    }
    const removeQuiz = (e) => {
        e.preventDefault()
        QuizService.delQuiz(quiz.id, user.id)
        return <Navigate to={ROUTES.QUIZ_LIST}/>
    }
    const addQuiz = async (e) => {
        e.preventDefault()

        console.log(quiz)
        dispatch(addQuestionAction(quiz))
        QuizService.createQuiz(quiz, user.id).catch((error) => {
            alert(error)
        })
    }



    return (
        <div className="bg-create-quiz">
            <div className="container">
                {isLoading === true ? <><Spinner></Spinner></> :
                    <form onSubmit={(e) => (addQuiz(e))} className='row col-12 py-5 create-quiz-content'>
                        <div className="d-flex col-4 flex-column form-create-quiz">
                            <input type="text" value={quiz.title} onChange={(e) => (quiz.title = e.target.value)} placeholder='Введите название опроса' />
                            <input type="text" value={quiz.description} onChange={(e) => (quiz.description = e.target.value)} placeholder='Введите описание' />
                            <label htmlFor="myfile" className="label">Выберите файл</label>
                            <input type="file" onChange={addImage} className="my" id="myfile" name="myfile" accept="image/*"></input>
                        </div>

                        <Carousel className='slederXXXTENTACION' activeIndex={index} onSelect={handleSubmit} interval={null}>
                            {quiz.question.map((item) => (
                                <Carousel.Item className=''>
                                    <div className="d-flex justify-content-center align-items-center content-in-slide">
                                        <div className="col-4 d-flex flex-column mx-5 in-slide-form-xxxtentacion">
                                            <input value={item.title} onChange={(e) => (item.title = e.target.value)} type="text" placeholder='Введите вопрос'></input>
                                            <button onClick={(e) => (addAnswer(e, item))}>Добавить ответ</button>
                                            <button onClick={(e) => (removeQuestion(e, item))}>Удалить вопрос</button>
                                        </div>
                                        <div className="col-4 d-flex flex-column">
                                            {item.answer.map((ansItem) => (
                                                ansItem.right === true ?
                                                    <div className="d-flex in-slide-form-lilpump active">
                                                        <div className="check-answer-icon active" onClick={() => (cheackAnswer(ansItem))}><img src={galka} height="30px" alt="" /></div>
                                                        <input value={ansItem.title} onChange={(e) => (ansItem.title = e.target.value)} type="text" placeholder='Введите описание'></input>
                                                        <div className="del-answer-icon">
                                                            <img onClick={(e) => (removeAnswer(e, item, ansItem))} src={cross} height="30px" alt="" />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="d-flex in-slide-form-lilpump">
                                                        <div className="check-answer-icon" onClick={() => (cheackAnswer(ansItem))}><img src={galka} height="30px" alt="" /></div>
                                                        <input value={ansItem.title} onChange={(e) => (ansItem.title = e.target.value)} type="text" placeholder='Введите описание'></input>
                                                        <div className="del-answer-icon">
                                                            <img onClick={(e) => (removeAnswer(e, item, ansItem))} src={cross} height="30px" alt="" />
                                                        </div>
                                                    </div>
                                            ))}
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className="buttons-group col-4">
                            <button onClick={addQuestion}>Добавить вопрос</button>
                            <button onClick={removeQuiz} >Удалить опрос</button>
                            <button>Сохранить изменения</button>
                        </div>

                    </form>
                }
                {/* <CarouselForm props={quiz}/> */}
            </div>
        </div>
    )
}

export default QuizUpdate