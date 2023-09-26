from sqlalchemy.orm import Session

from model.QuizSchema import QuestionSchema, QuizSchema, AnswerSchema
from model.Quiz import Question, Quiz, Answer
from model.Settings import get_db
from sqlalchemy import select
from fastapi import HTTPException, Depends

from model.UserSchema import UserLite


def createAnswer(idQuestion: int, anwerData: AnswerSchema, db: Session = Depends(get_db)):
    anwer = Answer(title=anwerData.title, right=anwerData.right, questionId=idQuestion)
    db.add(anwer)
    db.commit()


def createQuestion(idQuiz: int, questionData: QuestionSchema, db: Session = Depends(get_db)):
    question = Question(title=questionData.title, quizId=idQuiz)
    db.add(question)
    db.commit()

    for itemAnswer in questionData.answer:
        createAnswer(anwerData=itemAnswer, db=db)


def createQuiz(quizData: QuizSchema, userData: UserLite, db: Session = Depends(get_db)):
    quiz = Quiz(title=quizData.title, description=quizData.description, image=quizData.image, authorId=userData.id)
    db.add(quiz)
    db.commit()

    for itemQuistion in quizData.question:
        createQuestion(idQuiz=quiz.id, questionData=itemQuistion, db=db)



