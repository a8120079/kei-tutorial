/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:50:44
 * @LastEditTime: 2023-07-15 13:25:13
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Register.tsx
 */

import Head from "@/components/Head";
import { FC } from "react";

const Register: FC = () => {
  return (
    <>
      <Head />
      <>
        <main>
          <div id="input_form">
            <form action="index.php" method="POST">
              <p>名前(ふりがな)</p>
              <input type="text" />
              <p>メールアドレス</p>
              <input type="text" />
              <p>パスワード</p>
              <input type="password" />
              <p>パスワード再入力</p>
              <input type="password" />
              <p>
                <input type="submit" value="会員登録を行う" />
                <button className="btn">ログインを行う</button>
              </p>
            </form>
          </div>
        </main>

      </>
    </>
  );
};
export default Register;
