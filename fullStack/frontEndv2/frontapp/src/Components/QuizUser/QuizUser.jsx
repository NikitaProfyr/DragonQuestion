import React from 'react'
import { Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'

import './quiz-user.css'
import { useEffect } from 'react'
import { getUserQuiz } from '../../Feutures/Actions/actionQuiz'
import { useState } from 'react'
import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'
import Pagination from 'react-bootstrap/Pagination';



const QuizUser = () => {
  const user = useSelector(state => state.reducerUser.userInfo)
  const quiz = useSelector(state => state.reducerQuiz.quizUser)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  console.log(quiz);

  useEffect(() => {
    getUserQuiz(user.id, dispatch)
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [quiz])

  return (
    <div className="bg-quiz-user">


      <div className="container py-3">
        <div className="row">
          <div className="col-lg-3 col-12 mb-4">
            <ListGroup className="list" style={{ cursor: "pointer", }}>
              <ListGroup.Item action href="#">Мои опросы</ListGroup.Item>
              <ListGroup.Item action href="#1">Пройденные опросы</ListGroup.Item>
              <ListGroup.Item action href="#2">Создать опрос</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-lg-9 col-12">
            <div className="row">
              {quiz === null ?
                <div className='col-12'>вопросов нет</div>
                :
                <>
                  {isLoading ?
                    <div><Spinner></Spinner></div>
                    :
                    <>{quiz.map((item) => (
                      <div className='col-md-4 col-xl-3 col-6 mb-4'>
                        <CurrentQuiz key={item.id} props={item}></CurrentQuiz>
                      </div>
                    ))}</>
                  }
                </>
              }
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default QuizUser