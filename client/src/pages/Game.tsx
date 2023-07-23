import Head from "@/components/Head";
import { Button, Grid } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

// 定义IBoardElements的形式
interface IBoardElements {
  x: number;
  y: number;
  row: number;
  col: number;
  stone: number;
}

const tempScript: [number, number, boolean][] = [[3, 2, true], [2, 3, true], [2, 5, true], [3, 5, false], [4, 5, false], [4, 4, false], [4, 3, false], [4, 6, false]];
const tempScript2: [number, number, boolean][] = [[1, 5, true]];

// Declare the boardState to keep track of the stones on the board
const initialBoardState: number[][] = [
  Array(9).fill(0),
  Array(9).fill(0),
  Array(9).fill(0),
  Array(9).fill(0),
  Array(9).fill(0),
  Array(9).fill(0),
  Array(9).fill(0),
  Array(9).fill(0),
  Array(9).fill(0),
];

const boardSize = 9;
const intersectionSize = 30;
const boardWidth = boardSize * intersectionSize;

const Game: FC = () => {
  // 棋盘状态
  const [boardState, setBoardState] = useState<number[][]>(initialBoardState);
  // 棋子轮替，true=白；false=黑
  const [currentPlayer, setCurrentPlayer] = useState<boolean>(false);
  const [boardElements, setBoardElements] = useState<IBoardElements[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);

  const checkAnswer = useCallback((row: number, col: number) => {
    setIsCorrect((row === 1 && col === 0) ? true : false);
    setNextBtnDisabled((row === 1 && col === 0) ? false : true);
  }, []);

  /**
   * 放棋子的方程
   *
   * @param row
   * @param col
   */
  const placeStone = useCallback((row: number, col: number, player: boolean = currentPlayer) => {
    if (boardState[row][col] === 0) {
      const newBoardState = [...boardState];
      newBoardState[row][col] = player === true ? 2 : 1;
      setBoardState(newBoardState);
      setCurrentPlayer(!player);
      checkAnswer(row, col);
    }
    console.log(row, col);
  }, [boardState]);

  // 在最初的棋盘上画横线和竖线
  useEffect(() => {
    const board = document.getElementById("board");
    if (board) {
      for (let i = 0; i < boardSize; i++) {
        const verticalLine = document.createElement("div");
        verticalLine.className = "line vertical-line";
        verticalLine.style.left = `${i * intersectionSize}px`;
        board.appendChild(verticalLine);
        board.appendChild(verticalLine);

        const horizontalLine = document.createElement("div");
        horizontalLine.className = "line horizontal-line";
        horizontalLine.style.top = `${i * intersectionSize}px`;
        board.appendChild(horizontalLine);
      }
    }
  }, [boardSize]);

  useEffect(() => {
    const elements: IBoardElements[] = [];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const x = col * intersectionSize + 5;
        const y = row * intersectionSize + 5;
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
    // console.log(elements);
    setBoardElements(elements);

  }, [boardState, currentPlayer]);

  useEffect(() => {
    for (let i = 0; i < tempScript.length; i++) {
      placeStone(tempScript[i][0], tempScript[i][1], tempScript[i][2]);
    }
  }, []);

  return (
    <>
      {/* 把棋盘显示在页面上 */}
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
                style={{ left: `${item.x}px`, top: `${item.y}px`, }}
                onClick={() => placeStone(item.row, item.col)}

              >
                {item.stone === 1 && <div className="stone black" />}
                {item.stone === 2 && <div className="stone white" />}
              </div>

            ))}
          </div>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px", marginTop: "6px" }}>
            <Grid item>
              <Button variant="contained" disabled={nextBtnDisabled}>NEXT</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {
        isCorrect !== null ? (
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {
                  isCorrect === true ? (
                    <Alert severity="success">
                      <AlertTitle>Success</AlertTitle>
                      This is a success alert — <strong>check it out!</strong>
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      不正解 — <strong>check it out!</strong>
                    </Alert>
                  )
                }
              </Stack>
            </Grid>
          </Grid>
        )
          :
          <></>
      }
    </>
  );
};

export default Game;
