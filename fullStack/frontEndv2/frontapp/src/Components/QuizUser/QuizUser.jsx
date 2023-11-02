import React from 'react'
import { ListGroup, Spinner, Tab } from 'react-bootstrap'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'

import './quiz-user.css'
import { useEffect } from 'react'
import { getQuizResultAction, getUserQuiz, setBaseCurrentQuiz } from '../../Feutures/Actions/actionQuiz'
import { useState } from 'react'
import CurrentQuizUser from '../CurrentQuiz/CurrentQuizUser'
import { QuizService } from '../../Services/QuizService'
import CurrentQuizResult from '../CurrentQuiz/CurrentQuizResult'




const QuizUser = () => {
  const user = useSelector(state => state.reducerUser.userInfo)
  const quiz = useSelector(state => state.reducerQuiz.quizUser)
  const quizResults = useSelector(state => state.reducerQuiz.quizResults)
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()
  console.log(quizResults);

  useEffect(() => {
    dispatch(setBaseCurrentQuiz())
    getQuizResultAction(user.id, dispatch)
    getUserQuiz(user.id, dispatch)
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [quiz, quizResults])

  return (
    <div className="bg-quiz-user">
      <div className="container py-5">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#user-quiz">
          <div className="row">
            <div className="col-lg-3 col-12 mb-4">

              <ListGroup className="list" style={{ cursor: "pointer", }}>
                <ListGroup.Item action href="#user-quiz">Мои опросы</ListGroup.Item>
                <ListGroup.Item action href="#result-quiz">Пройденные опросы</ListGroup.Item>
                <ListGroup.Item action href={ROUTES.QUIZ_CREATE}>Создать опрос</ListGroup.Item>
              </ListGroup>
            </div>
            <div className="col-lg-9 col-12">
              <Tab.Content>
                <Tab.Pane eventKey="#user-quiz">
                  <div className="row">
                    {quiz === null ?
                      <div className='col-12'>вопросов нет</div>
                      :
                      <>
                        {isLoading ?
                          <div><Spinner></Spinner></div>
                          :
                          <>{quiz.map((item) => (
                            <div className='col-md-6 col-xl-4 col-12 mb-4'>
                              <CurrentQuizUser key={item.id} props={item}></CurrentQuizUser>
                            </div>
                          ))}</>
                        }
                      </>
                    }
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#result-quiz">
                <div className="row">
                    {quizResults === null ?
                      <div className='col-12'>нет пройденных опросов</div>
                      :
                      <>
                        {isLoading ?
                          <div><Spinner></Spinner></div>
                          :
                          <>{quizResults.map((item) => (
                            <div className='col-md-6 col-xl-4 col-12 mb-4'>
                              <CurrentQuizResult key={item.id} props={item}></CurrentQuizResult>
                            </div>
                          ))}</>
                        }
                      </>
                    }
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </div>
    </div>
  )
}

export default QuizUser