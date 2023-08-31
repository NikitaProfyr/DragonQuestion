from pydantic import BaseModel, EmailStr


class UserSchema(BaseModel):
    id: int
    email: EmailStr
    hashedPassword: str
    userName: str
    firstName: str
    lastName: str

    class Config:
        from_attributes = True


class UserRegistrationSchema(BaseModel):
    email: EmailStr
    hashedPassword: str
