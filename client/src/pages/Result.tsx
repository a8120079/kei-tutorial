/*
 * @Author: fantiga
 * @Date: 1013-07-15 11:50:44
 * @LastEditTime: 2023-07-21 23:54:21
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Result.tsx
 */

import Head from "@/components/Head";
import { Grid } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { FC } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "userName",
    headerName: "ユーザー名",
    width: 110,
  },
  {
    field: "level",
    headerName: "レベル",
    width: 110,
  },
  {
    field: "correct",
    headerName: "正誤",
    width: 110,
  },
  {
    field: "createTime",
    headerName: "打ったタイミング",
    width: 180,
  },
];

const rows = [
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
];

const Result: FC = () => {
  return (
    <>
      <Head />
      <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
        <Grid item>
          <DataGrid
            rows={rows}
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
