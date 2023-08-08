import Head from "@/components/Head";
import { Button, Grid } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useLocation } from "react-router-dom";
import { GameTitle } from "@/components/GameTitle";
import axios, { formatFormUrlencoded } from "@/utils/axios";

// 定义IBoardElements的形式
interface IBoardElements {
  x: number;
  y: number;
  row: number;
  col: number;
  stone: number;
}

// 定义脚本
const tempScript: [number, number, boolean][] = [[2, 1, false], [3, 1, false], [2, 2, false], [2, 3, false], [2, 4, false], [2, 5, false], [2, 6, false], [2, 7, false], [3, 7, false], [3, 8, false], [4, 8, false], [5, 8, false], [6, 1, false], [6, 2, false], [6, 3, false], [6, 4, false], [6, 5, false], [6, 6, false], [6, 7, false], [4, 1, true], [3, 2, true], [3, 3, true], [3, 4, true], [3, 5, true], [4, 7, true], [5, 7, true], [5, 6, true], [5, 5, true], [5, 4, true], [5, 3, true], [5, 2, true], [5, 1, false], [4, 4, true]];
const tempScript2: [number, number, boolean][] = [[0, 2, false]];

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
  const { gameId } = useLocation().state;
  const controller = new AbortController();

  // 棋盘状态
  const [boardState, setBoardState] = useState<number[][]>(initialBoardState);

  // 棋子轮替，true=白；false=黑
  const [currentPlayer, setCurrentPlayer] = useState<boolean>(false);
  const [boardElements, setBoardElements] = useState<IBoardElements[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);
  const [initialStonesPlaced, setInitialStonesPlaced] = useState<boolean>(false);

  const resetBoard = useCallback(() => {
    setBoardState(initialBoardState);
    setCurrentPlayer(false);
    setNextBtnDisabled(true);
    setIsCorrect(null);
    setBoardElements([]); // Clear the board elements
  }, []);

  // Function to handle the "Replay" button click
  const handleRePlayButtonClick = useCallback(() => {
    resetBoard();
  }, [resetBoard]);

  /**
   * 放棋子的方程
   *
   * @param row
   * @param col
   */
  const placeStone = useCallback((row: number, col: number, player: boolean = currentPlayer) => {
    if (boardState[row][col] === 0) {
      const newBoardState = [...boardState];
      newBoardState[row][col] = player === false ? 1 : 2;
      setBoardState(newBoardState);
      setCurrentPlayer(!player);
      const isCorrectPlacement = tempScript2.some(
        ([r, c, _]) => row === r && col === c
      );
      console.log("isCorrectPlacement:", isCorrectPlacement); // デバッグのために追加
      setIsCorrect(isCorrectPlacement);
      setNextBtnDisabled(isCorrectPlacement);
    }
    // console.log(row, col);
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
    setInitialStonesPlaced(true);
  }, []);

  // 异步获取 Game 数据
  useEffect(() => {
    axios
      .post(
        '/getGame',
        formatFormUrlencoded({
          action: 'post',
          game_id: gameId
        }),
      )
      .then((e) => {
        console.log(e);
        // if (e.data && Array.isArray(e.data)) {
        //   // 如果异步获取的数据不为空
        //   // 写入 gameList
        //   setGameList(e.data);
        // } else {
        //   throw new Error('response is error');
        // }
      })
      .catch((err) => {
        console.error('err=', err);
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      {/* 把棋盘显示在页面上 */}
      <Head />
      <GameTitle userName={sessionStorage.getItem("userName") ?? ""} gameId={gameId} />
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
          <Grid container justifyContent="center" spacing={2} sx={{ padding: "6px", marginTop: "6px" }}>
            <Grid item>
              <Button variant="contained" disabled={nextBtnDisabled} onClick={handleRePlayButtonClick}>Replay</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" disabled={nextBtnDisabled}>Next</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* show error/correct message */}
      {
        isCorrect !== null && (
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {
                  isCorrect ? (
                    <Alert severity="success">
                      <AlertTitle>正解</AlertTitle>
                    </Alert>
                  ) : (
                    <>
                      <Alert severity="error">
                        <AlertTitle>不正解</AlertTitle>
                      </Alert>
                    </>
                  )
                }
              </Stack>
            </Grid>
          </Grid>
        )
      }
    </>
  );
};

export default Game;
