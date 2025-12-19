/**
 * @deprecated ajax 拦截器 以及axios return ResDataType 数据类型
 */
import { message } from 'antd';
import axios from 'axios';
import { getToken } from '../pages/utils/user-token';

const instance = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 10 * 1000,
});

//request 链接
instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`; //JWT 格式
    return config;
  },
  error => Promise.reject(error),
);
//response 拦截 统一处理 errno 和 msg token
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    // 错误提示
    const errorMsg = msg || '请求失败，请稍后重试';
    message.error(errorMsg);
    throw new Error(errorMsg);
  }
  return data as any;
});
export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};
export type ResDataType = {
  [key: string]: any;
};
