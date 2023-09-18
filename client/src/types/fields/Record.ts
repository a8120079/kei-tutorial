/*
 * @Author: fantiga
 * @Date: 2023-09-17 20:22:43
 * @LastEditTime: 2023-09-17 20:24:04
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/types/fields/Record.ts
 */
export interface RecordFields {
  record_id: number;
  game_id: number;
  game_name: string;
  user_name: string;
  level: number;
  level_text?: string;
  is_correct: boolean;
  is_correct_text?: string;
  cost_time: string;
  create_time: Date;
}
