from model.settings import Base

from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    hashedPassword = Column(String)
    userName = Column(String, nullable=True)
    firstName = Column(String, nullable=True)
    lastName = Column(String, nullable=True)
