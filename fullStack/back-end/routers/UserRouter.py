from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
<<<<<<< HEAD
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_410_GONE, HTTP_400_BAD_REQUEST, HTTP_408_REQUEST_TIMEOUT, HTTP_402_PAYMENT_REQUIRED
=======
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_200_OK, HTTP_410_GONE, HTTP_400_BAD_REQUEST, HTTP_408_REQUEST_TIMEOUT
>>>>>>> a369357d7d4c84b42a23928c1c94538f1e5ef340

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
    save_refresh_token,
    delete_refresh_token,
    validateRefreshToken,
    deleteUser, update_password, get_user_id_by_token,
)

userPublicRouter = APIRouter(tags=["UserPublic"])
userPrivateRouter = APIRouter(
    tags=["UserPrivate"], dependencies=[Depends(CheckAuthMiddleware)]
)


@userPublicRouter.post("/refresh")
def refresh(request: Request, db: Session = Depends(get_db)):
    refreshToken = request.cookies.get("refreshToken")
    refreshToken = validateRefreshToken(token=refreshToken, db=db)
    if refreshToken is None:
        print("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        raise HTTPException(
            status_code=HTTP_408_REQUEST_TIMEOUT, detail="не валидный refresh token"
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
    refreshTokenExpires = timedelta(minutes=REFRESH_TOKEN_EXPIRE_DAYS)
    accessToken = createToken(
        data={"userName": user.userName}, expiresDelta=accessTokenExpires
    )
    refreshToken = createToken(
        data={"userName": user.userName}, expiresDelta=refreshTokenExpires
    )
    save_refresh_token(userId=user.id, token=refreshToken, db=db)
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
    delete_refresh_token(token=refreshToken, db=db)
    response.delete_cookie("refreshToken")
    return HTTP_200_OK


@userPublicRouter.post("/getUser")
def currentUser(token, db: Session = Depends(get_db)):
    return getCurrentUser(token, db=db)


@userPrivateRouter.put("/update/user")
def update_user_data(user_data: UserUpdate, request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refreshToken")
    user_updated = update_user(request=request, db=db, user=user_data)
    delete_refresh_token(token=refresh_token, db=db)
    response.delete_cookie("refreshToken")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    access_token = createToken(
        data={"userName": user_updated.userName}, expiresDelta=access_token_expires
    )
    refresh_token = createToken(
        data={"userName": user_updated.userName}, expiresDelta=refresh_token_expires
    )
    save_refresh_token(userId=user_updated.id, token=refresh_token, db=db)
    response.set_cookie(
        key="refreshToken",
        value=refresh_token,
        max_age=24 * 30 * 60 * 60 * 1000,
        httponly=True,
        samesite="None",
        secure="False",
    )
    response.headers["Authorization"] = access_token

    return {"user": {
        "id": user_updated.id,
        "userName": user_updated.userName,
        "email": user_updated.email,
    }, "accessToken": access_token, "refreshToken": refresh_token}


@userPrivateRouter.delete("/delete")
def deleteUserData(request: Request, db: Session = Depends(get_db)):
    deleteUser(request=request, db=db)


@userPrivateRouter.post("/update/password")
def update_password_data(request: Request, user_data: UpdatePasswordSchema, db: Session = Depends(get_db)):
    update_password(request=request, user_data=user_data, db=db)
