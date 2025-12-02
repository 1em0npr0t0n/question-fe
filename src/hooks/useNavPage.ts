import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import {
  HOME_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANGE_LIST_PATHNAME,
} from '../router';
/**
 * 对登录和未登录的用户进行导流
 * @param waitingUserData true直接返回，false则进行导流
 */
function useNavPage(waitingUserData: boolean) {
  const { userid } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (waitingUserData) return;
    //用户id 来区分登录
    if (userid) {
      //已登录
      if (isLoginOrRegister(pathname)) {
        nav(HOME_PATHNAME + MANGE_LIST_PATHNAME);
      }
      return;
    } else {
      //未登录
      if (isNoNeedUserInfo(pathname)) {
        return;
      } else {
        nav(HOME_PATHNAME + LOGIN_PATHNAME);
      }
    }
  }, [waitingUserData, userid, pathname, nav]);
}
export default useNavPage;
