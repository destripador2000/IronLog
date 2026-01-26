from sqlmodel import SQLModel, Field

class ExerciseBase(SQLModel, table=True):
    id_exercise: int = Field(default=None, primary_key=True)
    name_exercise: str
    series: int
    reps: int
    routine_id: int = Field(default=None, foreign_key=True)