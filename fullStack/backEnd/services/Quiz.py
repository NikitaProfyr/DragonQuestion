from sqlalchemy.orm import Session

from model.QuizSchema import QuestionSchema, QuizSchema, AnswerSchema
from model.Quiz import Question, Quiz, Answer
from model.Settings import get_db
from sqlalchemy import select
from fastapi import HTTPException, Depends

from model.UserSchema import UserLite


def createQuiz(quizData: QuizSchema, userData: UserLite, db: Session = Depends(get_db)):

    quiz = Quiz(title=quizData.title, description=quizData.description, authorId=userData.id)
    db.add(quiz)
    db.commit()

    for itemQuistion in quizData.question:
        question = Question(title=itemQuistion.title)
        db.add(question)
        db.commit()

        for itemAnswer in itemQuistion.answer:
            answer = Answer(title=itemAnswer.title, right=itemAnswer.right, questionId=question.id)
            db.add(answer)
            db.commit()



