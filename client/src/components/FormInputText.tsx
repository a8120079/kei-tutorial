/*
 * @Author: fantiga
 * @Date: 2023-07-22 23:01:10
 * @LastEditTime: 2023-08-05 00:02:19
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/FormInputText.tsx
 */

import { LevelFormInputTextProps } from "@/types";
import { TextField } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

export const LevelFormInputText: FC<LevelFormInputTextProps> = ({ control, name, label, value, onChange, ...props }) => (
  <Controller
    control={control}
    name={name}
    rules={{
      required: "This field is required.",
    }}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        onChange={onChange}
        sx={{ width: "100%" }}
        variant="outlined"
        {...props}
      />
    )}
  />
);
