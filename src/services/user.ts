import axios, { ResDataType } from './ajax';
// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info';
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
//用户注册
export async function registerUserService(
  username: string,
  password: string,
  email: string,
  phone?: number,
  nickname?: string,
): Promise<ResDataType> {
  const url = '/api/user/register';
  const p = {
    username,
    password,
    email,
    phone: phone || 0,
    nickname: nickname || username,
  };
  const data = (await axios.post(url, p)) as ResDataType;
  return data;
}
//登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login';
  const p = {
    username,
    password,
  };
  const data = (await axios.post(url, p)) as ResDataType;
  return data;
}
