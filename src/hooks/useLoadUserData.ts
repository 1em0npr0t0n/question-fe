import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { useDispatch } from 'react-redux';
import { loginReducer, userStateType } from '../store/userReducer';
import { message } from 'antd';

/**
 * 用户信息加载等待状态
 * @returns 加载完成为false
 */
function useLoadUserData() {
  //返回加载状态
  const [waitingUserData, setWaitingUserData] = useState(true);
  const dispatch = useDispatch();

  //aja 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      // 处理用户信息，确保nickname和userid都有值
      const userInfo: userStateType = result as userStateType;
      userInfo.nickname = result.nickname || result.username;
      userInfo.userid = result.userid || result._id;
      dispatch(loginReducer(userInfo));
    },
    onError(error) {
      // 添加错误处理，确保应用不会崩溃
      message.error('获取用户信息失败');
      console.error('获取用户信息失败:', error);
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  //获取用户ID判断用户是否已经存在
  const { userid } = useGetUserInfo(); //获取用户是否已经登录

  useEffect(() => {
    if (userid) {
      setWaitingUserData(false);
      return;
    }
    run(); //如果redux store 中没有用户信息，则进行加载
  }, [userid, run]);

  return { waitingUserData };
}

export default useLoadUserData;
