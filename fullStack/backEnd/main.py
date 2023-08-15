from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware




if __name__ == '__main__':

    app = FastAPI()

    # app.add_middleware(
    #     CORSMiddleware,
    #     allow_origins=["*"],  # Разрешить любые источники (можно настроить для конкретных источников)
    #     allow_credentials=True,  # Разрешить отправлять куки
    #     allow_methods=["*"],  # Разрешить любые HTTP-методы
    #     allow_headers=["*"],  # Разрешить любые заголовки
    # )


    # регистрация роутеров
    # app.include_router(
    #
    # )