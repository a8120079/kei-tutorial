/*
 * @Author: fantiga
 * @Date: 2023-07-22 23:01:10
 * @LastEditTime: 2023-07-23 21:25:43
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/FormInputText.tsx
 */

import { LevelFormInputTextProps } from "@/types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const LevelFormInputText = ({ control, name, label, errors, ...props }: LevelFormInputTextProps) => (
  <Controller
    render={({ field }) => (
      <TextField
        label={label}
        variant="outlined"
        error={errors[name] ? true : false}
        {...field}
        {...props}
      />
    )}
    control={control}
    name={name}
    rules={{
      required: "This field is required.",
    }}
  />
);
