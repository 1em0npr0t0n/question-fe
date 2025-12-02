import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { userStateType } from '../store/userReducer';

function useGetUserInfo() {
  const { userid, username, nickname, email, phone } = useSelector<StateType>(
    state => state.user,
  ) as userStateType;
  return { userid, username, nickname, email, phone };
}
export default useGetUserInfo;
