"""
Регистрация моделей для миграций.
Импортируй свои классы моделей(таблицы) сюда, прежде чем начать миграции
"""

from model.settings import Base
from model.UserModel import User, Token