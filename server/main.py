"""
Author: fantiga
Date: 2023-09-16 23:12:14
LastEditTime: 2023-09-23 23:46:14
LastEditors: fantiga
FilePath: /kei-tutorial/server/main.py
"""

from fastapi import Body, Depends, FastAPI, Path
from fastapi.exceptions import RequestValidationError, ResponseValidationError
from fastapi.responses import JSONResponse
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
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ResponseValidationError)
async def response_validation_exception_handler(response, exc):
    error_details = []
    for error in exc.errors():
        # 获取错误消息和位置信息
        error_msg = error["msg"]
        loc = ".".join(str(loc) for loc in error["loc"])
        value = error.get("value")  # 获取出错的值
        error_details.append({"error": error_msg, "location": loc, "value": value})
    return JSONResponse(content=error_details, status_code=400)


@app.exception_handler(RequestValidationError)
async def request_validation_exception_handler(request, exc):
    error_details = []
    for error in exc.errors():
        # 获取错误消息和位置信息
        error_msg = error["msg"]
        loc = ".".join(str(loc) for loc in error["loc"])
        value = error  # 获取出错的值
        error_details.append({"error": error_msg, "location": loc, "value": value})
    return JSONResponse(content={"errors": error_details}, status_code=400)


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


# 根据 {game_id} 获取下一个棋局
@app.get("/next_by_game_id/{game_id}", response_model=schemas.Game)
async def getNextGame(game_id: int = Path(...), db: Session = Depends(get_db)):
    return crud.get_next_game(db, game_id)


# 获取记录列表
@app.get("/record_list", response_model=list[schemas.Record])
async def getRecordList(db: Session = Depends(get_db)):
    return crud.get_records(db)


# 创建 record
@app.post("/create_record", response_model=schemas.Record)
async def postRecord(
    record: schemas.RecordCreate = Body(...),
    db: Session = Depends(get_db),
):
    return crud.create_record(
        db,
        record,
    )
