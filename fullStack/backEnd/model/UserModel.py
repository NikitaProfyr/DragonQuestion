from sqlalchemy.orm import relationship

from model.settings import Base

from sqlalchemy import Column, Integer, String, ForeignKey


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, unique=True)
    hashedPassword = Column(String)
    userName = Column(String, nullable=True)
    firstName = Column(String, nullable=True)
    lastName = Column(String, nullable=True)

    Token = relationship("Token", back_populates="User")


class Token(Base):
    __tablename__ = "Token"

    id = Column(Integer, primary_key=True, index=True)

    accesToken = Column(String, unique=True, index=True)
    userId = Column(Integer, ForeignKey("User.id"))
    User = relationship("User", back_populates="Token")