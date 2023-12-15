from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_410_GONE, HTTP_400_BAD_REQUEST

from middleware.Token import CheckAuthMiddleware
from model.UserSchema import UserCreate, UserUpdate, UserId, UpdatePasswordSchema
from model.Settings import get_db
from security import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS
from services.User import (
    createUser,
    authenticated,
    createToken,
    getCurrentUser,
    update_user,
    saveRefreshToken,
    deleteRefreshToken,
    validateRefreshToken,
    deleteUser, updatePassword, get_user_id_by_token,
)

userPublicRouter = APIRouter(tags=["UserPublic"])
userPrivateRouter = APIRouter(
    tags=["UserPrivate"], dependencies=[Depends(CheckAuthMiddleware)]
)


@userPublicRouter.post("/refresh")
def refresh(request: Request, db: Session = Depends(get_db)):
    # response.headers["Access-Control-Allow-Credentials"] = "true"
    refreshToken = request.cookies.get("refreshToken")
    print(refreshToken)
    print(request.cookies)
    print(request.cookies)
    print(request.cookies)
    print(request.cookies)
    print("==========================================================================================")
    print("==========================================================================================")
    print("==========================================================================================")
    refreshToken = validateRefreshToken(token=refreshToken, db=db)
    if not refreshToken:
        return HTTPException(
            status_code=HTTP_410_GONE, detail="не валидный refresh token"
        )
    accessToken = createToken({"userName": refreshToken.get("userName")})
    return {"accessToken": accessToken}


@userPublicRouter.post("/login")
def authorization(
    userData: UserCreate, response: Response, db: Session = Depends(get_db)
):
    user = authenticated(db=db, userSchema=userData)
    if not user:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Некорректные имя пользователя или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refreshTokenExpires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    accessToken = createToken(
        data={"userName": user.userName}, expiresDelta=accessTokenExpires
    )
    refreshToken = createToken(
        data={"userName": user.userName}, expiresDelta=refreshTokenExpires
    )
    saveRefreshToken(userId=user.id, token=refreshToken, db=db)
    response.set_cookie(
        key="refreshToken",
        value=refreshToken,
        max_age=24 * 30 * 60 * 60 * 1000,
        httponly=True,
        samesite="None",
        secure="False",

    )
    response.headers["Authorization"] = accessToken
    print(user.id)  # Я не знаю почему, но без принта эта движуха не работает
    return {"user": user, "accessToken": accessToken, "refreshToken": refreshToken}


@userPublicRouter.post("/logup")
def registration(userData: UserCreate, db: Session = Depends(get_db)):
    user = createUser(db=db, userSchema=userData)
    return HTTP_200_OK


@userPublicRouter.post("/logout")
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    refreshToken = request.cookies.get("refreshToken")
    deleteRefreshToken(token=refreshToken, db=db)
    response.delete_cookie("refreshToken")
    return HTTP_200_OK


@userPublicRouter.post("/getUser")
def currentUser(token, db: Session = Depends(get_db)):
    return getCurrentUser(token, db=db)


@userPrivateRouter.put("/update/user")
def updateUserData(userData: UserUpdate, request: Request, response: Response, db: Session = Depends(get_db)):
    refreshToken = request.cookies.get("refreshToken")
    deleteRefreshToken(token=refreshToken, db=db)
    response.delete_cookie("refreshToken")
    user_updated = update_user(request=request, db=db, user=userData)
    accessTokenExpires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refreshTokenExpires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    accessToken = createToken(
        data={"userName": user_updated.userName}, expiresDelta=accessTokenExpires
    )
    refreshToken = createToken(
        data={"userName": user_updated.userName}, expiresDelta=refreshTokenExpires
    )
    saveRefreshToken(userId=user_updated.id, token=refreshToken, db=db)
    response.set_cookie(
        key="refreshToken",
        value=refreshToken,
        max_age=24 * 30 * 60 * 60 * 1000,
        httponly=True,
    )
    response.headers["Authorization"] = accessToken

    return {"user": {
        "id": user_updated.id,
        "userName": user_updated.userName,
        "email": user_updated.email,
    }, "accessToken": accessToken, "refreshToken": refreshToken}


@userPrivateRouter.delete("/delete")
def deleteUserData(request: Request, db: Session = Depends(get_db)):
    deleteUser(request=request, db=db)


@userPrivateRouter.post("/update/password")
def updatePasswordData(userData: UpdatePasswordSchema, db: Session = Depends(get_db)):
    updatePassword(userData=userData, db=db)
