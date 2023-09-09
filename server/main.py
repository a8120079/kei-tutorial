"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-08-13 14:39:09
LastEditors: fantiga
FilePath: /kei-tutorial/server/main.py
"""


from fastapi import Depends, FastAPI, HTTPException, Form, Body
from pydantic import BaseModel
from sqlalchemy.orm import Session
from utils import (
    crud,
    models,
    schemas,
    database,
)
from datetime import datetime  # Import the datetime module for type hint
from fastapi.middleware.cors import CORSMiddleware


database.Base.metadata.create_all(bind=database.engine)

app = FastAPI()


"""
跨域支持
"""

origins = ["*"]

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


@app.get("/getGameList", response_model=list[schemas.Game])
def getGameList(db: Session = Depends(get_db)):
    """
    获取棋局列表
    """

    return crud.get_games(db)


@app.post("/getGame/", response_model=list[schemas.Game])
def getGame(game_id: int = Form(), db: Session = Depends(get_db)):
    """
    通过 {game_id} 获取棋局
    """
    db_game = crud.get_game(db, game_id=game_id)

    print("aaaaaa", db_game)
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return db_game


# @app.get("/users/{user_id}/items/{item_id}")
# async def read_user_item(
#     user_id: int, item_id: str, q: Union[str, None] = None, short: bool = False
# ):
#     item = {"item_id": item_id, "owner_id": user_id}
#     if q:
#         item.update({"q": q})
#     if not short:
#         item.update(
#             {"description": "This is an amazing item that has a long description"}
#         )
#     return item


# @app.post("/getRecordList", response_model=schemas.Record)
# def getRecordList(game: schemas.GameCreate, db: Session = Depends(get_db)):
#     """
#     获取记录列表
#     """
#     return crud.create_record(db=db, game=game)


# @app.post("/getStepList", response_model=schemas.Step)
# def getStepList(game: schemas.Step, db: Session = Depends(get_db)):
#     """
#     获取手顺列表
#     """
#     return crud.create_step(db=db, game=game)
