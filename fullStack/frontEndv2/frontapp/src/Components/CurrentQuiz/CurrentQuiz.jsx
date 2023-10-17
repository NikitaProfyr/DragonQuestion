import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'

import './current-quiz.css'
import CurrentQuizDragon from '../../image/currentQuizDragon.png'


const CurrentQuiz = ({props}) => {
  const [quiz, setQuiz] = useState(props)
  
  return (    
    
    <Link 
      to={ROUTES.QUIZ_CURRENT + `/${quiz.id}`} 
      className="d-flex flex-column h-100 current-quiz"
    >
      <img className='current-quiz-img' src={CurrentQuizDragon} alt="" />
      <p className='title fs-5 fw-bold text-break'>{quiz.title}</p>
      <p className='fs-5 fw-bold text-break'>{quiz.description}</p>
    </Link>
  )
}

export default CurrentQuiz