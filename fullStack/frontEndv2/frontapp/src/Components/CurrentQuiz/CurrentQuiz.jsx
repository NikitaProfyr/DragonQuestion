import React from 'react'
import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import './current-quiz.css'
import CurrentQuizDragon from '../../image/currentQuizDragon.png'

const CurrentQuiz = ({props}) => {
  const [quiz, setQuiz] = useState(props)
  console.log(quiz);
  
  return (  
    <Col >
      <Card className='current-quiz'>
        <Card.Img className='current-quiz-img' variant='top' src={CurrentQuizDragon} alt='ДРАКОН' />
        <Card.Body>
          <Card.Title><Link to={ROUTES.QUIZ_CURRENT + `/${quiz.id}`}>{quiz.title}</Link></Card.Title>
          <Card.Text>{quiz.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>  
  )
}

export default CurrentQuiz