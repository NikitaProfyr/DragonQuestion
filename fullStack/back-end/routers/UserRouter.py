from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session

from starlette.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_408_REQUEST_TIMEOUT


from middleware.Token import CheckAuthMiddleware
from model.UserSchema import UserCreate, UserUpdate, UpdatePasswordSchema
from model.Settings import get_db
from security import ACCESS_TOKEN_EXPIRE_MINUTES, REFRESH_TOKEN_EXPIRE_DAYS
from services.User import (
    create_user,
    authenticated,
    create_token,
    get_current_user,
    update_user,
    save_refresh_token,
    delete_refresh_token,
    validate_refresh_token,
    delete_user, update_password,
)

user_public_router = APIRouter(tags=["UserPublic"])
user_private_router = APIRouter(
    tags=["UserPrivate"], dependencies=[Depends(CheckAuthMiddleware)]
)


@user_public_router.post("/refresh")
def refresh(request: Request, db: Session = Depends(get_db)):
    """Получает существующий рефреш токен, при условии корректного возращает access_token"""
    refresh_token = request.cookies.get("refreshToken")
    refresh_token = validate_refresh_token(token=refresh_token, db=db)
    if refresh_token is None:
        raise HTTPException(
            status_code=HTTP_408_REQUEST_TIMEOUT, detail="не валидный refresh token"
        )
    access_token = create_token({"userName": refresh_token.get("userName")})
    return {"accessToken": access_token}


@user_public_router.post("/login")
def authorization(
    user_data: UserCreate, response: Response, db: Session = Depends(get_db)
):
    user = authenticated(db=db, userSchema=user_data)
    if not user:
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail="Некорректные имя пользователя или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    access_token = create_token(
        data={"userName": user.userName}, expiresDelta=access_token_expires
    )
    refresh_token = create_token(
        data={"userName": user.userName}, expiresDelta=refresh_token_expires
    )
    save_refresh_token(userId=user.id, token=refresh_token, db=db)
    response.set_cookie(
        key="refreshToken",
        value=refresh_token,
        max_age=24 * 30 * 60 * 60 * 1000,
        httponly=True,
        samesite="None",
        secure="False",
    )
    response.headers["Authorization"] = access_token
    print(user.id)  # Я не знаю почему, но без принта эта движуха не работает
    return {"user": user, "accessToken": access_token, "refreshToken": refresh_token}


@user_public_router.post("/logup")
def registration(user_data: UserCreate, db: Session = Depends(get_db)):
    create_user(db=db, userSchema=user_data)
    return HTTP_200_OK


@user_public_router.post("/logout")
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refreshToken")
    delete_refresh_token(token=refresh_token, db=db)
    response.delete_cookie("refreshToken")
    return HTTP_200_OK


@user_public_router.post("/getUser")
def current_user(token, db: Session = Depends(get_db)):
    return get_current_user(token, db=db)


@user_private_router.put("/update/user")
def update_user_data(user_data: UserUpdate, request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refreshToken")
    user_updated = update_user(request=request, db=db, user=user_data)
    delete_refresh_token(token=refresh_token, db=db)
    response.delete_cookie("refreshToken")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    refresh_token_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    access_token = create_token(
        data={"userName": user_updated.userName}, expiresDelta=access_token_expires
    )
    refresh_token = create_token(
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


@user_private_router.delete("/delete")
def delete_user_data(request: Request, db: Session = Depends(get_db)):
    delete_user(request=request, db=db)


@user_private_router.post("/update/password")
def update_password_data(request: Request, user_data: UpdatePasswordSchema, db: Session = Depends(get_db)):
    update_password(request=request, user_data=user_data, db=db)
