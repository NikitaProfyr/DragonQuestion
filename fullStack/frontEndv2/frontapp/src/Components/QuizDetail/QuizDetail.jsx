import React from 'react'
import { useSelector } from 'react-redux'
import {Button, Container} from 'react-bootstrap'

import './quiz-detail.css'
import { useEffect } from 'react'

import drakon from '../../image/currentQuizDragon.png'

const QuizDetail = () => {
  const quiz = useSelector(state => state.reducerQuiz.currentQuiz)
  console.log(quiz);

  return (
    <div className="bg-quiz-detail">
      <div className="wrapper">
        <Container fluid className='d-flex justify-content-between'>
          <div className="left-content">
            <h3>{quiz.title}</h3>
            <h4>{quiz.description}</h4>
            <h4>Количество вопросов: quiz.question.length</h4>
          </div>
          <div className="right-content">
            <div className="img-block">
              <img src={drakon} alt="" />
              <Button className='d-block w-100 quizButton'>Пройти тест</Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default QuizDetail