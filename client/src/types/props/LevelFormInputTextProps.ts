/*
 * @Author: fantiga
 * @Date: 2023-07-23 18:04:20
 * @LastEditTime: 2023-07-23 21:24:20
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/types/props/LevelFormInputTextProps.ts
 */
import { Control, FieldErrors, FieldPath } from "react-hook-form";
import { LevelFormValues } from "../form";

export interface LevelFormInputTextProps {
  control: Control<LevelFormValues, any>;
  name: FieldPath<LevelFormValues>;
  label: string;
  errors: FieldErrors<LevelFormValues>;
  type?: string;
  autoComplete?: string;
}
