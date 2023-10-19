import './current-quiz.css'
import CurrentQuizDragon from '../../image/currentQuizDragon.png'
import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'
import Tilt from 'react-vanilla-tilt'

const CurrentQuizUser = ({props}) => {
    const [quiz, setQuiz] = useState(props)
    
    return (    
      <Tilt options={{ scale: 2, speed: 1000, max: 60 }} style = {{}}>
        <Link 
        to={ROUTES.QUIZ_USER_DETAIL + `/${quiz.id}`} 
        className="d-flex flex-column h-100 current-quiz"
      >
        <img className='current-quiz-img' src={CurrentQuizDragon} alt="" />
        <p className='title-quiz text-break'>{quiz.title}</p>
        <p className='title-description fw-bold text-break'>{quiz.description}</p>
      </Link>
      </Tilt>
      
    )
}

export default CurrentQuizUser