import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { gedQuizAction } from '../../Feutures/Actions/actionQuiz'

import DraconImg from '../../image/drakonEgor.png'

const QuizList = () => {
  const quiz = useSelector(state => state.reducerQuiz.quiz)
  const dispatch = useDispatch()
  gedQuizAction(dispatch)
  console.log(quiz);

  return (
    <div className="bg-container">
      <img src={ DraconImg } alt="" className="draconImg" />
      <div className="wrapper">
        <div className="contentBlockQuiz">

        </div>
      </div>
    </div>
  )
}

export default QuizList