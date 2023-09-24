"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-09-16 16:39:55
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/schemas.py
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


# Game 的基类,表示创建和查询 Game 时共有的属性
class GameBase(BaseModel):
    level: int
    game_name: str
    init_script: str
    exec_script: str


# 创建 Game 时的 Model
class GameCreate(GameBase):
    pass


# 查询 Game 时的 Model
class Game(GameBase):
    game_id: int

    # 向 Pydantic 提供配置
    class Config:
        #  from_attributes 会告诉 Pydantic 模型读取数据，即使它不是字典，而是 ORM 模型（或任何其他具有属性的任意对象）
        from_attributes = True


class RecordBase(BaseModel):
    user_name: str
    is_correct: int
    cost_time: str


class RecordCreate(RecordBase):
    game_id: int


class Record(RecordBase):
    record_id: int
    game_name: str
    level: int
    create_time: Optional[datetime] = None

    class Config:
        from_attributes = True
