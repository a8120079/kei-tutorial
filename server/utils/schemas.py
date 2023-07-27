"""
Author: fantiga
Date: 2023-07-26 22:06:54
LastEditTime: 2023-07-26 22:14:33
LastEditors: fantiga
FilePath: /kei-tutorial/users/fantiga/projects/kei-tutorial/server/myapp/schemas.py
"""

from typing import Optional
from pydantic import BaseModel


class GameBase(BaseModel):
    level: int
    game_name: str | None = None
    init_script: str | None = None
    exec_script: str | None = None


class GameCreate(GameBase):
    pass


class Game(GameBase):
    game_id: int

    class Config:
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
