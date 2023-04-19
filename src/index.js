/*
 * @Author: fantiga
 * @Date: 2023-04-04 20:42:07
 * @LastEditTime: 2023-04-19 21:36:22
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/src/index.js
 */
import "./styles.css";

/** 棋盘尺寸 */
const boardSize = 19;
/** 初始化游戏对象数组 */
const board = [];
/** 获取棋盘DOM */
const boardElement = document.getElementById("board");

/**
 * @name: 绘制棋盘
 * @returns {void}
 */
const createBoard = () => {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      const _div = document.createElement("div");
      _div.className = "chess-line";

      _div.id = "location-" + i + "-" + j;
      /** 增加单元格 */
      boardElement?.appendChild(_div);

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

export default createBoard();
