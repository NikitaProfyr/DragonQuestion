import React from 'react'
import { useSelector } from 'react-redux'

const QuizDetail = () => {
  const quiz = useSelector(state => state.reducerQuiz.currentQuiz)
  console.log(quiz);
  return (
    <div className="wrapper">
      test
    </div>
  )
}

export default QuizDetail