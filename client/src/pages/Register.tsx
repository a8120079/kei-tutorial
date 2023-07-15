/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:50:44
 * @LastEditTime: 2023-07-15 13:59:35
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Register.tsx
 */

import Head from "@/components/Head";
import { Button, Grid, TextField } from "@mui/material";
import styled from '@emotion/styled';
import { FC } from "react";
// import { FormProvider } from "react-hook-form";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

const FormUI = styled.form`
  width: "100%";
`;

interface RegisterFormValues {
  userName: string;
  mailaddress:string;
  passWord: string;
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
        <FormUI onSubmit={handleSubmit(onValid, onInvalid)}>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <TextField id="outlined-basic" {...register("passWord")} label="名前(ふりがな)" variant="outlined" />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <TextField id="outlined-basic" label="メールアドレス" variant="outlined" />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <TextField
                {...register("passWord")}
                id="outlined-password-input"
                label="パスワード"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <TextField
                {...register("passWord")}
                id="outlined-password-input"
                label="パスワード再入力"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <Button variant="outlined">ログイン</Button>
            </Grid>
          </Grid>
        </FormUI>
      </FormProvider>
    </>
  );
};
export default Register;
