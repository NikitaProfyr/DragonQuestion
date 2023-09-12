from fastapi.security import APIKeyHeader
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

apikey_scheme = APIKeyHeader(name="Authorization")


SECRET_KEY = "24a8ebb43f522c837b3b65dc0251a22e041787f520f94cc95872d6954c3587e2"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30