/*
 * @Author: fantiga
 * @Date: 2023-07-18 22:35:44
 * @LastEditTime: 2023-07-18 23:42:53
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Game.tsx
 */
import Head from "@/components/Head";
import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface IBoardElements {
  x: number;
  y: number;
  row: number;
  col: number;
  stone: number;
}

const Game: FC = () => {
  const boardSize = 9;
  const intersectionSize = 30;
  const boardWidth = boardSize * intersectionSize;

  // Declare the boardState to keep track of the stones on the board
  const initialBoardState = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(0)
  );
  const [boardState, setBoardState] = useState<number[][]>(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [boardElements, setBoardElements] = useState<IBoardElements[]>([]);

  /**
   * Function to handle placing stones
   *
   * @param row
   * @param col
   */
  const placeStone = (row: number, col: number) => {
    if (boardState[row][col] === 0) {
      const newBoardState = [...boardState];
      newBoardState[row][col] = currentPlayer;
      setBoardState(newBoardState);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  /**
   * Function to render the intersections and stones based on the boardState
   *
   * @returns {IBoardElements[]}
   */
  const renderBoard = (): IBoardElements[] => {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const x = col * intersectionSize;
        const y = row * intersectionSize;
        const stone = boardState[row][col];

        boardElements.push({
          x,
          y,
          row,
          col,
          stone,
        });
      }
    }

    return boardElements;
  };

  // 交差線を表示する関数
  // const drawLines = () => {
  //   const board = document.getElementById("board")!;
  //   // Get left, top offset of the element
  //   // const boardLeft = board.offsetLeft;
  //   // const boardTop = board.offsetTop;

  //   for (let i = 0; i < boardSize; i++) {
  //     for (let j = 0; j < boardSize; j++) {
  //       const intersection = document.createElement("div");
  //       intersection.className = "intersection";
  //       intersection.style.left = i * 30 + "px";
  //       intersection.style.top = j * 30 + "px";
  //       board.appendChild(intersection);
  //     }
  //   }

  //   for (let i = 0; i < boardSize; i++) {
  //     const verticalLine = document.createElement("div");
  //     verticalLine.className = "line vertical-line";
  //     verticalLine.style.left = i * 30 + 15 + "px";
  //     board.appendChild(verticalLine);

  //     const horizontalLine = document.createElement("div");
  //     horizontalLine.className = "line horizontal-line";
  //     horizontalLine.style.top = i * 30 + 15 + "px";
  //     board.appendChild(horizontalLine);
  //   }
  // };

  // // 交差線を描画
  // drawLines();

  useEffect(() => {
    const elements: IBoardElements[] = [];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const x = col * intersectionSize;
        const y = row * intersectionSize;
        const stone = boardState[row][col];

        elements.push({
          x,
          y,
          row,
          col,
          stone,
        });
      }
    }
    console.log(elements);
    setBoardElements(elements);
    console.log(boardElements);
  }, [boardState, currentPlayer]);

  /*
    // 囲碁のボードのサイズ（9x9）
    const boardSize = 9;

    // 最初の基盤の状態
    // const initialBoardState = [
    //     [1, 1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    // ];

    // ボード上の交差点の座標
    const intersectionPoints: IBoardElements[] = [];
    let boardLeft = 0;
    let boardTop = 0;
    let stone_coor = new Array(boardSize * boardSize).fill(0);
    console.log(stone_coor[0]);

    // 交差点の座標を計算
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const x = i * 30 + 15;
        const y = j * 30 + 15;
        intersectionPoints.push({ x, y });
      }
    }

    // 石を置く関数
    function placeStone(this: HTMLElement, event: MouseEvent) {
      // クリックしたところの座標をキャッチ
      const x = event.clientX - boardLeft;
      const y = event.clientY - boardTop;
      // console.log(boardLeft, boardTop, x, y);

      // 最も近い交差点を見つける
      let nearestPoint = null;
      let shortestDistance = Infinity;
      let bar_num = 0;
      for (let i = 0; i < intersectionPoints.length; i++) {
        const point = intersectionPoints[i];
        const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestPoint = point;
          bar_num = i;
        }
      }

      console.log(bar_num);
      if (stone_coor[bar_num] !== 0) return;
      stone_coor[bar_num] = currentPlayer;

      // 石を置く

      const stone = document.createElement("div");
      stone.className = "stone";
      stone.style.left = nearestPoint?.x + "px";
      stone.style.top = nearestPoint?.y + "px";
      stone.classList.add(currentPlayer === 1 ? "black" : "white");
      document.getElementById("board")?.appendChild(stone);

      currentPlayer = currentPlayer === 1 ? 2 : 1; // プレイヤーを交互に切り替える
    }

    // クリックイベントリスナーを追加
    document.getElementById("board")?.addEventListener("click", placeStone);

    // 黒石か白石かを保持する変数
    let currentPlayer = 1; // 1: 黒石, 2: 白石

    // 交差線を表示する関数
    function drawLines() {
      const board = document.getElementById("board")!;
      // Get left, top offset of the element
      boardLeft = board.offsetLeft;
      boardTop = board.offsetTop;

      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          const intersection = document.createElement("div");
          intersection.className = "intersection";
          intersection.style.left = i * 30 + "px";
          intersection.style.top = j * 30 + "px";
          board.appendChild(intersection);
        }
      }

      for (let i = 0; i < boardSize; i++) {
        const verticalLine = document.createElement("div");
        verticalLine.className = "line vertical-line";
        verticalLine.style.left = i * 30 + 15 + "px";
        board.appendChild(verticalLine);

        const horizontalLine = document.createElement("div");
        horizontalLine.className = "line horizontal-line";
        horizontalLine.style.top = i * 30 + 15 + "px";
        board.appendChild(horizontalLine);
      }
    }

    // 交差線を描画
    drawLines();
  */
  return (
    <>
      <Head />
      <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
        <Grid item>
          <div
            id="board"
            style={{
              position: "relative",
              width: `${boardWidth}px`,
              height: `${boardWidth}px`,
              border: "1px solid #000",
            }}
          >
            {boardElements.map((item, index) => (
              <div
                key={`intersection-${item.row}-${item.col}-${index}`}
                className="intersection"
                style={{ left: `${item.x}px`, top: `${item.y}px` }}
                onClick={() => placeStone(item.row, item.col)}
              >
                {item.stone === 1 && <div className="stone black" />}
                {item.stone === 2 && <div className="stone white" />}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Game;
