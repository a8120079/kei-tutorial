/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:46:25
 * @LastEditTime: 2023-07-15 13:55:01
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Home.tsx
 */

import Head from "@/components/Head";
import { Grid } from "@mui/material";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Home: FC = () => {
  const form = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Head />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item>
              <p>名前(ふりがな)</p>
              <input type="text" />
              <p>パスワード</p>
              <input type="password" />
              <p><button className="btn" >ログイン</button></p>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};
export default Home;
