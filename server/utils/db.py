"""
Author: fantiga
Date: 2023-07-17 21:40:22
LastEditTime: 2023-07-17 21:40:22
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/db.py
"""

import os
import sqlite3


class Db:
    """
    用于操作数据库的封装
    """

    def __init__(self) -> None:
        # 数据库文件
        self.db_file = r"../db/kei_game.db"
        self.db = os.path.join(os.path.dirname(__file__), self.db_file)
        # 连接到SQLite数据库
        # 如果文件不存在，会自动在当前目录创建
        self.conn = sqlite3.connect(self.db)
        # 创建一个Cursor
        self.cur = self.conn.cursor()

    def insertTableData(self, sql):
        """
        插入记录并返回新id
        """
        self.cur.execute(sql)
        lastrowid = self.cur.lastrowid
        self.conn.commit()
        return lastrowid

    def selectTableData(self, sql):
        """
        查询并返回记录
        """
        self.cur.execute(sql)
        self.conn.commit()
        # 数据集
        get_table_data = self.cur.fetchall()
        # 表结构
        get_table_fields = self.cur.description
        return [get_table_fields, get_table_data]

    def selectRankNum(self, sql):
        """
        查询并返回排名
        """
        self.cur.execute(sql)
        self.conn.commit()
        # 单条数据
        return self.cur.fetchone()

    def closeDatabase(self):
        """
        关闭数据库
        """
        self.cur.close()
        self.conn.close()
