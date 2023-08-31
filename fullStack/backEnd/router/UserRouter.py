from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Annotated
from model.settings import get_db

from view.user import get_user
from controller.user import registerUser
from model.UserModel import User
from model.UserModelSchema import UserSchema, UserRegistrationSchema

userRouter = APIRouter()


@userRouter.get('/', response_model=List[UserSchema])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_user(db, skip=skip, limit=limit)
    return users


@userRouter.post('', response_model=UserRegistrationSchema, status_code=201)
def registration_user(user_data: UserRegistrationSchema, db: Session = Depends(get_db)):
    return registerUser(db=db, userData=user_data)
