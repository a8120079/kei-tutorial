import Head from "@/components/Head";
import { Grid } from "@mui/material";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";
import { GameTitle } from "@/components/GameTitle";
import axios from "@/utils/axios";
import { BoardElements, GameFields, RecordFields } from "@/types";

// 棋盘单边可落子数
const boardSize = 9;
// 交叉点数
const intersectionSize = 30;
// 棋盘宽度
const boardWidth = boardSize * intersectionSize;

const Game: FC = () => {
  const { gameId } = useLocation().state;
  // const [currentGameId, setCurrentGameId] = useState<number>(gameId);
  const currentGameId = useRef<number>(gameId);
  const controller = new AbortController();

  // 设置计时器
  const [now, setNow] = useState<Date>(new Date());
  const [isRun, setIsRun] = useState<boolean>(true);
  const [costTime, setCostTime] = useState<string>("00:00:00");
  const timer = useRef<string>("00:00:00");

  // 初始化棋盘
  // const defaultBoardState: number[][] = useMemo(() => [], [currentGameId]);
  const defaultBoardState: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  // const initial = () => {
  //   for (let i = 0; i < boardSize; i++) {
  //     defaultBoardState[i] = [];
  //     for (let j = 0; j < boardSize; j++) {
  //       defaultBoardState[i][j] = 0;
  //     }
  //   }
  //   return defaultBoardState;
  // };

  // 棋盘状态
  // const [boardState, setBoardState] = useState<number[][]>(defaultBoardState);
  const boardState = useRef<number[][]>(defaultBoardState);
  // 棋子轮替，true=白；false=黑
  const [currentPlayer, setCurrentPlayer] = useState<boolean>(false);
  const [boardElements, setBoardElements] = useState<BoardElements[]>([]);
  // 正解状态，true=正解；false=不正解
  const isCorrect = useRef<boolean>(false);
  // Replay 按钮可用状态，true=不可用；false=可用
  // const [btnReplayDisabled, setReplayBtnDisabled] = useState<boolean>(true);
  // Next 按钮可用状态，true=不可用；false=可用
  const [btnNextDisabled, setNextBtnDisabled] = useState<boolean>(true);
  // 用户是否已落子
  const [initialStonesPlaced, setInitialStonesPlaced] = useState<boolean>(false);
  // 设置初始脚本 initScript 和正确脚本 execScript
  // const currentInitScript = useRef<[number, number, boolean][]>([]);
  // const [initScript, setInitScript] = useState<[number, number, boolean][]>([]);
  const [execScript, setExecScript] = useState<[number, number, boolean][]>([]);

  /**
   * 自定义钩子
   * 计时器
   *
   * @param {Function} callback
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
        return () => clearInterval(id);
      }
    }, [delay, isRun]);
  };

  /**
   * 重置棋盘
   */
  const resetBoard = useCallback(() => {
    // 设置计时器
    setNow(new Date());
    setIsRun(true);
    setCostTime("00:00:00");
    // 棋盘状态
    boardState.current = defaultBoardState;
    // 棋子轮替，true=白；false=黑
    setCurrentPlayer(false);
    setBoardElements([]);
    // 正解状态，true=正解；false=不正解
    isCorrect.current = false;
    // setReplayBtnDisabled(true);
    // Next 按钮可用状态，true=不可用；false=可用
    setNextBtnDisabled(true);
    // 用户是否已落子
    setInitialStonesPlaced(false);
    // 设置初始脚本 initScript 和正确脚本 execScript
    // currentInitScript.current = [];
    // setInitScript([]);
    setExecScript([]);

    initPlaceStone([]);

  }, [currentGameId.current]);

  /**
   * 异步传输落子记录
   */
  const handleRecord = useCallback(async () => {
    const user_name: string = sessionStorage.getItem("userName") ?? "";
    const is_correct: number = isCorrect.current ? 1 : 0;
    const cost_time: string = timer.current;

    const formData = JSON.stringify({
      "game_id": currentGameId.current,
      "user_name": user_name,
      "is_correct": is_correct,
      "cost_time": cost_time,
    });

    await axios({
      method: "post",
      url: "/create_record",
      data: formData,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })
      .then(({ data }: { data: RecordFields; }) => {
        if (data) {
          // console.log(data);
        } else {
          throw new Error("response is error");
        }
      })
      .catch((err) => {
        console.error("err=", err);
      });
  }, [sessionStorage.getItem("userName"), isCorrect, timer, currentGameId.current]);

  /**
   * 放棋子的方法
   *
   * @param {number} row
   * @param {number} col
   * @param {boolean} player
   * @param {boolean} isHuman
   */
  const placeStone = useCallback((row: number, col: number, params: { player?: boolean, isHuman?: boolean; }) => {
    const { player, isHuman = false } = params;
    const newBoardState: number[][] = !isHuman ? [...defaultBoardState] : [...boardState.current];
    console.log("currentGameId:", currentGameId.current, "isHuman:", isHuman, "newBoardState:", newBoardState, "boardState:", boardState.current, "defaultBoardState:", defaultBoardState);
    newBoardState[row][col] = player === false ? 1 : 2;
    boardState.current = newBoardState;
    setCurrentPlayer(!player);

    // 判断落子坐标是否和正确坐标相符
    if (execScript.some(([r, c, _]) => row === r && col === c)) {
      isCorrect.current = true;
      setNextBtnDisabled(false);
      setIsRun(false);
    } else {
      isCorrect.current = false;
    }

    // 如果手动落子，则记录每一步
    if (isHuman) {
      handleRecord();
    }
  }, [boardState.current, currentGameId.current, execScript, isCorrect.current]);

  /**
   * 手动落子事件
   *
   * @param {number} row
   * @param {number} col
   */
  const handlePlaceStoneClick = (row: number, col: number) => {
    setInitialStonesPlaced(true);
    // setReplayBtnDisabled(false);
    placeStone(row, col, { player: true, isHuman: true });
  };

  /**
   * 根据 script 循环落子
   *
   * @param {[number, number, boolean][]} script
   */
  const initPlaceStone = (script: [number, number, boolean][]) => {
    for (let i = 0; i < script.length; i++) {
      placeStone(script[i][0], script[i][1], { player: script[i][2], isHuman: false });
    }
  };

  /**
   * 响应 Next 按钮事件
   */
  // const handleNextClick = useCallback(async () => {
  //   axios
  //     .get(
  //       "/next_by_game_id/" + currentGameId.current,
  //     )
  //     .then(({ data }: { data: GameFields; }) => {
  //       if (data) {
  //         // setCurrentGameId(data.game_id);
  //         currentGameId.current = data.game_id;
  //         resetBoard();
  //         /**
  //          * 如果异步获取的数据不为空
  //          * 由于是字符串类型，需要先转成JSON格式
  //          * 再写入 initScript 和 execScript
  //          */
  //         // currentInitScript.current = JSON.parse(data.init_script);
  //         // setInitScript(JSON.parse(data.init_script));
  //         setExecScript(JSON.parse(data.exec_script));
  //         initPlaceStone(JSON.parse(data.init_script));
  //       } else {
  //         throw new Error("response is error");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("err=", err);
  //     });

  //   return () => controller.abort();
  // }, [currentGameId.current]);

  /**
   * 对初始棋谱进行落子
   */
  // useEffect(() => {
  //   initPlaceStone();
  // }, [initPlaceStone]);

  useEffect(() => {
    timer.current = costTime;
  }, [costTime]);

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
    setCostTime(formattedTime);
  }, 1000);

  /**
   * 初期表示
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
  }, [currentGameId.current]);

  useEffect(() => {
    const elements: BoardElements[] = [];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const x = col * intersectionSize + 5;
        const y = row * intersectionSize + 5;
        const stone = boardState.current[row][col];

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
  }, [currentGameId.current, boardState.current]);

  /**
   * 初期表示
   * 异步获取 Game 数据
   */
  useEffect(() => {
    axios
      .get(
        "/game_id/" + currentGameId.current,
      )
      .then(({ data }: { data: GameFields; }) => {
        if (data) {
          // setCurrentGameId(data.game_id);
          currentGameId.current = data.game_id;
          resetBoard();
          /**
           * 如果异步获取的数据不为空
           * 由于是字符串类型，需要先转成JSON格式
           * 再写入 initScript 和 execScript
           */
          // currentInitScript.current = JSON.parse(data.init_script);
          // setInitScript(JSON.parse(data.init_script));
          setExecScript(JSON.parse(data.exec_script));
          initPlaceStone(JSON.parse(data.init_script));
        } else {
          throw new Error("response is error");
        }
      })
      .catch((err) => {
        console.error("err=", err);
      });

    return () => controller.abort();
  }, []);

  /**
   * 初期表示
   * 重置棋盘
   */
  useEffect(() => {
    resetBoard();
  }, []);

  // useEffect(() => {
  //   console.log("boardState", boardState);
  // }, [boardState]);

  return (
    <>
      {/* 把棋盘显示在页面上 */}
      <Head />
      <GameTitle
        userName={sessionStorage.getItem("userName") ?? ""}
        gameId={currentGameId.current}
        timer={costTime}
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
          {/* <Grid container justifyContent="center" spacing={2} sx={{ padding: "6px", marginTop: "6px" }}>
            <Grid item>
              <Button variant="contained" disabled={btnNextDisabled} onClick={handleNextClick}>Next</Button>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
      {
        initialStonesPlaced && (
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Stack sx={{ width: "100%" }} spacing={2}>
                {
                  isCorrect.current ? (
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
