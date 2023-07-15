/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:46:25
 * @LastEditTime: 2023-07-15 13:55:01
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Home.tsx
 */

import Head from "@/components/Head";
import { Button, Grid, TextField } from "@mui/material";
import styled from '@emotion/styled';
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const FormUI = styled.form`
  width: "100%"
`;

interface LoginFormValues {
  userName: string;
  passWord: string;
}

const Home: FC = () => {
  const form = useForm<LoginFormValues>();

  const onValid: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Head />
      <FormProvider {...form}>
        <FormUI onSubmit={form.handleSubmit(onValid)}>
          <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
            <Grid item>
              <TextField name="userName" id="outlined-basic" label="名前(ふりがな)" variant="outlined" />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
            <Grid item>
              <TextField
                name="passWord"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{ width: "100%", padding: "6px" }}>
            <Grid item>
              <Button variant="outlined" type="submit">ログイン</Button>
            </Grid>
          </Grid>
        </FormUI>
      </FormProvider>
    </>
  );
};
export default Home;
