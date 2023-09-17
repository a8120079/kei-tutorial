"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-09-16 16:43:36
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/crud.py
"""

import time
from sqlalchemy.orm import Session
from .models import Game, Record
from .schemas import RecordCreate


# 获取所有 game
def get_games(db: Session):
    return db.query(Game).all()


# 根据 id 获取 game
def get_game(db: Session, game_id: int):
    return db.query(Game).filter(Game.game_id == game_id).first()


# 获取所有 record
def get_records(db: Session):
    return db.query(Record).all()


# 创建 record，record 类型是 Pydantic Model
def create_record(
    db: Session,
    record: RecordCreate,
    game_id: int,
):
    db_record = Record(
        **record.model_dump(),
        game_id=game_id,
        game_name=record.game_name,
        user_name=record.user_name,
        level=record.level,
        is_correct=record.is_correct,
        cost_time=record.cost_time,
        create_time=time.strftime(r"%Y-%m-%d %H:%M:%S", time.localtime()),
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record
