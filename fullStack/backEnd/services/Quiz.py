import shutil
from typing import List

from sqlalchemy.orm import Session, joinedload
from starlette import status

from model.QuizSchema import QuestionSchema, QuizSchema, AnswerSchema
from model.Quiz import Question, Quiz, Answer
from model.Settings import get_db
from sqlalchemy import select, delete
from fastapi import HTTPException, Depends, UploadFile, File

from model.UserSchema import UserLite


def createAnswer(idQuestion: int, anwerData: AnswerSchema, db: Session = Depends(get_db)):
    anwer = Answer(title=anwerData.title, right=anwerData.right, questionId=idQuestion)
    db.add(anwer)
    db.commit()


def createQuestion(idQuiz: int, questionData: QuestionSchema, db: Session = Depends(get_db)):
    question = Question(title=questionData.title, quizId=idQuiz)
    db.add(question)
    db.commit()

    for itemAnswer in questionData.answer:
        createAnswer(idQuestion=question.id, anwerData=itemAnswer, db=db)


def createQuiz(quizData: QuizSchema, userData: UserLite, db: Session = Depends(get_db)):
    quiz = Quiz(title=quizData.title, description=quizData.description, image=quizData.image, authorId=userData.id)
    db.add(quiz)
    db.commit()

    for itemQuistion in quizData.question:
        createQuestion(idQuiz=quiz.id, questionData=itemQuistion, db=db)


def deleteCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)):
    quiz = delete(Quiz).where(Quiz.id == idQuiz)
    db.execute(quiz)
    db.commit()


def selectQuiz(db: Session = Depends(get_db)):
    quiz = db.query(Quiz).options(joinedload(Quiz.question).joinedload(Question.answer)).all()
    return quiz


def selelctCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)):
    currentQuiz = db.scalar(select(Quiz).where(Quiz.id == idQuiz))
    if not currentQuiz:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Опрос с идентифекатором: '{idQuiz}', не найден."
        )
    return currentQuiz


def selectUserQuiz(idUser: int, db: Session = Depends(get_db)):
    quiz = db.query(Quiz).options(joinedload(Quiz.question).joinedload(Question.answer))\
        .where(Quiz.authorId == idUser).all()
    print(quiz)
    if not quiz:
        return None
    return quiz


def createImageQuiz(image: UploadFile = File(...)):
    imgPath = "C:/Users/AxemaN/Desktop/DQ/fullStack/backEnd/media/quizImage/"
    shutil.copy(image.filename, imgPath)
