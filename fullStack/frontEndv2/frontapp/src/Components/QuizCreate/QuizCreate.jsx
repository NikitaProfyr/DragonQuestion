import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Carousel from 'react-bootstrap/Carousel';


import './quiz-create.css'
 

const QuizCreate = () => {
  const quiz = useSelector(state => state.reducerQuiz.createQuiz)
  console.log(quiz);
  return (
        <div className="bg-create-quiz">
            <div className="container">
                <form className='py-5 d-flex flex-column w-100'>             
                      <div className="d-flex flex-column test">
                          <input type="text" />
                          <input type="text" />
                          <input type="file" accept="image/*" />
                          <Carousel className='w-100' interval={null}>
                        {quiz.question.map((item) => (
                          <Carousel.Item>
                              <h2>huy</h2>
                              <h2>huy</h2>
                              <h2>huy</h2>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                      </div>
                      <button>Добавить вопрос</button>
                </form>
            </div>
        </div>
    )
}

export default QuizCreate