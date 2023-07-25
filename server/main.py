"""
Author: fantiga
Date: 2023-07-18 22:53:28
LastEditTime: 2023-07-19 23:38:19
LastEditors: fantiga
FilePath: /kei-tutorial/server/main.py
"""

import json
import time

import flask
from flask import Flask
from flask import request as flask_request
from flask_cors import CORS

from server.utils.db import Db
from fastapi import FastAPI, Request, Form, Cookie, UploadFile
from fastapi.responses import RedirectResponse

from fastapi.templating import Jinja2Templates
from starlette.status import HTTP_302_FOUND
from fastapi.staticfiles import StaticFiles
from .database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from . import crud, models, schemas

models.Base.metadata.create_all(bind=engine)

app = Flask(__name__)
app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

"""
跨域支持
"""
CORS(app, resources=r"/*")

headers = {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
}


@app.post("/getLevelList", response_model=schemas.level)
def getLevelList(level: schemas.levelCreate, db: Session = Depends(get_db)):
    
    """
    获取级别列表
    """
    
    return crud.create_getLevelList(db=db, level=level)


    db = Db()
    # 拼接sql语句
    sql = 'SELECT game_id, game_name, level, init_script, exec_script FROM "main"."games" ORDER BY game_id ASC'
    data = db.getAllData(sql)

    # 定义表结构的列表
    column_list = []

    # 提取字段，追加到列表中
    for i in field_name:
        column_list.append(i[0])

    # 定义存储sql数据的list
    sql_list = []
    # 按行对sql数据进行循环
    for rank_num, row in enumerate(field_data):
        # 表数据与表结构对应 存入字典中
        result = {}
        for i in range(len(row)):
            result[i] = row[i]
        # 字典存入list中
        sql_list.append(result)

    db.closeDatabase()

    return sql_list


@app.post("/getGameList", response_model=schemas.Game)
def getGameList(game: schemas.GameCreate, db: Session = Depends(get_db)):
    """
    获取棋局列表
    """
    return crud.get_games(db=db, game=game)


@app.post("/getrecordList", response_model=schemas.Record)
def getrecordList(game: schemas.GameCreate, db: Session = Depends(get_db)):
    """
    获取记录列表
    """
    return crud.create_record(db=db, game=game)


@app.post("/getstepList", response_model=schemas.Step)
def getstepList(game: schemas.Step, db: Session = Depends(get_db)):
    """
    获取手顺列表
    """
    return crud.create_step(db=db, game=game)



if __name__ == "__main__":
    app.run(debug=False)
