"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-09-16 16:39:55
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/schemas.py
"""

from typing import List, Optional
from pydantic import BaseModel


class RecordBase(BaseModel):
    game_name: str
    user_name: str
    level: int
    is_correct: bool
    cost_time: str
    create_time: Optional[str] = None


class RecordCreate(RecordBase):
    pass


class Record(RecordBase):
    record_id: int
    game_id: int

    class Config:
        from_attributes = True


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
    records: List[Record] = []

    # 向 Pydantic 提供配置
    class Config:
        #  from_attributes 会告诉 Pydantic 模型读取数据，即使它不是字典，而是 ORM 模型（或任何其他具有属性的任意对象）
        from_attributes = True
