from sqlalchemy import (
    Column,
    String,
    DateTime,
    Float,
    Integer,
    Date,
    BigInteger,
    Double,
    ForeignKey,
    UniqueConstraint,
    Boolean,
)
from sqlalchemy.orm import relationship
from .base import CommonModel
from datetime import datetime


class Tickers(CommonModel):
    __tablename__ = "tickers"

    symbol = Column(String(length=15), primary_key=True, nullable=False)
    exchange = Column(String(length=10), nullable=False)
    company = Column(String(length=100))
    industry = Column(String(length=100))
    risk_group = Column(String(length=100))
    stock_size = Column(String(length=100))
    priority_level = Column(String(length=100))
    adjustment_coefficient = Column(Float())
    dofin_selected = Column(Boolean(), default=False)

    # Define relationship with lazy loading for d1_records
    d1_records = relationship(
        "D1", back_populates="ticker", lazy="select", order_by="desc(D1.date)"
    )

    # Define relationship with lazy loading for finance_records
    finance_records = relationship(
        "Finances",
        back_populates="ticker",
        lazy="select",
        order_by="desc(Finances.date)",
    )


class D1(CommonModel):
    __tablename__ = "d1"

    id = Column(Integer, primary_key=True)
    date = Column(Date())
    high = Column(Float())
    low = Column(Float())
    open = Column(Float())
    close = Column(Float())
    average = Column(Float())
    volume = Column(BigInteger())

    symbol = Column(String(length=15), ForeignKey("tickers.symbol"), nullable=False)

    ticker = relationship("Tickers", back_populates="d1_records")

    __table_args__ = (UniqueConstraint("symbol", "date", name="_symbol_date_uc"),)


class Finances(CommonModel):
    __tablename__ = "finances"

    id = Column(Integer, primary_key=True)
    date = Column(Date())
    shares_out_standing = Column(BigInteger())
    free_shares = Column(BigInteger())
    market_cap = Column(BigInteger())

    symbol = Column(String(length=15), ForeignKey("tickers.symbol"), nullable=False)
    ticker = relationship("Tickers", back_populates="finance_records")

    __table_args__ = (UniqueConstraint("symbol", "date", name="_symbol_date_fn"),)
