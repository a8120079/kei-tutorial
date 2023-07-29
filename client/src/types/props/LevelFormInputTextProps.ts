/*
 * @Author: fantiga
 * @Date: 2023-07-23 18:04:20
 * @LastEditTime: 2023-07-29 22:03:08
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/types/props/LevelFormInputTextProps.ts
 */
import { Control, FieldErrors, FieldPath } from "react-hook-form";
import { LevelFormValues } from "../form";
import { ChangeEventHandler } from "react";

export interface LevelFormInputTextProps {
  control: Control<LevelFormValues, any>;
  name: FieldPath<LevelFormValues>;
  value: string;
  label: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  errors: FieldErrors<LevelFormValues>;
  type?: string;
  autoComplete?: string;
}
