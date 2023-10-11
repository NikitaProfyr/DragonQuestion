import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizAction } from '../../Feutures/Actions/actionQuiz'
import Row from 'react-bootstrap/Row'

import './quiz-list.css'
import DraconImg from '../../image/drakonEgor.png'
 
import { QuizService } from '../../Services/QuizService'
import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'
import { Container } from 'react-bootstrap'



const QuizList = () => {
  const quiz = useSelector(state => state.reducerQuiz.quiz)
  const dispatch = useDispatch()
  
  useEffect(() => {
    getQuizAction(dispatch)
   
  },[])

  return (
    <div className="bg-quiz-list">
      <div className="wrapper">
        {/* <Container fluid> */}
          <div className="quiz-list" style={{paddingTop:'20px'}}>
            <Row>
              {quiz.map((item) => (
                <CurrentQuiz key={item.id} props={item} />)
              )}
            </Row>  
          </div>  
        {/* </Container>  */}
      </div>
    </div>
  )
}

export default QuizList