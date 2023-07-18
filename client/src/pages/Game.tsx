import Head from "@/components/Head";
import { Grid } from "@mui/material";
import { FC, useState } from "react";

const Game: FC = () => {
  const boardSize = 9;
  const intersectionSize = 30;
  const boardWidth = boardSize * intersectionSize;

  // Declare the boardState to keep track of the stones on the board
  const initialBoardState = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
  const [boardState, setBoardState] = useState<number[][]>(initialBoardState);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);

  // Function to handle placing stones
  function placeStone(row: number, col: number) {
    if (boardState[row][col] === 0) {
      const newBoardState = [...boardState];
      newBoardState[row][col] = currentPlayer;
      setBoardState(newBoardState);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  }

  // Function to render the intersections and stones based on the boardState
  function renderBoard() {
    const boardElements: JSX.Element[] = [];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const x = col * intersectionSize;
        const y = row * intersectionSize;
        const stone = boardState[row][col];

        boardElements.push(
          <div
            key={`intersection-${row}-${col}`}
            className="intersection"
            style={{ left: `${x}px`, top: `${y}px` }}
            onClick={() => placeStone(row, col)}
          >
            {stone === 1 && <div className="stone black" />}
            {stone === 2 && <div className="stone white" />}
          </div>
        );
      }
    }

    return boardElements;
  }
  console.log(renderBoard());

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
              border: "1px solid #000"
            }}
          >
            {/* Render the intersections and stones */}
            {renderBoard()}
            
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Game;
