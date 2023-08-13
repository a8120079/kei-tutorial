/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:48:35
 * @LastEditTime: 2023-08-13 14:42:41
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Level.tsx
 */

import Head from "@/components/Head";
import { Alert, AlertTitle, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { Controller, FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { GameFields, LevelFormValues } from "@/types";
import { LevelFormInputText } from "@/components/FormInputText";
import axios, { formatFormUrlencoded } from "@/utils/axios";

const defaultValues: LevelFormValues = {
  userName: "",
  gameId: 0,
};

const Level: FC = () => {
  const navigate = useNavigate();
  const controller = new AbortController();
  const [gameList, setGameList] = useState<GameFields[]>([]);
  const [userName, setUsername] = useState<string>("");
  const form = useForm<LevelFormValues>({ defaultValues });
  const { handleSubmit, register, control, formState: { errors } } = form;

  const onValid: SubmitHandler<LevelFormValues> = data => {
    sessionStorage.setItem("userName", data.userName);
    navigate("/game", { state: { gameId: data.gameId } });
  };

  const onInvalid: SubmitErrorHandler<LevelFormValues> = errors => console.error(errors);

  // 异步获取关卡数据
  useEffect(() => {
    axios
      .get(
        '/getGameList',
      )
      .then((e) => {
        if (e.data && Array.isArray(e.data)) {
          // 如果异步获取的数据不为空
          // 写入 gameList
          setGameList(e.data);
        } else {
          throw new Error('response is error');
        }
      })
      .catch((err) => {
        console.error('err=', err);
      });

    return () => controller.abort();
  }, []);

  /**
   * 当 gameList 发生改变的时候，
   * 默认选中第一个 game_id
   */
  useEffect(() => {
    form.setValue("gameId", gameList[0] ? gameList[0].game_id : 0);
  }, [gameList]);

  /**
   * 当 sessionStorage 中有 userName 时，
   * 将 sessionStorage 中的 userName 填入表单中
   */
  useEffect(() => {
    form.setValue("userName", sessionStorage.getItem("userName") ?? "");
  }, [sessionStorage.getItem("userName")]);

  return (
    <>
      <Head />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item sx={{ width: "400px" }}>
              <LevelFormInputText
                control={control}
                name="userName"
                value={userName}
                label="お名前"
                onChange={(event) => form.setValue("userName", event.target.value)}
                errors={errors}
              />
            </Grid>
          </Grid>
          {
            errors.userName && (
              <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
                <Grid item>
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                      <AlertTitle>{errors.userName.message}</AlertTitle>
                    </Alert>
                  </Stack>
                </Grid>
              </Grid>
            )
          }
          <Grid container justifyContent="center">
            <Grid item justifyContent="center" sx={{ display: "flex", width: "90%" }}>
              <Controller
                name="gameId"
                defaultValue={defaultValues.gameId}
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      {...field}
                      onChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <Grid container justifyContent="space-between" flexDirection="row" spacing={1} sx={{ padding: "6px" }}>
                        <Grid item xs={4}>
                          <Grid container justifyContent="center" spacing={1} >
                            <Grid item>
                              <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography>入門レベル</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {
                                    gameList
                                      .filter((value) => value.level === 1)
                                      .map((item, index) => (
                                        <FormControlLabel
                                          key={index}
                                          label={item.game_name}
                                          value={item.game_id}
                                          sx={{ width: "100%" }}
                                          control={<Radio />}
                                        />
                                      ))
                                  }
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container justifyContent="center" spacing={1}>
                            <Grid item>
                              <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography>初級レベル</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {
                                    gameList
                                      .filter((value) => value.level === 2)
                                      .map((item, index) => (
                                        <FormControlLabel
                                          key={index}
                                          label={item.game_name}
                                          value={item.game_id}
                                          sx={{ width: "100%" }}
                                          control={<Radio />}
                                        />
                                      ))
                                  }
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Grid container justifyContent="center" spacing={1} >
                            <Grid item>
                              <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography>中級レベル</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  {
                                    gameList
                                      .filter((value) => value.level === 3)
                                      .map((item, index) => (
                                        <FormControlLabel
                                          key={index}
                                          label={item.game_name}
                                          value={item.game_id}
                                          sx={{ width: "100%" }}
                                          control={<Radio />}
                                        />
                                      ))
                                  }
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "20px" }}>
            <Grid item>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  width: "400px",  // Set the width you desire
                  height: "80px",  // Set the height you desire
                  fontSize: "38px" // Set the font size for the button text
                }}
              >
                Start
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default Level;
