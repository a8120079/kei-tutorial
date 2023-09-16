"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-09-16 16:43:36
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/crud.py
"""

import time
from sqlalchemy.orm import Session
from .models import Game, Record, Step
from .schemas import StepCreate, RecordCreate


# 获取所有 game
def get_games(db: Session):
    return db.query(Game).all()


# 根据 id 获取 game
def get_game(db: Session, game_id: int):
    return db.query(Game).filter(Game.game_id == game_id).first()


def create_record(db: Session, record: RecordCreate):
    db_record = Record(
        username=record.username,
        level=record.level,
        create_time=time.strftime(r"%Y-%m-%d %H:%M:%S", time.localtime()),
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record


def create_step(db: Session, step: StepCreate, record_id: int):
    db_step = Step(**step.model_dump(), record_id=record_id)
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step
