import './current-quiz.css'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import Tilt from 'react-vanilla-tilt'

// const CurrentQuizUser = ({props}) => {
//     const [quiz, setQuiz] = useState(props)

//     return  (    
//       <Tilt className="current-quiz-xxxtentacion" options={{ scale: 2, speed: 1000, max: 60 }} style = {{}}>
//         <Link 
//         to={ROUTES.QUIZ_USER_DETAIL + `/${quiz.id}`} 
//         className="d-flex flex-column h-100 current-quiz"
//       >
//         <img className='current-quiz-img' src={"http://127.0.0.1:8000/quiz-public/image/?urlImage=" + quiz.image} alt="" />
//         <p className='title-quiz m-0 text-break'>{quiz.title}</p>
//         <p className='title-description m-0 fw-bold text-break'>{quiz.description}</p>
//       </Link>
//       </Tilt>   
//     )
// }

const CurrentQuizUser = ({props}) => {

  return  (    
    <Tilt className="current-quiz-xxxtentacion" options={{ scale: 2, speed: 1000, max: 60 }} style = {{}}>
      <Link 
      to={ROUTES.QUIZ_USER_DETAIL + `/${props.id}`} 
      className="d-flex flex-column h-100 current-quiz"
    >
      <img className='current-quiz-img' src={"http://127.0.0.1:8000/quiz-public/image/?urlImage=" + props.image} alt="" />
      <p className='title-quiz m-0 text-break'>{props.title}</p>
      <p className='title-description m-0 fw-bold text-break'>{props.description}</p>
    </Link>
    </Tilt>   
  )
}

export default CurrentQuizUser