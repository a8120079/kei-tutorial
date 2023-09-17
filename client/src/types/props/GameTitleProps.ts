/*
 * @Author: fantiga
 * @Date: 2023-07-29 12:38:35
 * @LastEditTime: 2023-09-17 21:15:23
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/types/props/GameTitleProps.ts
 */

import { Dispatch, SetStateAction } from "react";

export interface GameTitleProps {
  userName: string;
  gameId: number;
  timer: string;
}
