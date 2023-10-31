import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Spinner } from 'react-bootstrap'

import './quiz-detail.css'
import { useEffect, useState } from 'react'

import drakon from '../../image/currentQuizDragon.png'
import { Link, useParams } from 'react-router-dom'
import { getCurrentQuiz } from '../../Feutures/Actions/actionQuiz'
import { ROUTES } from '../../utils/routes'

const QuizDetail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const quiz = useSelector(state => state.reducerQuiz.currentQuiz)
  const param = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentQuiz(param.id, dispatch)
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [quiz])

  console.log(quiz);

  return (
    <div className="bg-quiz-detail">

      <div className='container'>
        {isLoading ?
          <Spinner></Spinner>
          :
          <>
            <div className="row">
              <div className="left-content mt-5 col-md-6 col-12">
                <h3>{quiz.title}</h3>
                <h4>{quiz.description}</h4>
                <h4>Количество вопросов: quiz.question.length</h4>
              </div>
              <div className="right-content mt-5 col-md-6 col-12">
                <div className="img-block">
                  <img className='rounded' src={"http://127.0.0.1:8000/quiz/image/?urlImage=" + quiz.image} width="100%" alt="" />
                  <Link className='text-decoration-none' to={ROUTES.QUIZ_GAME + `/${quiz.id}`}> <button className='d-block w-100 quizButton'>Пройти тест</button> </Link>
                </div>
              </div>
            </div>
          </>
        }

      </div>

    </div>
  )
}

export default QuizDetail