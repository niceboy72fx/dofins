from fastapi import FastAPI, APIRouter, Query, Depends
from sqlalchemy.orm import Session
from config.extensions import exception_handler as custom_exec
from config.logger import logger
from schemas import Tickers, TickersBase, PaginatedResponse
from typing import List, Optional
from service import display,update_data
from models import Industry
from fastapi import BackgroundTasks
from common.db import ScopedSession

router = APIRouter()


@router.get("/display", response_model=PaginatedResponse)
async def all_market(
    page_number: int = Query(1, ge=1),
    items_per_page: int = Query(10, ge=1, le=100),
    d1_limit: int = Query(7, ge=1),
    finance_limit: int = Query(1, ge=1),
    db: Session = Depends(ScopedSession),
):
    return display.get_all_market(
        db, page_number, items_per_page, d1_limit, finance_limit
    )


@router.get("/dofin_selected", response_model=PaginatedResponse)
async def dofin_selected(
    industries: Industry = None,
    page_number: int = Query(1, ge=1),
    items_per_page: int = Query(10, ge=1, le=100),
    d1_limit: int = Query(7, ge=1),
    finance_limit: int = Query(1, ge=1),
    db: Session = Depends(ScopedSession),
):
    return display.get_dofin_selected(
        db, page_number, items_per_page, d1_limit, finance_limit, industry=industries
    )


@router.post("/update_data")
def update(background_tasks: BackgroundTasks):
    background_tasks.add_task(update_data.update_all_data())
    return {"message": "update is processing in the background"}
