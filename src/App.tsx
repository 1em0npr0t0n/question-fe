import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
// import logo from './logo.svg';
// import List from './pages/List';
// import './App.css';

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;

// src/components  --组件
// src/pages --页面 组件
// layout --页面布局
// router --路由配置
