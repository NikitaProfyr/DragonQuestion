import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizAction } from '../../Feutures/Actions/actionQuiz'
import './quiz-list.css'
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
    <div className="bg-quiz-list">
      <div className="wrapper">
        {quiz.map((item) => (<CurrentQuiz key={item.id} props={item} />))}
      </div>
    </div>
  )
}

export default QuizList