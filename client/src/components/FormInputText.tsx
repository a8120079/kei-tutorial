/*
 * @Author: fantiga
 * @Date: 2023-07-22 23:01:10
 * @LastEditTime: 2023-07-22 23:39:43
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
    rules={{
      required: "This field is required.",
    }}
    render={() => (
      <TextField
        label={label}
        variant="outlined"
        {...props}
      />
    )}
  />
);
