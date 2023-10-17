import React from 'react'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCurrentQuiz } from '../../Feutures/Actions/actionQuiz'



const QuizUserDetail = () => {
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
        <Container>
            sdsd
        </Container>
    )
}

export default QuizUserDetail