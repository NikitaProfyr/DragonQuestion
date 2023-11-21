from typing import List

from fastapi import APIRouter, Depends, UploadFile, File, Form, BackgroundTasks
from fastapi_cache.decorator import cache
from sqlalchemy.orm import Session
from starlette.responses import FileResponse
from starlette import status

from middleware.Token import CheckAuthMiddleware
from model.QuizSchema import QuizSchema, QuizBaseSchema
from model.Settings import get_db
from model.UserSchema import UserId
from services.Quiz import (
    selelctCurrentQuiz,
    deleteCurrentQuiz,
    selectUserQuiz,
    createImageQuiz,
    updateCurrentQuiz,
    updateImageQuiz,
    selectQuiz,
    createQuizResults,
    selectQuizResultsUser, createQuiz, )

from fastapi_pagination import Page

quizPrivateRouter = APIRouter(
    # prefix="/quiz", tags=["QuizPrivate"], dependencies=[Depends(CheckAuthMiddleware)]
    prefix="/quiz", tags=["QuizPrivate"]
)
quizPublicRouter = APIRouter(prefix="/quiz-public", tags=["QuizPublic"])




@quizPrivateRouter.get("/getquiz", response_model=Page[QuizBaseSchema])
@cache(expire=60)
def getQuiz(db: Session = Depends(get_db)):
    """Получить все опросы"""
    return selectQuiz(db=db)



@quizPrivateRouter.get("/getquiz/{idQuiz}")
def getCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)) -> QuizSchema:
    """Получить конкретный опрос"""
    return selelctCurrentQuiz(idQuiz=idQuiz, db=db)


@quizPrivateRouter.get("/getquiz/user/{idUser}", response_model=Page[QuizBaseSchema])
def getUserQuiz(idUser: int, db: Session = Depends(get_db)) -> Page[QuizBaseSchema] | None:
    """Получить созданные опросы конкретного пользователя"""
    return selectUserQuiz(idUser=idUser, db=db)


@quizPrivateRouter.get("/result")
def getResultQuizUser(idUser: int, db: Session = Depends(get_db)):
    return selectQuizResultsUser(idUser=idUser, db=db)


@quizPublicRouter.get("/image/", response_class=FileResponse)
def getQuizImage(urlImage: str):
    return urlImage


@quizPrivateRouter.post("/create-result")
def addQuizResult(userId: int, quizId: int, result: int, db: Session = Depends(get_db)):
    return createQuizResults(userId=userId, quizId=quizId, result=result, db=db)


@quizPrivateRouter.post("/createquiz")
def addQuiz(quizData: QuizSchema, userId: UserId, db: Session = Depends(get_db)):
    return createQuiz(quizData=quizData, user=userId, db=db)


@quizPrivateRouter.post("/download/image")
def downloadImage(image: UploadFile = File(...)):
    return createImageQuiz(image=image)


@quizPrivateRouter.put("/updatequiz")
def updateQuiz(quizData: QuizSchema, db: Session = Depends(get_db)):
    return updateCurrentQuiz(quizData=quizData, db=db)


@quizPrivateRouter.put("/update/image")
def updateImage(
    quizId: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return updateImageQuiz(quizId=quizId, image=image, db=db)


@quizPrivateRouter.delete("/deletequiz/")
def removeCurrentQuiz(quizData: int, idUser: int, db: Session = Depends(get_db)):
    """Удалить конкретный опрос"""
    return deleteCurrentQuiz(quizData=quizData, idUser=idUser, db=db)
