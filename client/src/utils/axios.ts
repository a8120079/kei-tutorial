/*
 * @Author: fantiga
 * @Date: 2023-07-26 23:00:26
 * @LastEditTime: 2023-08-14 22:34:14
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/utils/axios.ts
 */

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios;

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export function formatFormUrlencoded<T>(obj: Partial<T>): string {
  const res: string[] = [];
  for (const k in obj) {
    res.push(`${k}=${obj[k] || ''}`);
  }
  return res.join('&');
}
