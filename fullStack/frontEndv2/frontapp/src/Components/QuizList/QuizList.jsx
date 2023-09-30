import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizAction } from '../../Feutures/Actions/actionQuiz'

import DraconImg from '../../image/drakonEgor.png'
import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'



const QuizList = () => {
  // const quiz = useSelector(state => state.reducerQuiz.quiz)
  // const dispatch = useDispatch()
  const [quizState, setQuizState] = useState([
    {
      "id": 5,
      "title": "FAST API",
      "description": "пройди самый пиздатый тест",
      "image": "/test/test/eblan.png",
      "question": [
        {
          "id": 3,
          "title": "Ты еблан?",
          "answer": [
            {
              "id": 1,
              "title": "да",
              "right": true
            },
            {
              "id": 2,
              "title": "нет",
              "right": false
            }
          ]
        },
        {
          "id": 4,
          "title": "Ты Егор?",
          "answer": [
            {
              "id": 3,
              "title": "да",
              "right": true
            },
            {
              "id": 4,
              "title": "нет",
              "right": false
            }
          ]
        }
      ]
    },
    {
      "id": 9,
      "title": "Django",
      "description": "string",
      "image": "string",
      "question": [
        {
          "id": 7,
          "title": "123123",
          "answer": [
            {
              "id": 6,
              "title": "123123",
              "right": true
            }
          ]
        }
      ]
    }
  ])
  
   

  return (
    <div className="bg-container">
      <img src={ DraconImg } alt="" className="draconImg" />
      <div className="wrapper">
        <div className="contentBlockQuiz">
          {quizState.map((item) => {
            <>
              <h1>{item.title}</h1>
              <h2>{item.description}</h2>
              {console.log(item)}
            </>
          })}
        </div>
      </div>
    </div>
  )
}

export default QuizList