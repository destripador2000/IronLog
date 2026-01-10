from fastapi import APIRouter, Depends, HTTPException, Response
from schemas.sch_Users import UserLogin
from database.db import SessionDep
from models.md_Users import UserBase
from core.security import verify_password, create_access_token
from sqlmodel import select

router = APIRouter()

@router.post("/token")
async def login_for_access_token(session: SessionDep,
                                response: Response, 
                                credentials: UserLogin):
    filtro = session.exec(select(UserBase).where(UserBase.username == credentials.username)).first()

    if not filtro or not verify_password(credentials.password, filtro.password):
        raise HTTPException(status_code=404, detail="User not found")

    response.set_cookie(
        key="access_token",
        value=create_access_token(data={"sub": filtro.username}),
        httponly=True
    )

    return "Login exitoso"