from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from model.QuizSchema import QuizSchema
from model.Settings import get_db
from model.UserSchema import UserLite
from services.Quiz import createQuiz

quizRouter = APIRouter(prefix='/quiz', tags=['опросы'])


@quizRouter.post('/')
def addQuiz(quiz: QuizSchema, user: UserLite, db: Session = Depends(get_db)):
    return createQuiz(quizData=quiz, userData=user, db=db)