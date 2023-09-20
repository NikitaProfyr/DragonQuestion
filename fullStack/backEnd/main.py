from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routers.UserRouter import userRouter

app = FastAPI(
    title="IBD App",
    description="IBD Corporation - perfect, fast, cheap.",
    contact={
        "name":"Toporov Denis, Profyr Nikita"
    }
)

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

