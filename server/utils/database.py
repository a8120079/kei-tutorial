"""
Author: fantiga
Date: 2023-07-27 22:45:02
LastEditTime: 2023-09-09 20:42:40
LastEditors: fantiga
FilePath: /kei-tutorial/server/utils/database.py
"""


from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 为 SQLAlchemy 定义数据库 URL地址
SQLALCHEMY_DATABASE_URL = r"sqlite:///./db/kei_game.db"

"""
connect_args={"check_same_thread": False} 仅用于SQLite,在其他数据库不需要它。
默认情况下,SQLite 只允许一个线程与其通信，假设有多个线程的话，也只将处理一个独立的请求。
这是为了防止意外地为不同的事物（不同的请求）共享相同的连接。
但是在 FastAPI 中,普遍使用def函数,多个线程可以为同一个请求与数据库交互,所以我们需要使用connect_args={"check_same_thread": False}来让SQLite允许这样。
此外，我们将确保每个请求都在依赖项中获得自己的数据库连接会话，因此不需要该默认机制。
"""
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 创建一个SessionLocal类¶
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 使用declarative_base()返回一个类。
Base = declarative_base()


# Session = sessionmaker(bind=engine)
# session = Session()
