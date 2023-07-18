"""
Author: fantiga
Date: 2023-07-18 22:53:28
LastEditTime: 2023-07-18 23:49:10
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

# from fastapi.templating import Jinja2Templates
from starlette.status import HTTP_302_FOUND
from fastapi.staticfiles import StaticFiles
from app.configs import Config
from app.utilities.session import Session
from app.utilities.save_image import save_image
from app.models.auth import AuthModel
from app.models.articles import ArticleModel
from app.utilities.check_login import check_login

app = Flask(__name__)


app = FastAPI()
app.mount("/app/statics", StaticFiles(directory="app/statics"), name="static")
# templates = Jinja2Templates(directory="/app/templates")
config = Config()
session = Session(config)

"""
跨域支持
"""
CORS(app, resources=r"/*")


@app.route(r"/login", methods=["POST"])
def login(request: Request, username: str = Form(...), password: str = Form(...)):
    """
    登录
    """
    auth_model = AuthModel(config)
    [result, user] = auth_model.login(username, password)
    # if not result:
    # ユーザが存在しなければトップページへ戻す
    # return templates.TemplateResponse("index.html", {"request": request, "error": "ユーザ名またはパスワードが間違っています"})
    response = RedirectResponse("/articles", status_code=HTTP_302_FOUND)
    session_id = session.set("user", user)
    response.set_cookie("session_id", session_id)
    return response


@app.route(r"/register", methods=["POST"])
def register(
    request: Request,
    username: str = Form(...),
    mail_adsress: str = Form(...),
    password: str = Form(...),
    rePassword: str = Form(...),
):
    """
    注册
    """
    auth_model = AuthModel(config)
    auth_model.create_user(username, password)
    user = auth_model.find_user_by_name_and_password(username, password)
    response = RedirectResponse(url="/articles", status_code=HTTP_302_FOUND)
    session_id = session.set("user", user)
    response.set_cookie("session_id", session_id)
    return response


@app.route(r"/getLevelList", methods=["POST"])
def getLevelList():
    """
    获取级别列表
    """
    return


@app.route(r"/getGameList", methods=["POST"])
def getGameList():
    """
    获取棋局列表
    """
    return


if __name__ == "__main__":
    app.run(debug=False)
