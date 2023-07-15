/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:46:25
 * @LastEditTime: 2023-07-15 12:51:59
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Home.tsx
 */

import Head from "@/components/Head";
import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <Head />
      <>
        <main>
          <div id="input_form">
            <form action="index.php" method="POST">
              <p>名前(ふりがな)</p>
              <input type="text" />
              <p>パスワード</p>
              <input type="password" />
              <p><button className="btn" >ログイン</button></p>
            </form>
          </div>
        </main>

      </>
    </>
  );
};
export default Home;
