from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response

from fastapi import Request, Depends, HTTPException

from model.Settings import get_db
from services.User import getCurrentUser


def CheckAuthMiddleware(request: Request, response: Response, db: Session = Depends(get_db)):
    authorizationHeader = request.headers.get('Authorization')
    if not authorizationHeader:
        raise HTTPException(
            status_code=401,
            detail="Пользователь не авторизован",
        )
    user = getCurrentUser(authorizationHeader, db=db)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Пользователь не авторизован",
        )
