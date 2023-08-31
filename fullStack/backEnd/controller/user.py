from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from starlette.status import HTTP_400_BAD_REQUEST

from model.UserModel import User
from model.UserModelSchema import UserRegistrationSchema

from secure import pwd_context


def registerUser(db: Session, userData: UserRegistrationSchema):
    if db.scalar(select(User).where(User.email == userData.email)):
        raise HTTPException(
            status_code=HTTP_400_BAD_REQUEST,
            detail='Пользователь с таким email уже зарегистрирован'
        )
    user = User(email=userData.email)
    user.hashedPassword = pwd_context.hash(userData.hashedPassword)
    db.add(user)
    db.commit()
    return {
        "id": user.id,
        "email": user.email,
    }
