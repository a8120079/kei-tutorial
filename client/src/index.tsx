/*
 * @Author: fantiga
 * @Date: 2023-07-15 11:42:23
 * @LastEditTime: 2023-07-15 13:25:22
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/index.tsx
 */

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import Game from './pages/Game';
import Level from './pages/Level';
import Register from './pages/Register';

/**
 * React 18 新写法
 */
const container: HTMLElement =
  document.getElementById('root') || document.createElement('div');
// 创建一个root。
const root = createRoot(container);
// 初始渲染：将一个元素渲染到root。
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/level" element={<Level />} />
        <Route path="/game" element={<Game />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There&apos;s nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
