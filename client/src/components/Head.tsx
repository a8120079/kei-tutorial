/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:36:55
 * @LastEditTime: 2023-09-24 20:17:12
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/Head.tsx
 */

import { Grid, Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Head: FC = () => {
  const navigate = useNavigate();

  return (
    <header>
      <Typography variant="h3" sx={{ color: "#3399CC", padding: "20px", textAlign: "center" }}>BinGO</Typography>
      <Grid container justifyContent={"center"} spacing={1} >
        <Grid item>
          <Link href="#" onClick={() => navigate('/')} style={{ fontSize: "30px" }}>Home</Link>
        </Grid>
        <Grid item>
          <Link href="#" onClick={() => navigate('/result')} style={{ fontSize: "30px" }}>Result</Link>
        </Grid>
      </Grid>
    </header>
  );
};

export default Head;
