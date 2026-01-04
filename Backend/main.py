from fastapi import FastAPI
from database.db import on_table_and_database
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    on_table_and_database()
    print("Base de datos y tablas viven")
    yield
    print("Base de datos y tablas mueren")

app = FastAPI(lifespan=lifespan)

@app.get("/")
def home():
    return {"mensaje": "Servidor funcionando", "estado": "ok"}