/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:48:35
 * @LastEditTime: 2023-07-23 21:27:07
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Level.tsx
 */

import Head from "@/components/Head";
import { Alert, AlertTitle, Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack } from "@mui/material";
import { FC } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { LevelFormValues } from "@/types";
import { LevelFormInputText } from "@/components/FormInputText";

const defaultValues = {
  userName: "",
  level: 101,
};

const Level: FC = () => {
  const navigate = useNavigate();
  const form = useForm<LevelFormValues>({ defaultValues });
  const { handleSubmit, control, formState: { errors } } = form;

  const onValid: SubmitHandler<LevelFormValues> = data => console.log(data);
  const onInvalid: SubmitErrorHandler<LevelFormValues> = errors => console.error(errors);

  return (
    <>
      <Head />
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
            <Grid item>
              <LevelFormInputText
                control={control}
                name="userName"
                label="お名前"
                errors={errors}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item sx={{ width: "90%" }}>
              <FormControl>
                <RadioGroup
                  name="level"
                  defaultValue={defaultValues.level}
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
                              <FormControlLabel sx={{ width: "100%" }} value={101} control={<Radio />} label="A-1" />
                              <FormControlLabel sx={{ width: "100%" }} value={102} control={<Radio />} label="A-2" />
                              <FormControlLabel sx={{ width: "100%" }} value={103} control={<Radio />} label="A-3" />
                              <FormControlLabel sx={{ width: "100%" }} value={104} control={<Radio />} label="A-4" />
                              <FormControlLabel sx={{ width: "100%" }} value={105} control={<Radio />} label="A-5" />
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
                              <Typography>初級レベル</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <FormControlLabel sx={{ width: "100%" }} value={201} control={<Radio />} label="B-1" />
                              <FormControlLabel sx={{ width: "100%" }} value={202} control={<Radio />} label="B-2" />
                              <FormControlLabel sx={{ width: "100%" }} value={203} control={<Radio />} label="B-3" />
                              <FormControlLabel sx={{ width: "100%" }} value={204} control={<Radio />} label="B-4" />
                              <FormControlLabel sx={{ width: "100%" }} value={205} control={<Radio />} label="B-5" />
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
                              <FormControlLabel sx={{ width: "100%" }} value={301} control={<Radio />} label="C-1" />
                              <FormControlLabel sx={{ width: "100%" }} value={302} control={<Radio />} label="C-2" />
                              <FormControlLabel sx={{ width: "100%" }} value={303} control={<Radio />} label="C-3" />
                              <FormControlLabel sx={{ width: "100%" }} value={304} control={<Radio />} label="C-4" />
                              <FormControlLabel sx={{ width: "100%" }} value={305} control={<Radio />} label="C-5" />
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          {errors.userName && (
            <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
              <Grid item>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert severity="error">
                    <AlertTitle>{errors.userName.message}</AlertTitle>
                  </Alert>
                </Stack>
              </Grid>
            </Grid>
          )}
          <Grid container justifyContent="center" spacing={1} sx={{ padding: "20px" }}>
            <Grid item>
              <Button
                type="submit"
                // onClick={() => navigate('/game')}
                variant="outlined"
                sx={{
                  width: "400px",  // Set the width you desire
                  height: "80px",  // Set the height you desire
                  fontSize: "38px" // Set the font size for the button text
                }}
              >
                START
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default Level;

