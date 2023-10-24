from typing import List, Annotated

from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from starlette.responses import FileResponse

from model.QuizSchema import QuizSchema
from model.Settings import get_db
from model.UserSchema import UserLite, UserId
from services.Quiz import createQuiz, selectQuiz, selelctCurrentQuiz, deleteCurrentQuiz, selectUserQuiz, \
    createImageQuiz

quizRouter = APIRouter(prefix='/quiz', tags=['опросы'])


@quizRouter.post('/createquiz')
def addQuiz(quiz: QuizSchema, userId: UserId, db: Session = Depends(get_db)):
    return createQuiz(quizData=quiz, userData=userId, db=db)


@quizRouter.get('/getquiz')
def getQuiz(db: Session = Depends(get_db)) -> List[QuizSchema]:
    """Получить все опросы"""
    return selectQuiz(db=db)


@quizRouter.get('/getquiz/{idQuiz}')
def getCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)) -> QuizSchema:
    """Получить конкретный опрос"""
    return selelctCurrentQuiz(idQuiz=idQuiz, db=db)


@quizRouter.get('/getquiz/user/{idUser}')
def getUserQuiz(idUser: int, db: Session = Depends(get_db)) -> List[QuizSchema] | None:
    """Получить созданные опросы конкретного пользователя"""
    return selectUserQuiz(idUser=idUser, db=db)


@quizRouter.post('/download/image')
def downloadImage(image: UploadFile = File(...)):
    return createImageQuiz(image=image)


@quizRouter.delete('/deletequiz/{idQuiz}')
def removeCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)):
    """Удалить конкретный опрос"""
    return deleteCurrentQuiz(idQuiz=idQuiz, db=db)


@quizRouter.get('/image/', response_class=FileResponse)
def getQuizImage(urlImage: str):
    return urlImage
