/*
 * @Author: fantiga
 * @Date: 2023-03-30 22:38:29
 * @LastEditTime: 2023-03-30 22:51:32
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/src/index copy.js
 */
/*
 * @Author: fantiga
 * @Date: 2023-03-29 12:01:21
 * @LastEditTime: 2023-03-30 22:36:25
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/src/index.js
 */

import "./styles.css";

/** 棋盘尺寸 */
const boardSize = 19;
/** 初始化游戏对象数组 */
const board = [];
/** 获取棋盘DOM */
const boardDiv = document.getElementById("board");

/**
 * @name: 绘制棋盘
 * @return {*}
 */
const createBoard = () => {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      let _div = document.createElement("div");
      _div.className = "chess-line";

      _div.id = "location-" + i + "-" + j;
      /** 增加单元格 */
      boardDiv.appendChild(_div);

      if (i === 0) {
        _div.className += " top";
      }
      if (i === boardSize - 1) {
        _div.className += " bottom";
      }
      if (j === 0) {
        _div.className += " left";
      }
      if (j === boardSize - 1) {
        _div.className += " right";
      }
    }
  }
};


/**
 * @name: 创建棋子元素
 * @param {number} x
 * @param {number} y
 * @param {string} color
 * @return {volid}
 */
const createChess = (x, y, color) => {
  const chessDiv = document.createElement("div");
  chessDiv.className = "chess " + color;
  chessDiv.style.left = x * 24 + "px";
  chessDiv.style.top = y * 24 + "px";
  boardDiv.appendChild(chessDiv);
};

/** 落子 */
boardDiv.addEventListener("click", (event) => {
  const x = Math.floor(event.offsetX / 24);
  const y = Math.floor(event.offsetY / 24);
  if (board[x][y] === 0) {
    /** 假设玩家执黑子 */
    board[x][y] = 1;
    createChess(x, y, "black");
  }
});

createBoard();
