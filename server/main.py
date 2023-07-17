"""
Author: fantiga
Date: 2023-07-17 21:40:56
LastEditTime: 2023-07-17 21:40:56
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

app = Flask(__name__)

"""
跨域支持
"""
CORS(app, resources=r"/*")


@app.route(r"/login", methods=["POST"])
def login():
    """
    登录
    """
    return


@app.route(r"/register", methods=["POST"])
def register():
    """
    注册
    """
    return


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
