import React from 'react'
import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'

import './current-quiz.css'
import CurrentQuizDragon from '../../image/currentQuizDragon.png'
import { getCurrentQuiz } from '../../Feutures/Actions/actionQuiz'

const CurrentQuiz = ({props}) => {
  const [quiz, setQuiz] = useState(props)
  const dispatch = useDispatch()
  
  const setCurrentQuiz = (idQuiz) => {
    getCurrentQuiz(idQuiz, dispatch)
  }

  return (    
      <Card className='current-quiz'>
        <Card.Img className='current-quiz-img' variant='top' src={CurrentQuizDragon} alt='ДРАКОН' />
        <Card.Body>
          <Card.Title><Link onClick={() => (setCurrentQuiz(quiz.id))} to={ROUTES.QUIZ_CURRENT + `/${quiz.id}`}>{quiz.title}</Link></Card.Title>
          <Card.Text>{quiz.description}</Card.Text>
        </Card.Body>
      </Card>  
  )
}

export default CurrentQuiz