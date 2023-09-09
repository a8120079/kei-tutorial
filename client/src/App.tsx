/*
 * @Author: fantiga
 * @Date: 2023-07-21 23:55:12
 * @LastEditTime: 2023-09-09 21:33:10
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/App.tsx
 */

import React from "react";
import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Level from "./pages/Level";
import Result from "./pages/Result";
import Demo from "./pages/Demo";

import './styles/styles.css';

const App: FC = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Level />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/demo" element={<Demo />} />
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

export default App;
