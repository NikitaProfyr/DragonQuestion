import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCurrentQuiz } from '../../Feutures/Actions/actionQuiz'
import CarouselForm from './CarouselForm'
import { Spinner } from 'react-bootstrap'

const QuizUpdate = () => {
    const [isLoading, setIsLoading] = useState(true)
    const quiz = useSelector(state => state.reducerQuiz.currentQuiz)
    const param = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        getCurrentQuiz(param.id, dispatch)
    },[])

    useEffect(() => {
        setIsLoading(false)
    },[quiz])
    
    return (
        <div className="container">
            {isLoading === true ? <><Spinner></Spinner></> : <><CarouselForm props={quiz}/></>}
            {/* <CarouselForm props={quiz}/> */}
        </div>
    )
}

export default QuizUpdate