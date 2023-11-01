from typing import List, Annotated

from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from starlette.responses import FileResponse

from model.QuizSchema import QuizSchema, QuizBaseSchema
from model.Settings import get_db
from model.UserSchema import UserLite, UserId
from services.Quiz import createQuiz, selectQuizJoined, selelctCurrentQuiz, deleteCurrentQuiz, selectUserQuiz, \
    createImageQuiz, updateCurrentQuiz, updateImageQuiz, selectQuiz, createQuizResults

quizRouter = APIRouter(prefix='/quiz', tags=['опросы'])


@quizRouter.get('/getquiz')
def getQuiz(db: Session = Depends(get_db)) -> List[QuizBaseSchema]:
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


@quizRouter.get('/image/', response_class=FileResponse)
def getQuizImage(urlImage: str):
    return urlImage


@quizRouter.post('/create-result')
def addQuizResult(userId: int, quizId: int, result: int, db: Session = Depends(get_db)):
    return createQuizResults(userId=userId, quizId=quizId, result=result, db=db)


@quizRouter.post('/createquiz')
def addQuiz(quiz: QuizSchema, userId: UserId, db: Session = Depends(get_db)):
    return createQuiz(quizData=quiz, userData=userId, db=db)


@quizRouter.post('/download/image')
def downloadImage(image: UploadFile = File(...)):
    return createImageQuiz(image=image)


@quizRouter.put('/updatequiz')
def updateQuiz(quizData: QuizSchema, db: Session = Depends(get_db)):
    return updateCurrentQuiz(quizData=quizData, db=db)


@quizRouter.put('/update/image')
def updateImage(quizId: int = Form(...), image: UploadFile = File(...), db: Session = Depends(get_db)):
    return updateImageQuiz(quizId=quizId, image=image, db=db)

@quizRouter.delete('/deletequiz/')
def removeCurrentQuiz(quizData: int, idUser: int, db: Session = Depends(get_db)):
    """Удалить конкретный опрос"""
    return deleteCurrentQuiz(quizData=quizData, idUser=idUser, db=db)





