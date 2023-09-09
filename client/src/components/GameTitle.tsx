/*
 * @Author: fantiga
 * @Date: 2023-07-29 12:37:45
 * @LastEditTime: 2023-08-07 23:14:16
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/GameTitle.tsx
 */

import { Chip, Grid, Typography } from "@mui/material";
import { GameTitleProps } from "@/types/props/GameTitleProps";
import { FC, useEffect, useState } from "react";

export const GameTitle: FC<GameTitleProps> = ({ userName, gameId }) => {

  const [timer, setTimer] = useState("00:00:00");
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    // Function to start the timer
    const startTimer = () => {
      const now = new Date();
      setStartTime(now);

      const timerId = setInterval(() => {
        const currentTime = new Date();
        const elapsedTimeInSeconds = Math.floor((currentTime.getTime() - now.getTime()) / 1000);
        const hours = Math.floor(elapsedTimeInSeconds / 3600);
        const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
        const seconds = elapsedTimeInSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        setTimer(formattedTime);
      }, 1000);

      // Return a cleanup function to stop the timer
      return () => {
        clearInterval(timerId);
      };
    };

    // Start the timer when the component mounts
    startTimer();

    // Cleanup when the component unmounts
    return () => {
      if (startTime) {
        const elapsedTimeInSeconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
        const hours = Math.floor(elapsedTimeInSeconds / 3600);
        const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
        const seconds = elapsedTimeInSeconds % 60;

        const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        setTimer(formattedTime);
      }
    };
  }, []);

  return (
    <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
      <Grid item>
        <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
          <Grid item>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Your name:</Typography>
          </Grid>
          <Grid item>
            <Chip label={userName} />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Game#:</Typography>
            </Grid>
            <Grid item>
              <Chip label={gameId} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Timer:</Typography>
            </Grid>
            <Grid item>
              <Chip label={timer} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
