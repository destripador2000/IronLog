import bcrypt
from fastapi import HTTPException, Cookie, Depends
from typing import Annotated 
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from core.config import settings
from database.db import get_session
from sqlmodel import Session, select
from models.md_Users import UserBase

# Función para hashear (Convertir texto a hash seguro)
def hash_password(password: str) -> str:
    # 1. Convertimos el password (texto) a bytes, que es lo que pide la librería
    pwd_bytes = password.encode('utf-8')

    # 2. Generamos un "salt" (ruido aleatorio)
    salt = bcrypt.gensalt()

    # 3. Hasheamos
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)

    # 4. Devolvemos el hash como string para guardarlo en la BD
    return hashed_password.decode('utf-8')

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    # 1. Copiamos los datos para no modificar el original
    to_encode = data.copy()

    # 2. Definimos cuándo caduca
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    # 3. Añadimos la fecha de expiración al diccionario
    to_encode.update({"exp": expire})

    # 4. Codificamos el JWT usando la Clave Secreta y el Algoritmo
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    return encoded_jwt

# Función para verificar (Comparar texto plano contra hash guardado)
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # 1. Convertimos ambos a bytes
    password_byte_enc = plain_password.encode('utf-8')
    hashed_password_byte_enc = hashed_password.encode('utf-8')

    # 2. La librería se encarga de comparar de forma segura
    return bcrypt.checkpw(password_byte_enc, hashed_password_byte_enc)

def get_current_user(access_token: Annotated[str| None, Cookie()] = None, 
                    session: Session = Depends(get_session)):
    
    print(f"DEBUG: Token recibido en cookie: {access_token}") 

    
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials")
    
    if access_token is None:
        raise credentials_exception
    
    try:
        print(f"DEBUG: Usando SECRET_KEY: {settings.SECRET_KEY[:5]}...")
        payload = jwt.decode(access_token, key=settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username = payload.get("sub")
        print(f"DEBUG: Token decodificado: {payload}")
        if username is None:
            raise credentials_exception
    except JWTError as e:
        print(f"DEBUG: Error al decodificar: {e}")
        raise credentials_exception
    user = session.exec(select(UserBase).where(UserBase.username == username)).first()
    if user is None:
        raise credentials_exception
    return user