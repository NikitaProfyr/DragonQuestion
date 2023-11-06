from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK
from model.UserSchema import UserCreate, TokenSchema, UserUpdate
from model.Settings import get_db
from security import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DEYS
from services.User import createUser, authenticated, createToken, getCurrentUser, updateUser, saveRefreshToken, \
    selectCurrentToken, deleteRefreshToken


userRouter = APIRouter(tags=["users"])



@userRouter.post('/login')
def authorization(userData: UserCreate, response: Response, db: Session = Depends(get_db)):
    user = authenticated(db=db, userSchema=userData)
    if not user:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Некорректные имя пользователя или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refreshTokenExpires = timedelta(days=REFRESH_TOKEN_EXPIRE_DEYS)
    accessToken = createToken(data={"sub": user.userName}, expiresDelta=accessTokenExpires)
    refreshToken = createToken(data={"sub": user.userName}, expiresDelta=refreshTokenExpires)
    saveRefreshToken(userId=user.id, token=refreshToken, db=db)
    response.set_cookie(key="refreshToken", value=refreshToken, max_age=24 * 30 * 60 * 60 * 1000, httponly=True)
    print(user.id)  # Я не знаю почему, но без принта эта движуха не работает
    return {"user": user, "accessToken": accessToken, "refreshToken": refreshToken}


@userRouter.post('/logup')
def registration(userData: UserCreate, db: Session = Depends(get_db)):
    user = createUser(db=db, userSchema=userData)
    return HTTP_200_OK


@userRouter.post('/logout')
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    refreshToken = request.cookies.get('refreshToken')
    deleteRefreshToken(token=refreshToken, db=db)
    response.delete_cookie('refreshToken')
    return HTTP_200_OK


@userRouter.post('/getUser')
def currentUser(token, db: Session = Depends(get_db)):
    return getCurrentUser(token, db=db)


@userRouter.put('/updateUser')
def updateUserData(userData: UserUpdate, db: Session = Depends(get_db)) -> UserUpdate:
    return updateUser(db=db, user=userData)
