import shutil

import os

from fastapi_pagination import add_pagination
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlalchemy.orm import Session, joinedload
from starlette import status

from model.QuizSchema import QuestionSchema, QuizSchema, AnswerSchema
from model.Quiz import Question, Quiz, Answer, QuizResults
from model.Settings import get_db
from sqlalchemy import select, delete, update, and_, asc, or_
from fastapi import HTTPException, Depends, UploadFile, File, Form
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED

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
    print(question.title)
    db.commit()

    for itemAnswer in questionData.answer:
        createAnswer(idQuestion=question.id, anwerData=itemAnswer, db=db)


def createQuiz(quizData: QuizSchema, user: UserId, db: Session = Depends(get_db)):
    quiz = Quiz(
        title=quizData.title,
        description=quizData.description,
        image=quizData.image,
        authorId=user.id,
    )
    db.add(quiz)
    db.commit()

    for item in quizData.question:
        createQuestion(idQuiz=quiz.id, questionData=item, db=db)


def createQuizResults(
    userId: int, quizId: int, result: int, db: Session = Depends(get_db)
):
    quiz = db.scalar(
        select(QuizResults).where(
            and_(QuizResults.userId == userId, QuizResults.quizId == quizId)
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
    return paginate(conn=db, query=select(Quiz).order_by(Quiz.id))


def selelctCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)):
    currentQuiz = db.scalar(select(Quiz).where(Quiz.id == idQuiz))
    if not currentQuiz:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Опрос с идентифекатором: '{idQuiz}', не найден.",
        )
    return currentQuiz


def selectUserQuiz(idUser: int, db: Session = Depends(get_db)):
    query = select(Quiz).where(or_(Quiz.authorId == idUser)).order_by(Quiz.id)
    return paginate(conn=db, query=query)


def selectQuizResultsUser(idUser: int, db: Session = Depends(get_db)):
    quiz = (
        db.query(QuizResults)
        .options(joinedload(QuizResults.quiz))
        .where()
        .all()
    )

    return paginate(conn=db, query=select(QuizResults).where(and_(
        QuizResults.userId == idUser, QuizResults.quizId == Quiz.id
    )))


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