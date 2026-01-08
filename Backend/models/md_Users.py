from sqlmodel import SQLModel, Field

class UserBase(SQLModel, table=True):
    
    id: int = Field(default=None, primary_key=True)
    names: str
    last_names: str
    phone: str
    birth_date: str
    cdi: str
    gender: str
    username: str 
    password: str
    email: str

    