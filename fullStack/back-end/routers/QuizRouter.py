from typing import List

from fastapi import APIRouter, Depends, UploadFile, File, Form, BackgroundTasks, Request
from fastapi_cache.decorator import cache
from sqlalchemy.orm import Session
from starlette.responses import FileResponse
from starlette import status

from middleware.Token import CheckAuthMiddleware
from model.QuizSchema import QuizSchema, QuizBaseSchema, QuizResult
from model.Settings import get_db
from model.UserSchema import UserId
from services.Quiz import (
    selelctCurrentQuiz,
    delete_current_quiz,
    select_user_quiz,
    createImageQuiz,
    updateCurrentQuiz,
    updateImageQuiz,
    selectQuiz,
    create_quiz_results,
    select_quiz_results_user, create_quiz, )

from fastapi_pagination import Page

quizPrivateRouter = APIRouter(
    prefix="/quiz", tags=["QuizPrivate"], dependencies=[Depends(CheckAuthMiddleware)]
    # prefix="/quiz", tags=["QuizPrivate"]
)
quizPublicRouter = APIRouter(prefix="/quiz-public", tags=["QuizPublic"])




@quizPrivateRouter.get("/getquiz", response_model=Page[QuizBaseSchema])
@cache(expire=10)
def getQuiz(db: Session = Depends(get_db)):
    """Получить все опросы"""
    return selectQuiz(db=db)



@quizPrivateRouter.get("/getquiz/{idQuiz}")
def getCurrentQuiz(idQuiz: int, db: Session = Depends(get_db)) -> QuizSchema:
    """Получить конкретный опрос"""
    return selelctCurrentQuiz(idQuiz=idQuiz, db=db)


@quizPrivateRouter.get("/getquizuser", response_model=Page[QuizBaseSchema])
def get_user_quiz(request: Request, db: Session = Depends(get_db)) -> Page[QuizBaseSchema] | None:
    """Получить созданные опросы конкретного пользователя"""
    return select_user_quiz(request=request, db=db)


@quizPrivateRouter.get("/result", response_model=Page[QuizResult])
def get_result_quiz_user(request: Request, db: Session = Depends(get_db)):
    return select_quiz_results_user(request=request, db=db)


@quizPublicRouter.get("/image/", response_class=FileResponse)
def getQuizImage(urlImage: str):
    return urlImage


@quizPrivateRouter.post("/create-result")
def add_quiz_result(request: Request, quizId: int, result: int, db: Session = Depends(get_db)):
    return create_quiz_results(request=request, quiz_id=quizId, result=result, db=db)


@quizPrivateRouter.post("/createquiz")
def add_quiz(quiz_data: QuizSchema, request: Request, db: Session = Depends(get_db)):
    return create_quiz(quiz_data=quiz_data, request=request, db=db)


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
def remove_current_quiz(quiz_data: int, request: Request, db: Session = Depends(get_db)):
    """Удалить конкретный опрос"""
    return delete_current_quiz(quiz_data=quiz_data, request=request, db=db)
