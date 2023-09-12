from collections import OrderedDict

from typing import Optional
from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    id: int
    email: EmailStr
    hashedPassword: str
    userName: Optional[str] = None

    class Config:
        from_attributes = True


class UserBase(BaseModel):
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserLite(UserBase):
    id: int


class TokenSchema(BaseModel):
    accesToken: str