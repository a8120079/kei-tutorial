/*
 * @Author: fantiga
 * @Date: 2023-07-22 23:01:10
 * @LastEditTime: 2023-07-22 23:39:43
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/FormInputText.tsx
 */

import { LevelFormInputTextProps } from "@/types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const LevelFormInputText = ({ control, name, label, ...props }: LevelFormInputTextProps) => (
  <Controller
    control={control}
    name={name}
    // rules={{
    //   required: "This field is required.",
    // }}
    render={() => (
      <TextField
        label={label}
        variant="outlined"
        {...props}
      />
    )}
  />
);