import React from 'react'
import { useState } from 'react'

const CurrentQuiz = (props) => {
  const [quiz, setQuiz] = useState(props)
  
  return (
    <div>{quiz.title}</div>
  )
}

export default CurrentQuiz