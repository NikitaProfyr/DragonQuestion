import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'
import Tilt from 'react-vanilla-tilt'
 
import './current-quiz.css'
import CurrentQuizDragon from '../../image/currentQuizDragon.png'
import { QuizService } from '../../Services/QuizService'

const CurrentQuizResult = ({ props }) => {
    const [quiz, setQuiz] = useState(props)

    return (
      <Tilt style = {{}}>
      <Link
      to={ROUTES.QUIZ_CURRENT + `/${quiz.quiz.id}`}
      className="d-flex flex-column h-100 current-quiz"
    >
      <img className='current-quiz-img' src={"http://127.0.0.1:8000/quiz/image/?urlImage=" + quiz.quiz.image} alt="ИЗОБРАЖЕНИЕ ДРАКОНА" />
      <p className='title-quiz m-0 text-break'>{quiz.quiz.title}</p>
      <p className='title-description m-0 text-break'>{quiz.quiz.description}</p>
      <div className="progress">
        <div className="progress-bar" style={{width:`${quiz.result}%`}} role="progressbar" aria-valuenow={quiz.result} aria-valuemin="0" aria-valuemax="100"></div>
        <div className="progress-result">{quiz.result}%</div>
      </div>
      </Link>
    </Tilt>
    )
}

export default CurrentQuizResult