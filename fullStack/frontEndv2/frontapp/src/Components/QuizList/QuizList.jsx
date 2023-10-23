import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizAction } from '../../Feutures/Actions/actionQuiz'
import Row from 'react-bootstrap/Row'

import './quiz-list.css'
import DraconImg from '../../image/drakonEgor.png'

import { QuizService } from '../../Services/QuizService'
import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'
import { Container } from 'react-bootstrap'



const QuizList = () => {
  const quiz = useSelector(state => state.reducerQuiz.quiz)
  const dispatch = useDispatch()

  useEffect(() => {
    getQuizAction(dispatch)

  }, [])

  return (
    <div className="bg-quiz-list overflow-hidden">
      <div className="container">
        <div className='row py-4'>
          {quiz.map((item) => (
            <div className='col-md-4 col-sm-6 col-lg-4 col-xl-3 mb-4'>
              <CurrentQuiz key={item.id} props={item} />
            </div>)
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizList