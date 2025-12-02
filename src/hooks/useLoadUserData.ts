import { useEffect, useState } from 'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { useDispatch } from 'react-redux';
import { loginReducer, userStateType } from '../store/userReducer';
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
      const userInfo: userStateType = result as userStateType;
      dispatch(loginReducer(userInfo));
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
