import shutil

import os

from fastapi_cache.decorator import cache
from sqlalchemy.orm import Session, joinedload
from starlette import status

from model.QuizSchema import QuestionSchema, QuizSchema, AnswerSchema
from model.Quiz import Question, Quiz, Answer, QuizResults
from model.Settings import get_db
from sqlalchemy import select, delete, update
from fastapi import HTTPException, Depends, UploadFile, File, Form
from starlette.status import HTTP_400_BAD_REQUEST
from model.UserSchema import UserId


def createAnswer(
    idQuestion: int, anwerData: AnswerSchema, db: Session = Depends(get_db)
):
    anwer = Answer(title=anwerData.title, right=anwerData.right, questionId=idQuestion)
    db.add(anwer)
    db.commit()


def createQuestion(
    idQuiz: int, questionData: QuestionSchema, db: Session = Depends(get_db)
):
    question = Question(title=questionData.title, quizId=idQuiz)
    db.add(question)
    db.commit()

    for itemAnswer in questionData.answer:
        createAnswer(idQuestion=question.id, anwerData=itemAnswer, db=db)


def createQuiz(quizData: QuizSchema, userData: UserId, db: Session = Depends(get_db)):
    quiz = Quiz(
        title=quizData.title,
        description=quizData.description,
        image=quizData.image,
        authorId=userData.id,
    )
    db.add(quiz)
    db.commit()

    for itemQuistion in quizData.question:
        createQuestion(idQuiz=quiz.id, questionData=itemQuistion, db=db)


def createQuizResults(
    userId: int, quizId: int, result: int, db: Session = Depends(get_db)
):
    quiz = db.scalar(
        select(QuizResults).where(
            QuizResults.userId == userId, QuizResults.quizId == quizId
        )
    )
    if quiz:
        quiz.result = result
    else:
        quiz = QuizResults(userId=userId, quizId=quizId, result=result)

    db.add(quiz)
    db.commit()


def deleteCurrentQuiz(quizData: int, idUser: int, db: Session = Depends(get_db)):
    quizCheck = db.scalar(
        select(Quiz).where(Quiz.id == quizData, Quiz.authorId == idUser)
    )
    if not quizCheck:
        return HTTP_400_BAD_REQUEST
    quiz = delete(Quiz).where(Quiz.id == quizData, Quiz.authorId == idUser)
    deleteImage(quizCheck.image)
    # if os.path.isfile(quizCheck.image):
    #     os.remove(quizCheck.image)
    db.execute(quiz)
    db.commit()


def deleteQuestion(questioId: int, db: Session = Depends(get_db)):
    query = delete(Question).where(Question.id == questioId)
    db.execute(query)
    db.commit()


def deleteQuestionCurrentQuiz(quizId, db: Session = Depends(get_db)):
    query = delete(Question).where(Question.quizId == quizId)
    db.execute(query)
    db.commit()


def selectQuizJoined(db: Session = Depends(get_db)):
    quiz = (
        db.query(Quiz)
        .options(joinedload(Quiz.question).joinedload(Question.answer))
        .all()
    )
    return quiz


def selectQuiz(db: Session = Depends(get_db)):
    quiz = db.query(Quiz).all()
    return quiz


def selelctCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)):
    currentQuiz = db.scalar(select(Quiz).where(Quiz.id == idQuiz))
    if not currentQuiz:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Опрос с идентифекатором: '{idQuiz}', не найден.",
        )
    return currentQuiz


def selectUserQuiz(idUser: int, db: Session = Depends(get_db)):
    quiz = (
        db.query(Quiz)
        .options(joinedload(Quiz.question).joinedload(Question.answer))
        .where(Quiz.authorId == idUser)
        .all()
    )
    if not quiz:
        return None
    return quiz


def selectQuizResultsUser(idUser: int, db: Session = Depends(get_db)):
    quiz = (
        db.query(QuizResults)
        .options(joinedload(QuizResults.quiz))
        .where(QuizResults.userId == idUser and QuizResults.quizId == Quiz.id)
        .all()
    )
    if not quiz:
        return None
    return quiz


def deleteImage(imageUrl: str):
    if os.path.isfile(imageUrl):
        os.remove(imageUrl)


def createImageQuiz(image: UploadFile = File(...)):
    imgPath = "media/quizImage/"
    with open(f"{imgPath}{image.filename}", "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return imgPath + image.filename


def updateImageQuiz(
    quizId: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    quiz = db.scalar((select(Quiz).where(Quiz.id == quizId)))
    deleteImage(imageUrl=quiz.image)
    return createImageQuiz(image=image)


def updateCurrentQuiz(quizData: QuizSchema, db: Session = Depends(get_db)):
    query = (
        update(Quiz)
        .where(Quiz.id == quizData.id)
        .values(
            title=quizData.title, description=quizData.description, image=quizData.image
        )
    )
    deleteQuestionCurrentQuiz(quizId=quizData.id, db=db)
    for item in quizData.question:
        createQuestion(idQuiz=quizData.id, questionData=item, db=db)
    db.execute(query)
    db.commit()
