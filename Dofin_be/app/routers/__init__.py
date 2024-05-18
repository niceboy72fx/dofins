from fastapi import APIRouter
from .display import router as market_router

router = APIRouter()
router.include_router(market_router, prefix="/data", tags=["market"])
