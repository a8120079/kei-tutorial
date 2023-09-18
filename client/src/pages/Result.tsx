/*
 * @Author: fantiga
 * @Date: 1013-07-15 11:50:44
 * @LastEditTime: 2023-09-17 20:24:35
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Result.tsx
 */

import Head from "@/components/Head";
import { RecordFields } from "@/types";
import { Grid } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { FC, useEffect, useMemo, useState } from "react";

const Result: FC = () => {
  const [recordList, setRecordList] = useState<RecordFields[]>([]);
  const controller = new AbortController();

  const columns: GridColDef[] = useMemo(() => [
    { field: "record_id", headerName: "ID", width: 90 },
    {
      field: "user_name",
      headerName: "ユーザー名",
      width: 110,
    },
    {
      field: "level",
      headerName: "レベル",
      width: 110,
    },
    {
      field: "game_name",
      headerName: "ゲームネーム",
      width: 180,
    },
    {
      field: "is_correct",
      headerName: "正誤",
      width: 110,
    },
    {
      field: "create_time",
      headerName: "クリックしたタイミング",
      width: 180,
    },
    {
      field: "cost_time",
      headerName: "かかった時間",
      width: 180,
    },
  ], []);

  /*   const rows = [
      { id: 1, userName: "Snow", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 2, userName: "Lannister", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 3, userName: "Lannister", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 4, userName: "Stark", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 5, userName: "Targaryen", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 6, userName: "Melisandre", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 7, userName: "Clifford", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 8, userName: "Frances", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 9, userName: "Roxie", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 10, userName: "Roxie", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 11, userName: "Roxie", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 12, userName: "Roxie", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 13, userName: "Roxie", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 14, userName: "Roxie", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
      { id: 15, userName: "Roxie", level: "入門", correct: "正解", createTime: "11/08/2023 11:02:23" },
    ]; */

  /**
   * 异步获取 Result 数据
   */
  useEffect(() => {
    axios
      .get(
        '/record_list',
      )
      .then(({ data }: { data: RecordFields[] }) => {
        if (data && Array.isArray(data)) {
          console.log(data);
          // 如果异步获取的数据不为空
          // 写入 recordList
          const newData: RecordFields[] = [];

          data.forEach((item) => {
            const newItem: RecordFields = { ...item };

            if (item.is_correct) {
              newItem.is_correct_text = "正解";
            } else {
              newItem.is_correct_text = "不正解";
            }

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

            newData.push(newItem);
          });

          setRecordList(newData);
        } else {
          throw new Error('response is error');
        }
      })
      .catch((err) => {
        console.error('err=', err);
      });

    return () => controller.abort();
  }, []);


  return (
    <>
      <Head />
      <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
        <Grid item>
          <DataGrid
            rows={recordList}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Result;
