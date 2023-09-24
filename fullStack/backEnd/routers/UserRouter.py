from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.status import HTTP_401_UNAUTHORIZED
from model.UserSchema import UserCreate
from model.Settings import get_db
from security import ACCESS_TOKEN_EXPIRE_MINUTES
from services.User import createUser, authenticated, createAccessToken, getCurrentUser

userRouter = APIRouter(tags=["users"])


@userRouter.post('/login')
def authorization(userData: UserCreate, db: Session = Depends(get_db)):
    user = authenticated(db=db, userSchema=userData)
    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Некорректные имя пользователя или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    accessToken = createAccessToken(data={"sub": user.userName}, expires_delta=accessTokenExpires)


    return {"accessToken": accessToken, "tokenType": "bearer"}


@userRouter.post('/logup')
def registration(userData: UserCreate, db: Session = Depends(get_db)):
    return createUser(db=db, userSchema=userData)


@userRouter.get('/getUser')
def currentUser(token, db: Session = Depends(get_db)):
    return getCurrentUser(token, db=db)
