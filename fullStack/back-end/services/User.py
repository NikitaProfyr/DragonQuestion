from datetime import timedelta, datetime
from typing import Annotated

from fastapi import HTTPException, Depends
from fastapi import Request
from jose import jwt, JWTError
from sqlalchemy import select, update, delete, or_, and_
from sqlalchemy.orm import Session
from starlette import status
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_200_OK

from model.Settings import get_db
from model.User import User, Token
from model.UserSchema import UserBase, UserCreate, UserUpdate, UserId, UpdatePasswordSchema
from security import pwdContext, SECRET_KEY, ALGORITHM, oauth2Scheme


def getUser(db: Session, userShema: UserBase):
    user = db.scalar(select(User).where(or_(User.userName == userShema.userName)))
    if not user:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким именем не найден.",
        )
    return user


def create_user(db: Session, userSchema: UserCreate):
    if db.scalar(select(User).where(or_(User.userName == userSchema.userName))):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким именем уже зарегистрирован",
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
            detail="Пользователь с таким именем не найден",
        )
    if not pwdContext.verify(userSchema.password, user.hashedPassword):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST, detail="Не правильный пароль"
        )
    return user


def create_token(data: dict, expiresDelta: timedelta | None = None):
    toEncode = data.copy()
    if expiresDelta:
        expire = datetime.utcnow() + expiresDelta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    toEncode.update({"exp": expire})
    encodedJwt = jwt.encode(toEncode, SECRET_KEY, algorithm=ALGORITHM)
    return encodedJwt


def delete_refresh_token(token: str, db: Session = Depends(get_db)):
    db.execute(delete(Token).where(or_(Token.refreshToken == token)))
    db.commit()


def save_refresh_token(userId: int, token: str, db: Session = Depends(get_db)):
    refreshToken = db.scalar(select(Token).where(or_(Token.userId == userId)))
    if refreshToken:
        refreshToken.refreshToken = token
    else:
        refreshToken = Token(refreshToken=token, userId=userId)
    db.add(refreshToken)
    db.commit()


def selectCurrentToken(userId: str, db: Session = Depends(get_db)) -> str:
    refreshToken = db.scalar(select(Token).where(or_(userId == userId)))
    if not refreshToken:
        raise HTTP_400_BAD_REQUEST
    return refreshToken


def validate_refresh_token(token: str, db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


def delete_user(request: Request, db: Session = Depends(get_db)):
    try:
        db.execute(
            delete(User).where(or_(User.id == get_user_id_by_token(request=request, db=db)))
        )
        db.commit()
        return HTTP_200_OK
    except HTTPException:
        return HTTPException(status_code=HTTP_400_BAD_REQUEST)


def get_user_id_by_token(request: Request, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refreshToken")
    token = db.scalar(select(Token).where(or_(Token.refreshToken == refresh_token)))
    if token is None:
        raise HTTPException(status_code=404, detail="Токен не найден")

    return token.userId



def get_current_user(
    token: Annotated[str, Depends(oauth2Scheme)],
    # token: str,
    db: Session = Annotated[str, Depends(get_db)],
):
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


def update_user(request: Request, db: Session, user: UserUpdate):
    id_user = get_user_id_by_token(request=request, db=db)
    existingUser = db.execute(
        select(User).where(or_(User.userName == user.userName, User.email == user.email))).scalar()
    if existingUser and existingUser.id != id_user:
        raise HTTPException(
            status_code=400,
            detail="Пользователь с таким именем или email уже существует."
        )

    try:
        query = (
            update(User)
            .where(or_(User.id == id_user))
            .values(
                userName=user.userName,
                email=user.email,
            )
        )
        db.execute(query)
        db.commit()
        updated_user = db.execute(select(User).where(or_(User.id == id_user))).scalar()

        return updated_user

    except Exception as ex:
        print(Exception)
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Произошла ошибка при обновлении пользователя."
        ) from ex


def update_password(request: Request, user_data: UpdatePasswordSchema, db: Session = Depends(get_db)):
    id_user = get_user_id_by_token(request=request, db=db)
    user = db.scalar(select(User).where(or_(User.id == id_user)))
    if not pwdContext.verify(user_data.oldPassword, user.hashedPassword):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail="Не правильный пароль"
        )
    user.hashedPassword = pwdContext.hash(user_data.newPassword)
    db.commit()
    return HTTP_200_OK

