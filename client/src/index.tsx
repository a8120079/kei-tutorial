/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:42:23
 * @LastEditTime: 2023-07-21 23:57:28
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/index.tsx
 */

import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * React 18 新写法
 */
const container: HTMLElement =
  document.getElementById('root') || document.createElement('div');
// 创建一个root。
const root = createRoot(container);
// 初始渲染：将一个元素渲染到root。
root.render(<App />);
