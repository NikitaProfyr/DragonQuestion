import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Carousel from 'react-bootstrap/Carousel';

import galka from '../../image/icon300pn.png'
import cross from '../../image/cross13.png'

import './quiz-create.css'

import { addQuestionAction } from '../../Feutures/Actions/actionQuiz';
import { useEffect } from 'react';
import { QuizService, validationQuiz } from '../../Services/QuizService';
 

const QuizCreate = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.reducerUser.userInfo)
  const quiz = useSelector(state => state.reducerQuiz.createQuiz)

  const addAnswer = (e, item) => {
    e.preventDefault()
    item.answer.push({
      title: "",
      right: false
    })
    dispatch(addQuestionAction(quiz))
  }
  const cheackAnswer = (item) => {
    item.right === true ?
      item.right = false :
      item.right = true
    dispatch(addQuestionAction(quiz))
  }
  const removeAnswer = (e, item, ansItem) => {
    e.preventDefault()
    const index = item.answer.indexOf(ansItem)
    delete item.answer[index]
    dispatch(addQuestionAction(quiz))
  }
  const addQuestion = (e) => {
    e.preventDefault()
    quiz.question.push({
      title: "",
      answer: []
    }
    )
    dispatch(addQuestionAction(quiz))
  }
  const removeQuestion = (e, item) => {
    e.preventDefault()
    const index = quiz.question.indexOf(item)
    delete quiz.question[index]
    dispatch(addQuestionAction(quiz))
  }
  const addImage = (e) => {

    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', e.target.files[0])
    // quiz.image = formData.get('file')
    quiz.image = formData
    // console.log(formData.get('file'));
    // console.log(quiz.image);
    dispatch(addQuestionAction(quiz))
    // console.log(quiz);
  }
  const addQuiz = async (e) => {
    e.preventDefault()
    // console.log(quiz)
    quiz.image = await QuizService.createImageQuiz(quiz.image)
    dispatch(addQuestionAction(quiz))
    QuizService.createQuiz(quiz, user.id).catch((error) => {
      alert(error)
    })
    console.log(quiz);
  }
  return (
    <div className="bg-create-quiz">
      <div className="container">
        <form onSubmit={(e) => (addQuiz(e))} className='row col-12 py-5 create-quiz-content'>
          <div className="d-flex col-4 flex-column form-create-quiz">
            <input type="text" onChange={(e) => (quiz.title = e.target.value)} placeholder='Введите название опроса' />
            <input type="text" onChange={(e) => (quiz.description = e.target.value)} placeholder='Введите описание' />
            <label htmlFor="myfile" className="label">Выберите файл</label>
            <input type="file" onChange={addImage} className="my" id="myfile" name="myfile" accept="image/*"></input>
          </div>
          <Carousel className='slederXXXTENTACION' interval={null}>
            {quiz.question.map((item) => (
              <Carousel.Item className=''>
                <div className="d-flex justify-content-center align-items-center content-in-slide">
                  <div className="col-4 d-flex flex-column mx-5 in-slide-form-xxxtentacion">
                    <input onChange={(e) => (item.title = e.target.value)} type="text" placeholder='Введите вопрос'></input>
                    <button onClick={(e) => (addAnswer(e, item))}>Добавить ответ</button>
                    <button onClick={(e) => (removeQuestion(e, item))}>Удалить вопрос</button>
                  </div>
                  <div className="col-4 d-flex flex-column">
                    {item.answer.map((ansItem) => (
                      ansItem.right === true ?
                        <div className="d-flex in-slide-form-lilpump active">
                          <div className="check-answer-icon active" onClick={() => (cheackAnswer(ansItem))}><img src={galka} height="30px" alt="" /></div>
                          <input onChange={(e) => (ansItem.title = e.target.value)} type="text" placeholder='Введите описание'></input>
                          <div className="del-answer-icon">
                            <img onClick={(e) => (removeAnswer(e, item, ansItem))} src={cross} height="30px" alt="" />
                          </div>
                        </div>
                        :
                        <div className="d-flex in-slide-form-lilpump">
                          <div className="check-answer-icon" onClick={() => (cheackAnswer(ansItem))}><img src={galka} height="30px" alt="" /></div>
                          <input onChange={(e) => (ansItem.title = e.target.value)} type="text" placeholder='Введите описание'></input>
                          <div className="del-answer-icon">
                            <img onClick={(e) => (removeAnswer(e, item, ansItem))} src={cross} height="30px" alt="" />
                          </div>
                        </div>

                    ))}
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="buttons-group col-4">
            <button onClick={addQuestion}>Добавить вопрос</button>
            <button type='submit'>Создать опрос</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default QuizCreate