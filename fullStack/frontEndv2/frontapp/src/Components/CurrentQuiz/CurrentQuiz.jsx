import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'
import Tilt from 'react-vanilla-tilt'
 
import './current-quiz.css'
import CurrentQuizDragon from '../../image/currentQuizDragon.png'
import { QuizService } from '../../Services/QuizService'



const CurrentQuiz = ({ props }) => {
  const [quiz, setQuiz] = useState(props)
  return (
    <Tilt className="current-quiz-xxxtentacion" style = {{}}>
      <Link
      to={ROUTES.QUIZ_CURRENT + `/${quiz.id}`}
      className="d-flex flex-column h-100 current-quiz"
    >
      <img className='current-quiz-img' src={"http://127.0.0.1:8000/quiz-public/image/?urlImage=" + quiz.image} alt="ИЗОБРАЖЕНИЕ ДРАКОНА" />
      <p className='title-quiz m-0 text-break'>{quiz.title}</p>
      <p className='title-description m-0 text-break'>{quiz.description}</p>
      </Link>
    </Tilt>
  )
}

export default CurrentQuiz