from fastapi import APIRouter, Depends
from schemas.sch_Users import UserRead, UserCreate
from sqlmodel import Session
from database.db import get_session 
from core.security import hash_password
from models.md_Users import UserBase as UserModel
from typing import Annotated
from core.security import get_current_user

router = APIRouter()

@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    
    hashed_password = hash_password(user.password)

    new_user = UserModel(username=user.username, 
                        password=hashed_password,
                        names=user.names,
                        last_names=user.last_names,
                        phone=user.phone,
                        birth_date=user.birth_date,
                        cdi=user.cdi,
                        gender=user.gender,
                        email=user.email
                        )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

@router.get("/me", response_model=UserRead)
async def read_users_me(
    current_user: Annotated[UserRead, Depends(get_current_user)]    
):
    return current_user