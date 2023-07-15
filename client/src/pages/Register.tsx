/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:50:44
 * @LastEditTime: 2023-07-15 13:59:35
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Register.tsx
 */

import Head from "@/components/Head";
import { Button, Grid, TextField } from "@mui/material";
import { FC } from "react";

const Register: FC = () => {
  return (
    <>
      <Head />
      <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
        <Grid item>
          <TextField id="outlined-basic" label="名前(ふりがな)" variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
        <Grid item>
          <TextField id="outlined-basic" label="メールアドレス" variant="outlined" />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
        <Grid item>
          <TextField
            id="outlined-password-input"
            label="パスワード"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
        <Grid item>
          <TextField
            id="outlined-password-input"
            label="パスワード再入力"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
        <Grid item>
          <Button variant="outlined">会員登録を行う</Button>
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
        <Grid item>
          <Button variant="outlined">ログインを行う</Button>
        </Grid>
      </Grid>
    </>
  );
};
export default Register;
