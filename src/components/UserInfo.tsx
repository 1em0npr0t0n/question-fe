import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOME_PATHNAME, LOGIN_PATHNAME } from '../router';
// import { useRequest } from 'ahooks';
// import { getUserInfoService } from '../services/user';
import { UserOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { removeToken } from '../pages/utils/user-token';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../store/userReducer';
const UserInfo: FC = () => {
  const nav = useNavigate();
  //const { data } = useRequest(getUserInfoService);
  // const { username, nickname } = data || {};
  const dispatch = useDispatch();
  const { username, nickname } = useGetUserInfo();
  function logout() {
    dispatch(logoutReducer());
    removeToken(); //清除token
    nav(HOME_PATHNAME + LOGIN_PATHNAME);
    message.success('退出成功');
  }
  const UserInfo = (
    <>
      <span style={{ color: 'white' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出登录
      </Button>
    </>
  );
  const Login = <Link to={HOME_PATHNAME + LOGIN_PATHNAME}>登录</Link>;

  return <>{username ? UserInfo : Login}</>;
};
export default UserInfo;
