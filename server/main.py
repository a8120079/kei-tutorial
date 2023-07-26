"""
Author: fantiga
Date: 2023-07-25 22:49:39
LastEditTime: 2023-07-25 23:13:09
LastEditors: fantiga
FilePath: /kei-tutorial/server/main.py
"""

from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy.orm import Session
from myapp import (
    crud,
    models,
    schemas,
    database,
)  # Replace 'myapp' with your package name
from datetime import datetime  # Import the datetime module for type hint
from fastapi.middleware.cors import CORSMiddleware


database.Base.metadata.create_all(bind=database.engine)


app = FastAPI()

"""
    跨域支持
 """

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/getGameList", response_model=list[schemas.Game])
def getGameList(db: Session = Depends(get_db)):
    """
    获取棋局列表
    """

    return crud.get_games(db)


# @app.post("/getrecordList", response_model=schemas.Record)
# def getrecordList(game: schemas.GameCreate, db: Session = Depends(get_db)):
#     """
#     获取记录列表
#     """
#     return crud.create_record(db=db, game=game)


# @app.post("/getstepList", response_model=schemas.Step)
# def getstepList(game: schemas.Step, db: Session = Depends(get_db)):
#     """
#     获取手顺列表
#     """
#     return crud.create_step(db=db, game=game)


# if __name__ == "__main__":
#     app.run(debug=False)
