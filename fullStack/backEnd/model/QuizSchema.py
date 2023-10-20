from typing import List

from fastapi import UploadFile, File
from pydantic import BaseModel, Field, FilePath


class AnswerSchema(BaseModel):
    # id: int
    title: str
    right: bool


class QuestionSchema(BaseModel):
    # id: int
    title: str
    answer: List[AnswerSchema]


class QuizSchema(BaseModel):
    # id: int
    title: str
    description: str
    image: UploadFile = File(...)
    question: List[QuestionSchema]










