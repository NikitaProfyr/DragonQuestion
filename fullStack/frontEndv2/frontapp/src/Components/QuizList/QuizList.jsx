import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizAction } from '../../Feutures/Actions/actionQuiz'

import DraconImg from '../../image/drakonEgor.png'
import { QuizService } from '../../Services/QuizService'
import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'



const QuizList = () => {
  const quiz = useSelector(state => state.reducerQuiz.quiz)
  const dispatch = useDispatch()
  
  
  useEffect(() => {
    getQuizAction(dispatch)
   
  },[])

  return (
    <div className="bg-container">
      <img src={ DraconImg } alt="" className="draconImg" />
      <div className="wrapper">
        <div className="contentBlockQuiz">
          {quiz.map((item) => (<div>{item.title}</div>))}
        </div>
      </div>
    </div>
  )
}

export default QuizList