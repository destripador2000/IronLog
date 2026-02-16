from sqlmodel import SQLModel
from pydantic import BaseModel
from schemas.sch_Exercise import ExerciseCreate

class RoutineSchema(SQLModel):
    id_routine: int
    name_routine: str
    day_routine: str
    user_id: int
    exercises: set[str] = set()

class RoutineCreate(BaseModel):
    name_routine: str
    day_routine: str
    exercises: list[ExerciseCreate] = []

class RoutineRead(BaseModel):
    id_routine: int
    name_routine: str
    day_routine: str