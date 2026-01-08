from fastapi import FastAPI
from database.db import on_table_and_database
from contextlib import asynccontextmanager
from router.rt_Users import router as user_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    on_table_and_database()
    print("Base de datos y tablas viven")
    yield
    print("Base de datos y tablas mueren")

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   
    allow_credentials=True,
    allow_methods=["*"],     
    allow_headers=["*"],     
)

app.include_router(user_router, prefix="/users", tags=["users"])


@app.get("/")
def home():
    return {"mensaje": "Servidor funcionando", "estado": "ok"}