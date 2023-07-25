"""
Author: fantiga
Date: 2023-07-24 22:15:04
LastEditTime: 2023-07-24 22:17:19
LastEditors: fantiga
FilePath: /kei-tutorial/server/crud.py
"""
import time
from sqlalchemy.orm import Session

from . import models, schemas




def get_games(db: Session):
    return db.query(models.Game).all()


def create_record(db: Session, record: schemas.RecordCreate):
    db_record = models.Record(
        username=record.username,
        level=record.level,
        create_time=time.strftime(r"%Y-%m-%d %H:%M:%S", time.localtime()),
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_recordc


def create_step(db: Session, step: schemas.StepCreate, record_id: int):
    db_step = models.Step(**step.dict(), record_id=record_id)
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step

