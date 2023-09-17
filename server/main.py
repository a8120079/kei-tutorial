"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-08-13 14:39:09
LastEditors: fantiga
FilePath: /kei-tutorial/server/main.py
"""


from fastapi import Body, Depends, FastAPI, Path
from sqlalchemy.orm import Session
from utils import (
    crud,
    schemas,
    database,
)
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


# 依赖项,获取数据库会话对象
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 获取棋局列表
@app.get("/game_list", response_model=list[schemas.Game])
async def getGameList(db: Session = Depends(get_db)):
    return crud.get_games(db)


# 根据 {game_id} 获取棋局
@app.get("/game_id/{game_id}", response_model=schemas.Game)
async def getGame(game_id: int = Path(...), db: Session = Depends(get_db)):
    return crud.get_game(db, game_id)


# 获取记录列表
@app.get("/record_list", response_model=list[schemas.Record])
async def getRecordList(db: Session = Depends(get_db)):
    return crud.get_records(db)


# 创建 record
@app.post("/game_id/{game_id}/records", response_model=schemas.Record)
async def postRecord(
    game_id: int = Path(...),
    record: schemas.RecordCreate = Body(...),
    db: Session = Depends(get_db),
):
    return crud.create_record(db, record, game_id)
