from typing import List

from fastapi import UploadFile, File, Form
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
    id: int
    title: str
    description: str
    image: str
    question: List[QuestionSchema]


class AnswerFormDataSchema(BaseModel):
    title: str = Form(...)
    right: bool = Form(...)


class QuestionFormDataSchema(BaseModel):
    title: str = Form(...)
    answer: List[AnswerFormDataSchema]


class QuizFormDataSchema(BaseModel):
    title: str = Form(...)
    description: str = Form(...)
    image: UploadFile = File(...)
    question: List[QuestionFormDataSchema]










