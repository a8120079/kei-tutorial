/*
 * @Author: fantiga
 * @Date: 1013-07-15 11:50:44
 * @LastEditTime: 2023-07-15 17:51:36
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Register.tsx
 */

import Head from "@/components/Head";
import { Grid, Link } from "@mui/material";
import { FC } from "react";
import { DataGrid } from '@mui/x-data-grid';

const Result: DataGrid = () => {
    return (
      <>
        <Head />
        <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
          <Grid item>
            <Link href="#">入門レベル</Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
          <Grid item>
            <Link href="#">初級レベル</Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
          <Grid item>
            <Link href="#">中級レベル</Link>
          </Grid>
        </Grid>
      </>
    );
  };
  


export default Result;