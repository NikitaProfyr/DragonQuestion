from fastapi import Depends
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from main import app
from model.Settings import get_db
from model.UserSchema import UserBase, UserId
from services.User import createToken, getCurrentUser, getUser

client = TestClient(app)


testUser = {"userName": "testUserName", "password": "testPassword"}
testToken = createToken(testUser)


def testRegistration():
    response = client.post(
        "/users/logup", json=testUser
    )
    assert response.status_code == 200  # Успешная регистрация
    response = client.post(
        "/users/logup", json=testUser
    )
    assert response.status_code == 400  # Повторная регистрация


def testAuthorization():
    response = client.post(
        "/users/login", json=testUser
    )
    assert response.status_code == 200  # Успешная авторизация.
    response = client.post(
        "/users/login", json={"userName": "testUserName", "password": "fakePassword"}
    )
    assert response.status_code == 401  # Не существует пользователя с данным логином или некорректный пароль.


def testDeleteUser():
    response = client.post(f"/users/getUser?token={testToken}")
    # testIdUser = {"id": f"{response.json().get('id')}"}

    response = client.delete(f"/users/delete?userId={response.json().get('id')}", headers={"Authorization": testToken})
    assert response.status_code == 200




