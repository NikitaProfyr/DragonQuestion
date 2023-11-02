from model.Settings import Base
from sqlalchemy import Column, ForeignKey, Integer, String, BOOLEAN
from sqlalchemy.orm import relationship


class Answer(Base):
    __tablename__ = 'Answer'

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    right = Column(BOOLEAN, nullable=False)

    questionId = Column(Integer, ForeignKey('Question.id', ondelete='CASCADE'))
    question = relationship('Question', backref='Answer', cascade='all, delete')


class Question(Base):
    __tablename__ = 'Question'

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(String, nullable=False)

    quizId = Column(Integer, ForeignKey('Quiz.id', ondelete='CASCADE'))
    quiz = relationship('Quiz', backref='Question', cascade='all, delete')

    answer = relationship('Answer', backref='Question', cascade='all, delete')


class Quiz(Base):
    __tablename__ = 'Quiz'

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=True)

    authorId = Column(Integer, ForeignKey('User.id', ondelete='CASCADE'))

    author = relationship('User', backref='Quiz', cascade='all, delete')
    question = relationship('Question', backref='Quiz', cascade='all, delete', passive_deletes=True)


class QuizResults(Base):
    __tablename__ = 'QuizResults'

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    userId = Column(Integer, ForeignKey('User.id', ondelete='CASCADE'))
    quizId = Column(Integer, ForeignKey('Quiz.id', ondelete='CASCADE'))
    result = Column(Integer)

    user = relationship('User', backref='QuizResults')
    quiz = relationship('Quiz', backref='QuizResults')
