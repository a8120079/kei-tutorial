/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:36:55
 * @LastEditTime: 2023-07-23 15:41:46
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/components/Head.tsx
 */

import { Link } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Head: FC = () => {
  const navigate = useNavigate();

  return (
    <header>
      <ul>
        <li><Link href="#" onClick={() => navigate('/')} >Home</Link></li>
        <li><Link href="#" onClick={() => navigate('/game')} >Game</Link></li>
        <li><Link href="#" onClick={() => navigate('/result')} >Result</Link></li>
      </ul>
    </header>
  );
};

export default Head;
