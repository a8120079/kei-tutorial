"""
Author: fantiga
Date: 2023-07-24 22:17:33
LastEditTime: 2023-07-24 22:17:34
LastEditors: fantiga
FilePath: /kei-tutorial/server/schemas.py
"""
from pydantic import BaseModel


class GameBase(BaseModel):
    level: int
    game_name : str | None = None
    init_script: str | None = None
    exec_script: str | None = None


class GameCreate(GameBase):
    pass


class Game(GameBase):
    game_id: int

    class Config:
        orm_mode = True


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
        orm_mode = True


class RecordBase(BaseModel):
    username: str
    level: int
    create_time = str


class RecordCreate(RecordBase):
    pass


class Record(RecordBase):
    record_id: int
    steps: list[Step] = []

    class Config:
        orm_mode = True
