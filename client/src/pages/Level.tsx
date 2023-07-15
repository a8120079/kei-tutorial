/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:48:35
 * @LastEditTime: 2023-07-15 17:48:57
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Level.tsx
 */

import Head from "@/components/Head";
import { Grid, Link } from "@mui/material";
import { FC } from "react";

const Level: FC = () => {
  return (
    <>
      <Head />
      <Grid container>
        <Grid item>
          <Link href="#">入門レベル</Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Link href="#">初級レベル</Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Link href="#">中級レベル</Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Level;
