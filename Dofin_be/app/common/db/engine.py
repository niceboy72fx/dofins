from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool

# from config.settings import settings


#SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://admin:1@192.168.1.107:5432/dofin"
SQLALCHEMY_DATABASE_URI = "postgresql+psycopg2://admin:1@db:5432/dofin"


def get_engine():
    # engine = create_engine(
    #     # settings.SQLALCHEMY_DATABASE_URI,
    #     SQLALCHEMY_DATABASE_URI,
    #     pool_pre_ping=True,
    #     poolclass=NullPool,
    #     executemany_mode="values",
    #     executemany_values_page_size=10000,
    #     executemany_batch_page_size=50000,
    # )
    engine = create_engine(
        SQLALCHEMY_DATABASE_URI,
        pool_pre_ping=True,
        poolclass=NullPool,
    )

    return engine
