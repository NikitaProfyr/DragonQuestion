import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Container, Spinner} from 'react-bootstrap'

import './quiz-detail.css'
import { useEffect, useState } from 'react'

import drakon from '../../image/currentQuizDragon.png'
import { useParams } from 'react-router-dom'
import { getCurrentQuiz } from '../../Feutures/Actions/actionQuiz'

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
      <div className="wrapper">
        <Container fluid className='d-flex justify-content-between'>
          {isLoading ? 
            <Spinner></Spinner>
          :
          <>
          <div className="left-content">
            <h3>{quiz.title}</h3>
            <h4>{quiz.description}</h4>
            <h4>Количество вопросов: quiz.question.length</h4>
          </div>
          <div className="right-content">
            <div className="img-block">
              <img src={"http://127.0.0.1:8000/quiz/image/?urlImage=" + quiz.image} height="200px" alt="" />
              <Button className='d-block w-100 quizButton'>Пройти тест</Button>
            </div>
          </div>
          </>
          }
          
        </Container>
      </div>
    </div>
  )
}

export default QuizDetail