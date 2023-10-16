import React from 'react'
import { Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap'
import { ROUTES } from '../../utils/routes'
import { useDispatch, useSelector } from 'react-redux'

import './quiz-user.css'
import { useEffect } from 'react'
import { getUserQuiz } from '../../Feutures/Actions/actionQuiz'
import { useState } from 'react'
import CurrentQuiz from '../CurrentQuiz/CurrentQuiz'



const QuizUser = () => {
    const user = useSelector(state => state.reducerUser.userInfo)
    const quiz = useSelector(state => state.reducerQuiz.quizUser) 
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()
    console.log(quiz);
    
    useEffect(() => {
        getUserQuiz(user.id, dispatch)
    },[])
    
    useEffect(() => {
        setIsLoading(false)
    }, [quiz])

    return (
        <div className="bg-quiz-user">
            <div className="wrapper">
                <div className="d-flex justify-content-lg-between">
                    <div className="left-content">
                        <div className='mt-4'>
                            <ListGroup className="list" style={{cursor:"pointer", }}>
                                <ListGroup.Item action href="#">Мои опросы</ListGroup.Item>
                                <ListGroup.Item action href="#1">Пройденные опросы</ListGroup.Item>
                                <ListGroup.Item action href="#2">Создать опрос</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>   
                    <div className=''>
                        {quiz === null ?
                            <div>вопросов нет</div>
                            :
                            <>
                                {isLoading ?
                                <div><Spinner></Spinner></div>
                                :
                                <Row className='d-flex justify-content-lg-between'>{quiz.map((item) => (<CurrentQuiz key={item.id} props={item}></CurrentQuiz>))}</Row>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default QuizUser