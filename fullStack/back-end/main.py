
from fastapi import FastAPI, Request, Depends
from fastapi_cache.backends.redis import RedisBackend


from fastapi_cache import FastAPICache
from redis import asyncio as aioredis
from fastapi.middleware.cors import CORSMiddleware

from routers.UserRouter import userPublicRouter, userPrivateRouter
from routers.QuizRouter import quizPrivateRouter, quizPublicRouter
from dotenv import load_dotenv
from os import getenv

from fastapi_pagination import add_pagination

load_dotenv()

origins = [
    "http://localhost:3000",
    "http://localhost:3000/",
]


app = FastAPI(
    title="IBD App",
    description="IBD Corporation - perfect, fast, cheap.",
    contact={"name": "Toporov Denis, Profyr Nikita"},
)

add_pagination(app)

# регистрация роутеров

app.include_router(
    router=userPublicRouter,
    prefix="/users",
)

app.include_router(
    router=userPrivateRouter,
    prefix="/users",
)

app.include_router(
    router=quizPrivateRouter,
)

app.include_router(
    router=quizPublicRouter,
)


@app.on_event("startup")
async def startup_event():
    redis = aioredis.from_url(
        # "redis://redis", encoding="utf8", decode_responses=True
        f"redis://{getenv('REDIS_HOST')}", encoding="utf8", decode_responses=True
    )
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,  # Разрешить отправлять куки
    allow_methods=["POST", "GET", "DELETE", "PUT"],  # Разрешить любые HTTP-методы
    allow_headers=["*"],  # Разрешить любые заголовки
)


