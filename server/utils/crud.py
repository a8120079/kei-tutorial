"""
Author: fantiga
Date: 2023-09-18 13:16:58
LastEditTime: 2023-09-23 23:55:25
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/crud.py
"""

import datetime
from sqlalchemy.orm import Session
from .models import Game, Record
from .schemas import RecordCreate


# 获取所有 game
def get_games(db: Session):
    return db.query(Game).all()


# 根据 game_id 获取 game
def get_game(db: Session, game_id: int):
    return db.query(Game).filter(Game.game_id == game_id).first()


# 根据 game_id 获取下一条 game_id
def get_next_game(db: Session, game_id: int):
    next_id = game_id + 1
    games = get_games(db)

    for game in games:
        if game.game_id == next_id:
            return game

    return {"message": "下一条记录不存在"}


# 获取所有 record
def get_records(db: Session):
    return db.query(Record).all()


# 创建 record，record 类型是 Pydantic Model
def create_record(
    db: Session,
    record: RecordCreate,
):
    game = db.query(Game).filter(Game.game_id == record.game_id).first()

    db_record = Record(
        game_id=record.game_id,
        game_name=game.game_name,
        user_name=record.user_name,
        level=game.level,
        is_correct=record.is_correct,
        cost_time=record.cost_time,
        create_time=datetime.datetime.now(),
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    db.close
    return db_record
