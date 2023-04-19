/*
 * @Author: fantiga
 * @Date: 2023-04-04 20:42:07
 * @LastEditTime: 2023-04-19 21:41:46
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
 * 绘制棋盘
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

/**
 * 创建棋子元素
 * @param {number} x
 * @param {number} y
 * @param {string} color
 */
const createChess = (x, y, color) => {
  const chessDiv = document.createElement("div");
  chessDiv.className = "chess " + color;
  chessDiv.style.left = x * 24 + "px";
  chessDiv.style.top = y * 24 + "px";
  /** 增加单元格 */
  boardElement?.appendChild(chessDiv);
};

const generateChessCoordinates = (offset) => {
  const value = offset - 15;
  if (value < 15) return 0;

};

/**
 * 响应点击事件，实现落子
 */
boardElement?.addEventListener("click", (event) => {
  // console.log("1", event, event.offsetX, event.offsetY);
  // console.log("2", generateChessCoordinates(event.), generateChessCoordinates(event.layerY));
  const x = Math.floor(event.offsetX);
  const y = Math.floor(event.offsetY);
  // if (board[x][y] === 0) {
  // /** 假设玩家执黑子 */
  board[x][y] = 1;
  createChess(x, y, "black");
});

export default createBoard();
