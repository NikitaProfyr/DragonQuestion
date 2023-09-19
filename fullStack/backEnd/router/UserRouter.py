from datetime import timedelta, datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from sqlalchemy import select
from starlette import status

from starlette.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED

from model.UserModel import User
from model.UserModelSchema import UserCreate, UserBase
from model.settings import get_db
from secure import apikey_scheme, oauth2_scheme, pwd_context, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

userRouter = APIRouter()


def getUser(db: Session, userSchema: UserBase):
    print(userSchema)
    user = db.scalar(select(User).where(User.email == userSchema.email))
    return user


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


def getCurrentUser(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Annotated[str, Depends(get_db)]):
    credentialsException = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentialsException
        tokenData = UserBase(email=email)
    except JWTError:
        raise credentialsException
    user = getUser(db=db, userSchema=tokenData)
    if user is None:
        raise credentialsException
    return user




@userRouter.post('/login')
def authorization(response: Response, userData: UserCreate, db: Session = Depends(get_db)):
    user = authenticated(db=db, userSchema=userData)
    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    accesTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    accesToken = createAccesToken(data={"sub": user.email}, expires_delta=accesTokenExpires)
    response.set_cookie(key="token", value=accesToken)

    return {"accesToken": accesToken, "tokenType": "bearer"}


@userRouter.post('/registration')
def registration(userData: UserCreate, db: Session = Depends(get_db)):
    return createUser(db=db, userSchema=userData)


@userRouter.get('/getUser')
def currentUser(token, db: Session = Depends(get_db)):
    return getCurrentUser(token, db=db)
