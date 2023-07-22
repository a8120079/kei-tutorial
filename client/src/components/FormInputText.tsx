/*
 * @Author: fantiga
 * @Date: 2023-07-22 23:01:10
 * @LastEditTime: 2023-07-22 23:05:26
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/FormInputText.tsx
 */

import { RegisterForm } from "@/types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const FormInputText = ({ control, name, label, ...props }: RegisterForm) => (
  <Controller
    control={control}
    name={name}
    render={() => (
      <TextField
        label={label}
        variant="outlined"
        {...props}
      />
    )}
  />
);
