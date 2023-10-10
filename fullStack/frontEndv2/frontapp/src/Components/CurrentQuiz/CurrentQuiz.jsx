import React from 'react'
import { useState } from 'react'

const CurrentQuiz = (props) => {
  const [quiz, setQuiz] = useState(props)
   
  
  return (
    <>
      {console.log(quiz)}
      <h1>huy {quiz.item}</h1> 
    </>
  )
}

export default CurrentQuiz