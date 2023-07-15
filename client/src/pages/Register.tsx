/*
 * @Author: fantiga
 * @Date: 1013-07-15 11:50:44
 * @LastEditTime: 2023-07-15 17:51:36
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Register.tsx
 */

import Head from "@/components/Head";
import { Button, Grid, TextField } from "@mui/material";
import { FC } from "react";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

interface RegisterFormValues {
  userName: string;
  mailAddress: string;
  password: string;
  rePassword: string;
}

const Register: FC = () => {
  const form = useForm<RegisterFormValues>();
  const { register, handleSubmit } = form;

  const onValid: SubmitHandler<RegisterFormValues> = data => console.log(data);
  const onInvalid: SubmitErrorHandler<RegisterFormValues> = errors => console.error(errors);

  return (
    <>
      <Head />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <TextField {...register("userName")} label="名前(ふりがな)" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField {...register("mailAddress")} label="メールアドレス" variant="outlined" />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <TextField
                {...register("password")}
                label="パスワード"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item>
              <TextField
                {...register("rePassword")}
                label="パスワード再入力"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Button variant="contained" type="submit">ログイン</Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default Register;
