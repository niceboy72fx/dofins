FROM python:3.11

RUN apt-get update && apt-get install -y libpq-dev gcc git tk

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


CMD pip install -r requirements.txt

CMD alembic upgrade head

CMD uvicorn main:app --reload 
