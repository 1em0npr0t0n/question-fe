import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Logo from '../components/logo';
import UserInfo from '../components/UserInfo';
import styles from './MainLayout.module.scss';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>

      <Content className={styles.content}>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />{' '}
          </div>
        ) : (
          <Outlet />
        )}
      </Content>

      <Footer className={styles.footer}>质子问卷</Footer>
    </Layout>
  );
};
export default MainLayout;
