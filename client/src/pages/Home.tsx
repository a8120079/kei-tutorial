/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:46:25
 * @LastEditTime: 2023-07-15 16:55:37
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Home.tsx
 */

import Head from "@/components/Head";
import { Button, Grid, Link, TextField } from "@mui/material";
import styled from '@emotion/styled';
import { FC } from "react";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { createRoot } from 'react-dom/client';
// import { Route, Routes } from "react-router";
// import Register from "./Register";
import { useNavigate } from "react-router-dom";



const FormUI = styled.form`
  width: "100%";
`;

interface LoginFormValues {
  userName: string;
  passWord: string;
}

const Home: FC = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>();
  const { register, handleSubmit } = form;

  const onValid: SubmitHandler<LoginFormValues> = data => console.log(data);
  const onInvalid: SubmitErrorHandler<LoginFormValues> = errors => console.error(errors);

  return (
    <>
      <Head />
      <FormProvider {...form}>
        <FormUI onSubmit={handleSubmit(onValid, onInvalid)}>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <TextField {...register("userName")} label="名前(ふりがな)" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField
                {...register("passWord")}
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Button variant="contained" type="submit" >ログイン</Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Button onClick={() => navigate('/register')} variant="outlined" >ユーザー登録</Button>
            </Grid>
          </Grid>
        </FormUI>
      </FormProvider>
    </>
  );
};
export default Home;
