from sqlmodel import SQLModel
from pydantic import BaseModel
class UserSchema(SQLModel):
    names: str
    last_names: str
    phone: str
    birth_date: str
    cdi: str
    gender: str
    email: str
    username: str
    password: str


class UserCreate(UserSchema):
    names: str
    last_names: str
    phone: str
    birth_date: str
    cdi: str
    gender: str
    email: str
    username: str
    password: str

class UserRead(UserSchema):
    id: int
    names: str
    last_names: str
    phone: str
    birth_date: str
    cdi: str
    gender: str
    email: str
    username: str

class UserLogin(BaseModel):
    username: str
    password: str