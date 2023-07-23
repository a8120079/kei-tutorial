/*
 * @Author: fantiga
 * @Date: 2023-07-22 23:01:10
 * @LastEditTime: 2023-07-22 23:39:43
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/FormInputText.tsx
 */

import { LoginFormInputTextProps, RegisterFormInputTextProps } from "@/types";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


export const LoginFormInputText = ({ control, name, label, ...props }: LoginFormInputTextProps) => (
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

export const RegisterFormInputText = ({ control, name, label, ...props }: RegisterFormInputTextProps) => (
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
