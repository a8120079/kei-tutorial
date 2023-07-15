/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:48:35
 * @LastEditTime: 2023-07-15 12:53:09
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Level.tsx
 */

import Head from "@/components/Head";
import { FC } from "react";

const Level: FC = () => {
  return (
    <>
      <Head />
      <>
        <main>
          <div id="choice_form">
            <ul>
              <li><a href="#" >入門レベル</a></li>
              <li><a href="#">初級レベル</a></li>
              <li><a href="#" >中級レベル</a></li>
            </ul>
          </div>
        </main>

      </>
    </>
  );
};
export default Level;
