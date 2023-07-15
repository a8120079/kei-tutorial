/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:48:35
 * @LastEditTime: 2023-07-15 13:59:10
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Level.tsx
 */

import Head from "@/components/Head";
import { Grid } from "@mui/material";
import { FC } from "react";

const Level: FC = () => {
  return (
    <>
      <Head />
      <Grid container>
        <Grid item>
          <ul>
            <li><a href="#" >入門レベル</a></li>
            <li><a href="#">初級レベル</a></li>
            <li><a href="#" >中級レベル</a></li>
          </ul>
        </Grid>
      </Grid>
    </>
  );
};
export default Level;
