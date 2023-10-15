import React from 'react'
import { useSelector } from 'react-redux'
import {Container} from 'react-bootstrap'

import './quiz-detail.css'

const QuizDetail = () => {
  const quiz = useSelector(state => state.reducerQuiz.currentQuiz)
  console.log(quiz);
  return (
    <div className="bg-quiz-detail">
      <div className="wrapper">
        <Container fluid className='d-flex justify-content-beetwen'>
          <div className="left-content">
            <h3>{quiz.title}</h3>
            <h4>{quiz.description}</h4>
            <h4>Количество вопросов: {quiz.question.length}</h4>
          </div>
          <div className="right-content">

          </div>
        </Container>
      </div>
    </div>
  )
}

export default QuizDetail