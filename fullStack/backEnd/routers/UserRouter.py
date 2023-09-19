from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.status import HTTP_401_UNAUTHORIZED
from model.UserSchema import UserCreate
from model.Settings import get_db
from security import ACCESS_TOKEN_EXPIRE_MINUTES
from services.User import createUser, authenticated, createAccesToken, getCurrentUser

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
    accesTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    accesToken = createAccesToken(data={"sub": user.userName}, expires_delta=accesTokenExpires)


    return {"accesToken": accesToken, "tokenType": "bearer"}


@userRouter.post('/logup')
def registration(userData: UserCreate, db: Session = Depends(get_db)):
    return createUser(db=db, userSchema=userData)


@userRouter.get('/getUser')
def currentUser(token, db: Session = Depends(get_db)):
    return getCurrentUser(token, db=db)
