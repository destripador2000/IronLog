from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List
from core.security import get_current_user
from schemas.sch_Routine import RoutineCreate, RoutineSchema, RoutineRead
from schemas.sch_Users import UserRead
from models.md_Routine import RoutineBase as RoutineModel
from models.md_Users import UserBase
from models.md_Exercise import ExerciseBase as ExerciseModel
from database.db import get_session 
from sqlmodel import Session, select

router = APIRouter()

@router.post("/routines", response_model=RoutineSchema)
def create_routine(routine_data: RoutineCreate,
                    current_user: Annotated[UserBase, Depends(get_current_user)],
                    session: Session = Depends(get_session)):

    new_routine = RoutineModel(name_routine=routine_data.name_routine,
                                day_routine=routine_data.day_routine,
                                user_id=current_user.id)

    session.add(new_routine)
    session.commit()
    session.refresh(new_routine)

    for list_exercise in routine_data.exercises:
        new_exercise = ExerciseModel(name_exercise= list_exercise.name_exercise,
                                    series=list_exercise.series,
                                    reps=list_exercise.reps,
                                    routine_id=new_routine.id_routine)
        session.add(new_exercise)
    session.commit()
    return new_routine

@router.get("/see_routine", response_model= list[RoutineRead])
def get_exercise(current_user: Annotated[UserRead, Depends(get_current_user)],
                session: Session = Depends(get_session)):
    filtro = session.exec(select(RoutineModel).where(RoutineModel.user_id == current_user.id)).all()
    
    if not filtro:
        raise  HTTPException(status_code=404, detail="Routine not found")
    
    return filtro