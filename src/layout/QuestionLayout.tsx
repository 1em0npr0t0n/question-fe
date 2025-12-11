import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import LoadAnim from '../components/LoadAnim';
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return <div style={{ height: '100vh' }}>{waitingUserData ? <LoadAnim /> : <Outlet />}</div>;
};
export default QuestionLayout;
