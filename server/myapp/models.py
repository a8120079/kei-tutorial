"""
Author: fantiga
Date: 2023-07-25 22:49:39
LastEditTime: 2023-07-25 22:58:24
LastEditors: fantiga
FilePath: /kei-tutorial/server/models.py
"""
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Game(Base):
    __tablename__ = "games"

    game_id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    game_name = Column(String)
    level = Column(Integer)
    init_script = Column(String)
    exec_script = Column(String)


class Record(Base):
    __tablename__ = "records"

    record_id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    username = Column(String)
    level = Column(Integer)
    create_time = Column(DateTime)

    step = relationship("Step", back_populates="record")


class Step(Base):
    __tablename__ = "steps"

    steps_id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    username = Column(String)
    record_id = Column(Integer, ForeignKey("records.record_id"))
    is_correct = Column(Boolean)
    uptime = Column(DateTime)

    record = relationship("Record", back_populates="steps")
