import Head from "@/components/Head";
import { Button, Grid } from "@mui/material";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useLocation } from "react-router-dom";
import { GameTitle } from "@/components/GameTitle";
import axios, { formatFormUrlencoded } from "@/utils/axios";
import { BoardElements, GameFields } from "@/types";

// 棋盘单边可落子数
const boardSize = 9;
// 交叉点数
const intersectionSize = 30;
// 棋盘宽度
const boardWidth = boardSize * intersectionSize;

const Game: FC = () => {
  const { gameId } = useLocation().state;
  const controller = new AbortController();

  // 初始化棋盘
  const initialBoardState: number[][] = [];
  const initial = () => {
    for (let i = 0; i < boardSize; i++) {
      initialBoardState[i] = [];
      for (let j = 0; j < boardSize; j++) {
        initialBoardState[i][j] = 0;
      }
    }
    return initialBoardState;
  };

  // 设置计时器
  const [now, setNow] = useState<Date>(new Date());
  const [isRun, setIsRun] = useState<boolean>(true);
  const [timer, setTimer] = useState<string>("00:00:00");
  const [costTime, setCostTime] = useState<string>("00:00:00");
  // 棋盘状态
  const [boardState, setBoardState] = useState<number[][]>(initial());
  // 棋子轮替，true=白；false=黑
  const [currentPlayer, setCurrentPlayer] = useState<boolean>(false);
  const [boardElements, setBoardElements] = useState<BoardElements[]>([]);
  // 正解状态，true=正解；false=不正解
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  // Replay 按钮可用状态，true=不可用；false=可用
  const [btnReplayDisabled, setReplayBtnDisabled] = useState<boolean>(true);
  // Next 按钮可用状态，true=不可用；false=可用
  const [btnNextDisabled, setNextBtnDisabled] = useState<boolean>(true);
  // 用户是否已落子
  const [initialStonesPlaced, setInitialStonesPlaced] = useState<boolean>(false);
  // 设置初始脚本 initScript 和正确脚本 execScript
  const currentInitScript = useRef<[number, number, boolean][]>([]);
  const [initScript, setInitScript] = useState<[number, number, boolean][]>([]);
  const [execScript, setExecScript] = useState<[number, number, boolean][]>([]);

  /**
   * 自定义钩子
   * 计时器
   *
   * @param {() => void} callback
   * @param {number} delay
   */
  const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef<() => void>(() => { });

    const pauseTimer = (id: NodeJS.Timeout) => clearInterval(id);

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        if (!isRun) {
          pauseTimer(id);
        }
        // return () => pauseTimer(id);
        return () => clearInterval(id);
      }
    }, [delay, isRun]);
  };

  /**
   * 重置棋盘
   */
  const resetBoard = useCallback(() => {
    setNow(new Date());
    setIsRun(true);
    setTimer("00:00:00");
    setCostTime("00:00:00");
    setBoardState(initial());
    setCurrentPlayer(false);
    setBoardElements([]);
    setIsCorrect(false);
    setReplayBtnDisabled(true);
    setNextBtnDisabled(true);
    setInitialStonesPlaced(false);

    initPlaceStone();

  }, [initScript, execScript]);

  /**
   * 放棋子的方程
   *
   * @param {number} row
   * @param {number} col
   * @param {boolean} player
   */
  const placeStone = useCallback((row: number, col: number, player: boolean = currentPlayer) => {
    const newBoardState: number[][] = [...boardState];
    newBoardState[row][col] = player === false ? 1 : 2;
    setBoardState(newBoardState);
    setCurrentPlayer(!player);

    // 判断落子坐标是否和正确坐标相符
    if (execScript.some(([r, c, _]) => row === r && col === c)) {
      setIsCorrect(true);
      setNextBtnDisabled(false);
      setIsRun(false);
    }
  }, [boardState, initScript, execScript]);

  /**
   * 响应手动落子事件
   *
   * @param {number} row
   * @param {number} col
   */
  const handlePlaceStoneClick = useCallback((row: number, col: number) => {
    setInitialStonesPlaced(true);
    setReplayBtnDisabled(false);
    placeStone(row, col);
  }, [execScript]);

  const initPlaceStone = useCallback(() => {
    for (let i = 0; i < currentInitScript.current.length; i++) {
      placeStone(currentInitScript.current[i][0], currentInitScript.current[i][1], currentInitScript.current[i][2]);
    }
  }, [currentInitScript, initScript, execScript]);

  /**
   * 响应 Replay 按钮事件
   */
  // const handleReplayClick = useCallback(() => {
  //   resetBoard();
  // }, []);

  /**
   * 响应 Next 按钮事件
   */
  const handleNextClick = useCallback(async () => {
    await axios
      .post(
        '/game_id/' + gameId + "/records",
        formatFormUrlencoded({
          user_name: sessionStorage.getItem("userName") ?? "",
        })
      )
      .then(({ data }: { data: GameFields; }) => {
        console.log(data);
        if (data) {
          setInitScript(JSON.parse(data.init_script));
        } else {
          throw new Error('response is error');
        }
      })
      .catch((err) => {
        console.error('err=', err);
      });
  }, []);

  /**
   * 在最初的棋盘上画横线和竖线
   */
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
  }, []);

  useEffect(() => {
    const elements: BoardElements[] = [];

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
    setBoardElements(elements);
  }, [boardState]);

  /**
   * 对初始棋谱进行落子
   */
  useEffect(() => {
    initPlaceStone();
  }, [initScript]);

  /**
   * 异步获取 Game 数据
   */
  useEffect(() => {
    axios
      .get(
        '/game_id/' + gameId,
      )
      .then(({ data }: { data: GameFields; }) => {
        if (data) {
          /**
           * 如果异步获取的数据不为空
           * 由于是字符串类型，需要先转成JSON格式
           * 再写入 initScript 和 execScript
           */
          currentInitScript.current = JSON.parse(data.init_script);
          setInitScript(JSON.parse(data.init_script));
          setExecScript(JSON.parse(data.exec_script));
        } else {
          throw new Error('response is error');
        }
      })
      .catch((err) => {
        console.error('err=', err);
      });

    return () => controller.abort();
  }, []);

  /**
   * 计时器
   */
  useInterval(() => {
    const currentTime = new Date();
    const elapsedTimeInSeconds = Math.floor((currentTime.getTime() - now.getTime()) / 1000);
    const hours = Math.floor(elapsedTimeInSeconds / 3600);
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
    const seconds = elapsedTimeInSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setTimer(formattedTime);
  }, 1000);

  /**
   * 初期表示1
   * 重置棋盘
   */
  useEffect(() => {
    resetBoard();
  }, []);

  return (
    <>
      {/* 把棋盘显示在页面上 */}
      <Head />
      <GameTitle
        userName={sessionStorage.getItem("userName") ?? ""}
        gameId={gameId}
        timer={timer}
      />
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
                onClick={() => handlePlaceStoneClick(item.row, item.col)}
              >
                {item.stone === 1 && <div className="stone black" />}
                {item.stone === 2 && <div className="stone white" />}
              </div>

            ))}
          </div>
          <Grid container justifyContent="center" spacing={2} sx={{ padding: "6px", marginTop: "6px" }}>
            {/* <Grid item>
              <Button variant="contained" disabled={btnReplayDisabled} onClick={handleReplayClick}>Replay</Button>
            </Grid> */}
            <Grid item>
              <Button variant="contained" disabled={btnNextDisabled} onClick={handleNextClick}>Next</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {
        initialStonesPlaced && (
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Stack sx={{ width: '100%' }} spacing={2}>
                {
                  isCorrect ? (
                    <Alert severity="success">
                      <AlertTitle>正解</AlertTitle>
                    </Alert>
                  ) : (
                    <Alert severity="error">
                      <AlertTitle>不正解</AlertTitle>
                    </Alert>
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
