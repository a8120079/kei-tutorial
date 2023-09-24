/*
 * @Author: fantiga
 * @Date: 2023-09-17 20:22:43
 * @LastEditTime: 2023-09-24 16:23:07
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/types/fields/Record.ts
 */

export interface PostRecordData {
  user_name: string;
  is_correct: number;
  cost_time: string;
}

export interface RecordFields extends PostRecordData {
  record_id: number;
  game_id?: number;
  game_name: string;
  level: number;
  level_text?: string;
  is_correct_text?: string;
  create_time: Date;
  create_time_text?: string;
}
