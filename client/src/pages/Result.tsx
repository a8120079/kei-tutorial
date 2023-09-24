/*
 * @Author: fantiga
 * @Date: 1013-07-15 11:50:44
 * @LastEditTime: 2023-09-24 20:12:04
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Result.tsx
 */

import Head from "@/components/Head";
import { RecordFields } from "@/types";
import { Grid } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import axios from "@/utils/axios";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

const Result: FC = () => {
  const [rows, setRows] = useState<RecordFields[]>([]);
  const controller = new AbortController();

  const columns: GridColDef[] = useMemo(() => [
    { field: "record_id", headerName: "ID", width: 90, },
    { field: "user_name", headerName: "ユーザー名", width: 110, },
    { field: "level_text", headerName: "レベル", width: 110, },
    { field: "game_name", headerName: "ゲームネーム", width: 180, },
    { field: "is_correct_text", headerName: "正誤", width: 110, },
    { field: "create_time_text", headerName: "クリックしたタイミング", width: 180, },
    { field: "cost_time", headerName: "かかった時間", width: 180, },
  ], []);

  /**
   * 将时间对象转换成 YYYY-MM-DD H:M:S 字符串
   *
   * @param {Date} time
   * @returns {string}
   */
  const convertTimeText = useCallback((time: Date): string => {
    const create_time = new Date(time);
    // 获取日
    const DD = String(create_time.getDate()).padStart(2, "0");
    //获取月份，1 月为 0
    const MM = String(create_time.getMonth() + 1).padStart(2, "0");
    // 获取年
    const yyyy = create_time.getFullYear();
    // 获取小时数(0-23)
    const hh = String(create_time.getHours()).padStart(2, "0");
    // 获取分钟数(0-59)
    const mm = String(create_time.getMinutes()).padStart(2, "0");
    // 获取秒数(0-59)
    const ss = String(create_time.getSeconds()).padStart(2, "0");

    return yyyy + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  }, []);


  /**
   * 异步获取 Result 数据
   */
  useEffect(() => {
    axios
      .get(
        "/record_list",
      )
      .then(({ data }: { data: RecordFields[]; }) => {
        if (data && Array.isArray(data)) {
          // 如果异步获取的数据不为空
          // 写入 rows
          const newData: RecordFields[] = [];

          // 循环处理每行数据
          data.forEach((item) => {
            const newItem: RecordFields = { ...item };

            // 转换正误文案
            if (item.is_correct === 1) {
              newItem.is_correct_text = "正解";
            } else {
              newItem.is_correct_text = "不正解";
            }

            // 转换等级文案
            switch (item.level) {
              case 2:
                newItem.level_text = "初級";
                break;

              case 3:
                newItem.level_text = "中級";
                break;

              default:
                newItem.level_text = "入門";
            }

            // 转换创建时间文案
            newItem.create_time_text = convertTimeText(item.create_time);

            newData.push(newItem);
          });

          setRows(newData);
        } else {
          throw new Error("response is error");
        }
      })
      .catch((err) => {
        console.error("err=", err);
      });

    return () => controller.abort();
  }, []);


  return (
    <>
      <Head />
      <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
        <Grid item>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.record_id}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 50,
                },
              },
            }}
            // pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Result;
