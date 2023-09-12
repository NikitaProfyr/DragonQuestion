
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from router.UserRouter import userRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить любые источники (можно настроить для конкретных источников)
    allow_credentials=True,  # Разрешить отправлять куки
    allow_methods=["*"],  # Разрешить любые HTTP-методы
    allow_headers=["*"],  # Разрешить любые заголовки
)


# регистрация роутеров

app.include_router(
    router=userRouter,
    prefix='/users',
)

