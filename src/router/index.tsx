import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import List from '../pages/manage/List';
import Star from '../pages/manage/Star';
import Trash from '../pages/manage/Trash';
import ManageLayout from '../layout/ManageLayout';
import QuestionLayout from '../layout/QuestionLayout';
import Edit from '../pages/question/Edit/Index';
import Stat from '../pages/question/Stat/Index';
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = 'login';
export const REGISTER_PATHNAME = 'register';
export const MANGE_LIST_PATHNAME = 'manage/list';
const LOGIN_PATHNAME_PATH = HOME_PATHNAME + LOGIN_PATHNAME;
const REGISTER_PATHNAME_PATH = HOME_PATHNAME + REGISTER_PATHNAME;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: LOGIN_PATHNAME,
        element: <Login />,
      },
      {
        path: REGISTER_PATHNAME,
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },

      {
        path: '*', //404page
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
]);
export default router;
/**
 *
 * @param pathname url路径
 * @returns 是否在login or register 页面
 */
export function isLoginOrRegister(pathname: string) {
  // if (pathname.indexOf(LOGIN_PATHNAME) !== -1 || pathname.indexOf(REGISTER_PATHNAME) !== -1) {
  //   return true;
  // } else {
  //   return false;
  // }
  return [LOGIN_PATHNAME_PATH, REGISTER_PATHNAME_PATH].includes(pathname);
}
/**
 *
 * @param pathname url路径
 * @returns 是否在不需要登录就可以访问的页面
 */
export function isNoNeedUserInfo(pathname: string) {
  return [HOME_PATHNAME, LOGIN_PATHNAME_PATH, REGISTER_PATHNAME_PATH].includes(pathname);
}
