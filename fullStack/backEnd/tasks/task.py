from celery import Celery
from fastapi import Depends
from sqlalchemy.orm import Session

from model.Quiz import Quiz
from model.QuizSchema import QuizSchema
from model.Settings import get_db
from model.UserSchema import UserId
from services.Quiz import createQuestion
from model.Settings import get_db

celeryApp = Celery("tasks", broker="redis://127.0.0.1:6379")




@celeryApp.task
def eblanTask():
    print("huy")
    print("huy")
    print("huy")
    print("huy")
    print("huy")
    print("huy")
    print("huy")
    print("huy")
    print("huy")


@celeryApp.task
def createQuiz(quiz: dict, user: dict):
    pass
    quizData = quiz
    userData = user
    print(quizData, userData)
    db = get_db()
    quiz = Quiz(
        title=quizData.get('title'),
        description=quizData.get('description'),
        image=quizData.get('image'),
        authorId=userData.get('id'),
    )
    db.add(quiz)
    db.commit()
    db.close()
    #
    # for itemQuistion in quizData.question:
    #     createQuestion(idQuiz=quiz.id, questionData=itemQuistion, db=db)
