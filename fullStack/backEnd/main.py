from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routers.UserRouter import userRouter
from routers.QuizRouter import quizRouter

app = FastAPI(
    title="IBD App",
    description="IBD Corporation - perfect, fast, cheap.",
    contact={
        "name":"Toporov Denis, Profyr Nikita"
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Разрешить любые источники (можно настроить для конкретных источников)
    allow_credentials=True,  # Разрешить отправлять куки
    allow_methods=["POST", "GET", "DELETE", "PUT"],  # Разрешить любые HTTP-методы
    allow_headers=["*"],  # Разрешить любые заголовки
)

# регистрация роутеров

app.include_router(
    router=userRouter,
    prefix='/users',
)

app.include_router(
    router=quizRouter,
)
