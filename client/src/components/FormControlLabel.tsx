/*
 * @Author: fantiga
 * @Date: 2023-07-27 23:16:47
 * @LastEditTime: 2023-07-27 23:33:36
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/FormControlLabel.tsx
 */

import { FormControlLabel, FormControlLabelProps, useRadioGroup } from "@mui/material";

export const LevelFormControlLabel = (props: FormControlLabelProps) => {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <FormControlLabel checked={checked} {...props} />;
};
