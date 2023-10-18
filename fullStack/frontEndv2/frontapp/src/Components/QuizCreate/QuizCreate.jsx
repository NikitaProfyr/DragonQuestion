import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Carousel from 'react-bootstrap/Carousel';

import cross from '../../image/cross13.png'
import './quiz-create.css'
import { addQuestionAction } from '../../Feutures/Actions/actionQuiz';
import { useEffect } from 'react';


const QuizCreate = () => {
  const dispatch = useDispatch()
  const quiz = useSelector(state => state.reducerQuiz.createQuiz)
  const [count, setCount] = useState(0)

  const addAnswer = (index) => {
    // e.preventDefault()
    console.log(index)
    quiz.question[index].answer.push({
      title: "",
      right: false
    })
  }
  const addQuestion = (e) => {
    e.preventDefault()
    quiz.question.push({
      title: "",
      answer:[]
    }
    )
    dispatch(addQuestionAction(quiz))

  }
  const logInfo = (e) => {
    e.preventDefault()
    console.log(quiz)
  }
  return (
    <div className="bg-create-quiz">
      <div className="container">
        <form className='row col-12 py-5 create-quiz-content'>
          <div className="d-flex col-4 flex-column form-create-quiz">
            <input type="text" placeholder='Введите название опроса' />
            <input type="text" placeholder='Введите описание' />
            <label for="myfile" class="label">Выберите файлы</label>
            <input type="file" class="my" id="myfile" name="myfile" accept="image/*" multiple></input>
          </div>
          <Carousel className='slederXXXTENTACION' interval={null}>
            {quiz.question.map((item, index) => (
              <Carousel.Item className=''>
                <div className="d-flex justify-content-center align-items-center content-in-slide">
                  <div className="col-4 d-flex flex-column mx-3 in-slide-form-xxxtentacion">
                    <input onChange={(e) => (item.title = e.target.value)} type="text" placeholder='Введите вопрос'></input>
                    <button onClick={addAnswer(index)}>Добавить ответ</button>
                    <button>Добавить правильный ответ</button>
                    <button>Удалить вопрос</button>
                  </div>
                  <div className="col-4 d-flex flex-column">
                    {item.answer.map((ansItem)=>(
                      <div className="d-flex in-slide-form-lilpump">
                      <input type="text" placeholder='Введите описание'></input>
                      <div className="del-answer-icon">
                        <img src={cross} height="30px" alt="" />
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <h2>{quiz.question.length}</h2>
          <div className="buttons-group col-4">
            <button onClick={addQuestion}>Добавить вопрос</button>
            <button onClick={logInfo}>Создать опрос</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default QuizCreate