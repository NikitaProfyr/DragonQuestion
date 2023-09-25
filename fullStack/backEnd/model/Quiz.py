from model.Settings import Base
from sqlalchemy import Column, ForeignKey, Integer, String, BOOLEAN
from sqlalchemy.orm import relationship


class Answer(Base):
    __tablename__ = 'Answer'

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    right = Column(BOOLEAN, nullable=False)

    questionId = Column(Integer, ForeignKey('Question.id'))
    question = relationship('Question', backref='Answer')


class Question(Base):
    __tablename__ = 'Question'

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(String, nullable=False)

    quizId = Column(Integer, ForeignKey('Quiz.id'))
    quiz = relationship('Quiz', backref='Question')

    answer = relationship('Answer', backref = 'Question')


class Quiz(Base):
    __tablename__ = 'Quiz'

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=True)

    authorId = Column(Integer, ForeignKey('User.id'))

    author = relationship('User', backref = 'Quiz')
    question = relationship('Question', backref = 'Quiz')
