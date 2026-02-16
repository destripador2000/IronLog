from sqlmodel import SQLModel
from pydantic import BaseModel

class ExerciseSchema(SQLModel):
    id_exercise: int
    name_exercise: str
    series: int
    reps: int
    routine_id: int

class ExerciseCreate(BaseModel):
    name_exercise: str
    series: int
    reps: int
