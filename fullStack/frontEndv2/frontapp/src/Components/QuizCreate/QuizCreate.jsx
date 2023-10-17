import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Carousel from 'react-bootstrap/Carousel';


import './quiz-create.css'
import { addQuestionAction } from '../../Feutures/Actions/actionQuiz';


const QuizCreate = () => {
  const dispatch = useDispatch()
  const quiz = useSelector(state => state.reducerQuiz.createQuiz)
  const addQuestion = (e) => {
    e.preventDefault()
    quiz.question.push({
      title: ""
    }
    )
    dispatch(addQuestionAction(quiz))
    console.log(quiz);
  }
  console.log(quiz);
  return (
    <div className="bg-create-quiz">
      <div className="container">
        <form className='row py-5 create-quiz-content'>
          <div className="d-flex flex-column form-create-quiz">
            <input type="text" placeholder='Введите название опроса'/>
            <input type="text" placeholder='Введите описание'/>
            <label for="myfile" class="label">Выберите файлы</label>
            <input type="file" class="my" id="myfile" name="myfile" accept="image/*" multiple></input>
            {/* <input type="file" accept="image/*" className='input-file'/> */}
          </div>
          <Carousel className='slederXXXTENTACION' interval={null}>
            {quiz.question.map((item) => (
              <Carousel.Item className=''>
                <div className="d-flex justify-content-center align-items-center content-in-slide">
                  <h2>huy</h2>
                  <h2>huy</h2>
                  <h2>huy</h2>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="buttons-group">
            <button onClick={addQuestion}>Добавить вопрос</button>
            <button>Создать опрос</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default QuizCreate