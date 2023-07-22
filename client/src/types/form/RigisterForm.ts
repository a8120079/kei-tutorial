/*
 * @Author: fantiga
 * @Date: 2023-07-22 23:03:37
 * @LastEditTime: 2023-07-22 23:03:38
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/types/form/RigisterForm.ts
 */

import { Control, FieldPath } from "react-hook-form";

export interface RegisterFormValues {
  userName: string;
  mailAddress: string;
  password: string;
  rePassword: string;
}

export interface RegisterForm {
  control: Control<RegisterFormValues, any>;
  name: FieldPath<RegisterFormValues>;
  label: string;
  type?: string;
  autoComplete?: string;
}
