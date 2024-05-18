from typing import List, Optional
from .base import BaseObjectResponse, BaseListResponse, BaseORMResponse
from datetime import date
from pydantic import BaseModel


class TickersBase(BaseORMResponse):
    symbol: str
    exchange: str
    company: Optional[str]
    industry: Optional[str]
    risk_group: Optional[str]
    stock_size: Optional[str]
    priority_level: Optional[str]
    adjustment_coefficient: Optional[float]


class Tickers(TickersBase):
    d1_records: List["D1Base"]
    finance_records: List["FinancesBase"]


class PaginatedResponse(BaseModel):
    page: int
    items_per_page: int
    total_items: int
    total_pages: int
    items: List[Tickers]


class D1Base(BaseORMResponse):
    date: date
    high: Optional[float]
    low: Optional[float]
    open: Optional[float]
    close: Optional[float]
    average: Optional[float]
    volume: Optional[int]
    symbol: str


class D1(D1Base):
    id: int
    ticker: Tickers


class FinancesBase(BaseORMResponse):
    date: date
    shares_out_standing: Optional[int]
    free_shares: Optional[int]
    market_cap: Optional[int]
    symbol: Optional[str]


class Finances(FinancesBase):
    id: int
    ticker: Tickers
