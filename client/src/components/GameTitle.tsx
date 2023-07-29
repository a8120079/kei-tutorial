/*
 * @Author: fantiga
 * @Date: 2023-07-29 12:37:45
 * @LastEditTime: 2023-07-29 12:50:08
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/GameTitle.tsx
 */

import { GameTitleProps } from "@/types/props/GameTitleProps";
import { Chip, Grid, Typography } from "@mui/material";
import { FC } from "react";

export const GameTitle: FC<GameTitleProps> = ({ userName, gameId }) => (
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
    </Grid>
  </Grid>
);
