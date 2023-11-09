"""
Настройка движка базы данных
"""

from sqlalchemy import create_engine

# from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
from os import getenv

load_dotenv()

POSTGRE_URL = f"postgresql+psycopg2://{getenv('POSTGRES_USER')}:{getenv('POSTGRES_PASSWORD')}@127.0.0.1:5432/DQDB"

engine = create_engine(POSTGRE_URL, echo=True, future=True)


# Base = DeclarativeBase()
class Base(DeclarativeBase):
    ...


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
