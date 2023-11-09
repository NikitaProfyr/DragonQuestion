from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


testUser = {"userName": "testUserName", "password": "testPassword"}


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




