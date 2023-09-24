from typing import List

from pydantic import BaseModel



class AnswerSchema(BaseModel):
    id: int
    title: str
    right: bool


class QuestionSchema(BaseModel):
    id: int
    title: str
    answer: List[AnswerSchema]


class QuizSchema(BaseModel):
    id: int
    title: str
    description: str
    image: str
    question: List[QuestionSchema]










