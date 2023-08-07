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

  // 开启计时器
  useEffect(() => {
    // setInterval

    // 停止计时器
    return () => {

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
