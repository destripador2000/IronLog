from sqlmodel import SQLModel, Field

class UserBase(SQLModel, table=True):
    
    id: int = Field(default=None, primary_key=True)
    username: str 
    password: str