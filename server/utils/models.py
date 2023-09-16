"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-09-16 16:33:19
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/models.py
"""

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Game(Base):
    # 1、表名
    __tablename__ = "games"

    # 2、类属性，每一个都代表数据表中的一列
    # Column 就是列的意思
    # Integer、String、Boolean 就是数据表中，列的类型
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

    record = relationship("Record", back_populates="step")
