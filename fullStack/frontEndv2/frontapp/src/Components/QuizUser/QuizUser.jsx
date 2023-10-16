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
    },[])
    
    useEffect(() => {
        setIsLoading(false)
    }, [quiz])

    return (
        <div className="bg-quiz-user">
            <div className="wrapper">
                <div className="d-flex justify-content-lg-between">
                    <div className="left-content float-start">
                    
                        <div className='mt-4'>
                            <ListGroup className="list" style={{cursor:"pointer", }}>
                                <ListGroup.Item action href="#">Мои опросы</ListGroup.Item>
                                <ListGroup.Item action href="#1">Пройденные опросы</ListGroup.Item>
                                <ListGroup.Item action href="#2">Создать опрос</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>   
                    
                    <div className='right-content float-end'>
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
                
                <div className="pagination-content d-flex align-items-center justify-content-center">
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
        </div>
  )
}

export default QuizUser