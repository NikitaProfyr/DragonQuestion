import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizAction } from '../../Feutures/Actions/actionQuiz'

import './quiz-list.css'

import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'


const QuizList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const quiz = useSelector(state => state.reducerQuiz.quiz)
  const dispatch = useDispatch()
  console.log(quiz[0]);

  useEffect(() => {
    setIsLoading(false)
  }, [quiz])

  useEffect(() => {
    // dispatch(getQuizAction(1, 4))
    getQuizAction(dispatch, 1, 4)
  }, [])

  return (
    <>
    <div className="bg-quiz-list overflow-hidden">
        <div className="container">
          <div className='row py-4'>
            {quiz[0].items.map((item, index) => (
              <div className='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4'>
                <CurrentQuiz key={index} props={item} />
              </div>)
            )}
          </div>
        </div>
      </div>  
    </>
  )
}

export default QuizList