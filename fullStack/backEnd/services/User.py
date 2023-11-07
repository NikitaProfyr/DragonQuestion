from datetime import timedelta, datetime
from typing import Annotated

from fastapi import HTTPException, Depends
from jose import jwt, JWTError, jws
from sqlalchemy import select, update, delete
from sqlalchemy.orm import Session
from starlette import status
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_200_OK

from model.Settings import get_db
from model.User import User, Token
from model.UserSchema import UserBase, UserCreate, UserLite, UserUpdate
from security import pwdContext, SECRET_KEY, ALGORITHM, oauth2Scheme


def getUser(db: Session, userShema: UserBase):
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
    return user


def authenticated(db: Session, userSchema: UserCreate):
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


def createToken(data: dict, expiresDelta: timedelta | None = None):
    toEncode = data.copy()
    if expiresDelta:
        expire = datetime.utcnow() + expiresDelta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    toEncode.update({"exp": expire})
    encodedJwt = jwt.encode(toEncode, SECRET_KEY, algorithm=ALGORITHM)
    return encodedJwt


def deleteRefreshToken(token: str, db: Session = Depends(get_db)):
    db.execute(delete(Token).where(Token.refreshToken == token))
    db.commit()


def saveRefreshToken(userId: int, token: str, db: Session = Depends(get_db)):
    refreshToken = db.scalar(select(Token).where(userId == userId))
    if refreshToken:
        refreshToken.refreshToken = token
    else:
        refreshToken = Token(refreshToken=token, userId=userId)
    db.add(refreshToken)
    db.commit()


def selectCurrentToken(userId: str, db: Session = Depends(get_db)) -> str:
    refreshToken = db.scalar(select(Token).where(userId == userId))
    if not refreshToken:
        raise HTTP_400_BAD_REQUEST
    return refreshToken


def validateRefreshToken(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        db.scalar(delete(Token).where(Token.refreshToken == token))
        db.commit()
        return None


# def validateAccess


def getCurrentUser(token: Annotated[str, Depends(oauth2Scheme)], db: Session = Annotated[str, Depends(get_db)]):
    credentialsException = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        userName = payload.get("userName")
        if not userName:
            raise credentialsException
        tokenData = UserBase(userName=userName)
    except JWTError:
        raise credentialsException
    user = getUser(db=db, userShema=tokenData)
    if not user:
        raise credentialsException
    return user


def updateUser(db: Session, user: UserUpdate):
    query = (update(User)
             .where(User.id == user.id)
             .values(userName=user.userName,
                     firstName=user.firstName,
                     lastName=user.lastName,
                     email=user.email))
    db.execute(query)
    db.commit()
    user = db.scalar(select(User).where(User.id == user.id))
    return user
