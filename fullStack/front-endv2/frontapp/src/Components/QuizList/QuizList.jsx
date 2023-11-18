import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizAction } from '../../Feutures/Actions/actionQuiz'

import './quiz-list.css'

import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'


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
            <div className='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4'>
              <CurrentQuiz key={item.id} props={item} />
            </div>)
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizList