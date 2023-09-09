/*
 * @Author: fantiga
 * @Date: 2023-09-09 21:32:23
 * @LastEditTime: 2023-09-09 22:09:34
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Demo.tsx
 */

import { useEffect, useState } from "react";

const Demo = () => {
  const [startTime] = useState<Date>(new Date());
  const [timer, setTimer] = useState<string>("00:00:00");

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      const elapsedTimeInSeconds = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      const hours = Math.floor(elapsedTimeInSeconds / 3600);
      const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
      const seconds = elapsedTimeInSeconds % 60;

      const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      
      setTimer(formattedTime);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [startTime]);

  return (
    <>
      Timer: {timer}
    </>
  );
};

export default Demo;
