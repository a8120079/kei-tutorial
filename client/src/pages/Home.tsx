/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:46:25
 * @LastEditTime: 2023-07-15 17:51:22
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Home.tsx
 */

import { LoginFormInputText } from "@/components/FormInputText";
import Head from "@/components/Head";
import { LoginFormValues } from "@/types";
import { Button, Grid, TextField } from "@mui/material";
import { FC } from "react";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>();
  const { register, handleSubmit, control, formState: { errors } } = form;

  const onValid: SubmitHandler<LoginFormValues> = data => console.log(data);
  const onInvalid: SubmitErrorHandler<LoginFormValues> = errors => console.error(errors);

  return (
    <>
      <Head />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <LoginFormInputText
                control={control}
                name="userName"
                label="名前(ふりがな)"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
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
              <Button variant="contained" >ログイン</Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Button onClick={() => navigate('/register')} variant="outlined" >ユーザー登録</Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default Home;
