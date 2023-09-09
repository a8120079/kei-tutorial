/*
 * @Author: fantiga
 * @Date: 2023-09-09 21:32:23
 * @LastEditTime: 2023-09-09 22:09:34
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Demo.tsx
 */

import { useEffect, useState } from "react";


const Demo = () => {

  const [startTime, setStartTime] = useState<Date>();
  const [timer, setTimer] = useState<string>("00:00:00");
  // const [value, setValue] = useState<number>(0);

  // /**
  //  * 秒数转时间
  //  * @param t
  //  */
  // const timeConvert = (t: number): string => {
  //   const hour = 0;
  //   const minute = 0;
  //   const second = 0;



  //   return "";
  // };

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      // setStartTime(now);



      // const start = now.;
      console.log(now);
      setTimer(now.toTimeString());

      // const millis = Date.now() - start;

      // console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
    },
      // 1000毫秒=1秒
      1000
    );

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>Timer: {timer}
      {/* <button value={value} onClick={(e) => setValue(value + 1)} >{value}</button> */}
    </>
  );
};

export default Demo;
