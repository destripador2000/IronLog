from sqlmodel import SQLModel, Field

class RoutineBase(SQLModel, table=True):
    id_routine: int = Field(default=None, primary_key=True)
    name_routine: str
    day_routine: str
    user_id: int = Field(default=None, foreign_key=True)