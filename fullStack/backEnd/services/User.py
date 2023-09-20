from datetime import timedelta, datetime
from typing import Annotated

from fastapi import HTTPException, Depends
from jose import jwt, JWTError
from sqlalchemy import select
from sqlalchemy.orm import Session
from starlette import status
from starlette.status import HTTP_400_BAD_REQUEST

from model.Settings import get_db
from model.User import User
from model.UserSchema import UserBase, UserCreate
from security import pwdContext, SECRET_KEY, ALGORITHM, oauth2Scheme


def getUser(db:Session, userShema: UserBase):
    user = db.scalar(select(User).where(User.userName == userShema.userName))
    if not user:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким именем не найден."
        )
    return user


def createUser(db: Session, userSchema: UserCreate):
    if db.scalar(select(User).where(User.userName == userSchema.userName)):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким именем уже зарегистрирован"
        )
    hashedPassword = pwdContext.hash(userSchema.password)
    user = User(userName=userSchema.userName)
    user.hashedPassword = hashedPassword
    db.add(user)
    db.commit()
    return {"status": 201}


def authenticated(db: Session, userSchema: UserCreate):
    # user = db.scalar(select(User).where(User.userName == userSchema.userName))
    user = getUser(db=db, userShema=userSchema)
    if not user:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким именем не найден"
        )
    if not pwdContext.verify(userSchema.password, user.hashedPassword):
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


def getCurrentUser(token: Annotated[str, Depends(oauth2Scheme)], db: Session = Annotated[str, Depends(get_db)]):
    credentialsException = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        userName = payload.get("sub")
        if userName is None:
            raise credentialsException
        tokenData = UserBase(userName=userName)
    except JWTError:
        raise credentialsException
    user = getUser(db=db, userShema=tokenData)
    if user is None:
        raise credentialsException
    return user
