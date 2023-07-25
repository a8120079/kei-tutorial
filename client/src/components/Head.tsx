/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:36:55
 * @LastEditTime: 2023-07-25 22:54:40
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/Head.tsx
 */

import { Link, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Head: FC = () => {
  const navigate = useNavigate();

  return (
    <header>
      <Typography variant="h3" sx={{ color: "#3399CC", padding: "20px" }}>BingoGO</Typography>
      <ul>
        <li><Link href="#" onClick={() => navigate('/')} style={{ fontSize: "30px" }}>Home</Link></li>
        <li><Link href="#" onClick={() => navigate('/game')} style={{ fontSize: "30px" }}>Game</Link></li>
        <li><Link href="#" onClick={() => navigate('/result')} style={{ fontSize: "30px" }}>Result</Link></li>
      </ul>
    </header>
  );
};

export default Head;
