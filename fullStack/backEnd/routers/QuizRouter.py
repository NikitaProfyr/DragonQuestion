from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from model.QuizSchema import QuizSchema
from model.Settings import get_db
from model.UserSchema import UserLite
from services.Quiz import createQuiz, selectQuiz, selelctCurrentQuiz, deleteCurrentQuiz

quizRouter = APIRouter(prefix='/quiz', tags=['опросы'])


@quizRouter.post('/createquiz')
def addQuiz(quiz: QuizSchema, user: UserLite, db: Session = Depends(get_db)):
    return createQuiz(quizData=quiz, userData=user, db=db)


@quizRouter.get('/getquiz')
def getQuiz(db: Session = Depends(get_db)):
    return selectQuiz(db=db)


@quizRouter.get('/getquiz/{idQuiz}')
def getCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)) -> QuizSchema:
    return selelctCurrentQuiz(idQuiz=idQuiz, db=db)


@quizRouter.delete('/deletequiz/{idQuiz}')
def removeCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)):
    return deleteCurrentQuiz(idQuiz=idQuiz, db=db)
