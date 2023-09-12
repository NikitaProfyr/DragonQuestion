from datetime import timedelta, datetime

from fastapi import APIRouter, Depends, HTTPException
from jose import jwt
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Annotated

from starlette.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED

from model.UserModel import User
from model.UserModelSchema import UserCreate
from model.settings import get_db
from secure import apikey_scheme, oauth2_scheme, pwd_context, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

userRouter = APIRouter()


def createUser(db: Session, userSchema: UserCreate):
    if db.scalar(select(User).where(User.email == userSchema.email)):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже зарегистрирован"
        )
    hashedPassword = pwd_context.hash(userSchema.password)
    user = User(email=userSchema.email)
    user.hashedPassword = hashedPassword
    db.add(user)
    db.commit()
    return {"status": 201}


def authenticated(db: Session, userSchema: UserCreate):
    user = db.scalar(select(User).where(User.email == userSchema.email))
    if not user:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email не найден"
        )
    if not pwd_context.verify(userSchema.password, user.hashedPassword):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Не правильный пароль"
        )
    return user


def createAccesToken(data: dict, expires_delta: timedelta | None = None):
    toEncode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    toEncode.update({"exp": expire})
    encodedJwt = jwt.encode(toEncode, SECRET_KEY, algorithm=ALGORITHM)
    return encodedJwt


@userRouter.post('/login')
def authorization(userData: UserCreate, db: Session = Depends(get_db)):
    user = authenticated(db=db, userSchema=userData)
    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    accesTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    accesToken = createAccesToken(data={"sub": user.email}, expires_delta=accesTokenExpires)
    return {"accesToken": accesToken, "tokenType": "bearer"}



@userRouter.post('/registration')
def registration(userData: UserCreate, db: Session = Depends(get_db)):
    return createUser(db=db, userSchema=userData)

