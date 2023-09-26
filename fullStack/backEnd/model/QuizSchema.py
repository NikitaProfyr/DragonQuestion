from typing import List

from pydantic import BaseModel



class AnswerSchema(BaseModel):
    title: str
    right: bool


class QuestionSchema(BaseModel):
    title: str
    answer: List[AnswerSchema]


class QuizSchema(BaseModel):
    title: str
    description: str
    image: str
    question: List[QuestionSchema]










