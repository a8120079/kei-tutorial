"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-09-16 16:39:55
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/schemas.py
"""

from typing import Optional
from pydantic import BaseModel


# Game 的基类,表示创建和查询 Game 时共有的属性
class GameBase(BaseModel):
    level: int
    game_name: str | None = None
    init_script: str | None = None
    exec_script: str | None = None


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


class StepBase(BaseModel):
    username: str
    is_correct: bool
    uptime: str


class StepCreate(StepBase):
    pass


class Step(StepBase):
    steps_id: int
    record_id: int
    is_active: bool

    class Config:
        from_attributes = True


class RecordBase(BaseModel):
    username: str
    level: int
    create_time: Optional[str] = None


class RecordCreate(RecordBase):
    pass


class Record(RecordBase):
    record_id: int
    steps: list[Step] = []

    class Config:
        from_attributes = True
