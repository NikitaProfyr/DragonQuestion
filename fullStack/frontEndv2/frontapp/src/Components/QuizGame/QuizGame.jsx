import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getCurrentQuiz } from '../../Feutures/Actions/actionQuiz'
import { ROUTES } from '../../utils/routes'

import './quiz-game.css'

const QuizGame = () => {
    const [isLoading, setIsLoading] = useState(true)
    const param = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.reducerUser.userInfo)
    const quiz = useSelector(state => state.reducerQuiz.currentQuiz)
    const dispatch = useDispatch()
    const [step, setStep] = useState(0)
    const [answerUser, setRightAnswerCount] = useState(0)

    useEffect(() => {
        getCurrentQuiz(param.id, dispatch)
    },[])

    useEffect(() => {
        setIsLoading(false)
    }, [quiz])

    const onClickAnswer = (answer) => {
        // console.log(quiz.question.length)
        console.log(answer.right);
        if(answer.right === true){
            console.log(answer)
        }
        if(step === quiz.question.length -1){
            alert(`тест пройден, кол-во правильных ответов:${rightAnswerCount}`)
            return navigate(ROUTES.QUIZ_LIST)
        }
        // setStep(step + 1)
    }

    return (
        <>
        {isLoading === true ? <Spinner></Spinner>
        :
        <div className="container">
            <h2>{quiz.title}</h2>
            <div className="numbers-quiz d-flex justify-content-center align-items-center">
                {quiz.question.map((item, index) => {
                    return <div onClick={() => (setStep(index))} key={index} className="question-number-item mx-2">{index + 1}</div>
                })}
            </div>
            <div className="">
                <h2>{quiz.question[step].title}</h2>
                {quiz.question[step].answer.map((item, index) => (
                    <li key={index} onClick={() => (onClickAnswer(item))}>{item.title}</li>
                ))}
            </div>
        </div>
        }
        </>
    )
}

export default QuizGame