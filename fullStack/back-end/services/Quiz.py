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
from fastapi import HTTPException, Depends, UploadFile, File, Form, Request
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED

from model.UserSchema import UserId
from services.User import get_user_id_by_token


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


def create_quiz(quiz_data: QuizSchema, request: Request, db: Session = Depends(get_db)):
    id_user = get_user_id_by_token(request=request, db=db)
    quiz = Quiz(
        title=quiz_data.title,
        description=quiz_data.description,
        image=quiz_data.image,
        authorId=id_user,
    )
    db.add(quiz)
    db.commit()

    for item in quiz_data.question:
        createQuestion(idQuiz=quiz.id, questionData=item, db=db)


def create_quiz_results(request: Request, quiz_id: int, result: int, db: Session = Depends(get_db)):
    id_user = get_user_id_by_token(request=request, db=db)
    quiz = db.scalar(
        select(QuizResults).where(
            and_(QuizResults.userId == id_user, QuizResults.quizId == quiz_id)
        )
    )
    if quiz:
        quiz.result = result
    else:
        quiz = QuizResults(userId=id_user, quizId=quiz_id, result=result)

    db.add(quiz)
    db.commit()


def delete_current_quiz(quiz_data: int, request: Request, db: Session = Depends(get_db)):
    id_user = get_user_id_by_token(request=request, db=db)
    quiz_check = db.scalar(
        select(Quiz).where(and_(Quiz.id == quiz_data, Quiz.authorId == id_user))
    )
    if not quiz_check:
        return HTTP_400_BAD_REQUEST
    quiz = delete(Quiz).where(and_(Quiz.id == quiz_data, Quiz.authorId == id_user))
    delete_image(quiz_check.image)
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


def select_quiz(db: Session = Depends(get_db)):
    return paginate(conn=db, query=select(Quiz).order_by(Quiz.id))


def selelct_current_quiz(idQuiz: int, db: Session = Depends(get_db)):
    currentQuiz = db.scalar(select(Quiz).where(Quiz.id == idQuiz))
    if not currentQuiz:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Опрос с идентифекатором: '{idQuiz}', не найден.",
        )
    return currentQuiz


def select_user_quiz(request: Request, db: Session = Depends(get_db)):
    id_user = get_user_id_by_token(request=request, db=db)
    query = select(Quiz).where(or_(Quiz.authorId == id_user)).order_by(Quiz.id)
    return paginate(conn=db, query=query)


def select_quiz_results_user(request: Request, db: Session = Depends(get_db)):
    id_user = get_user_id_by_token(request=request, db=db)
    quiz = (
        db.query(QuizResults)
        .options(joinedload(QuizResults.quiz))
        .where()
        .all()
    )

    return paginate(conn=db, query=select(QuizResults).where(and_(
        QuizResults.userId == id_user, QuizResults.quizId == Quiz.id
    )))


def delete_image(imageUrl: str):
    if os.path.isfile(imageUrl):
        os.remove(imageUrl)


def create_image_quiz(image: UploadFile = File(...)):
    imgPath = "media/quizImage/"
    with open(f"{imgPath}{image.filename}", "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    return imgPath + image.filename


def update_image_quiz(
    quizId: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    quiz = db.scalar((select(Quiz).where(Quiz.id == quizId)))
    delete_image(imageUrl=quiz.image)
    return create_image_quiz(image=image)


def update_current_quiz(quizData: QuizSchema, db: Session = Depends(get_db)):
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
