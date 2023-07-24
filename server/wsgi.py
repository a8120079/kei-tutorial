"""
Author: fantiga
Date: 2023-07-15 17:45:25
LastEditTime: 2023-07-17 21:12:35
LastEditors: fantiga
FilePath: /kei-tutorial/server/wsgi.py
"""

from main import app as application

# import sys
# sys.path.insert(0, r"/var/www/2048.ued.team/")

if __name__ == "__main__":
    application.run()
