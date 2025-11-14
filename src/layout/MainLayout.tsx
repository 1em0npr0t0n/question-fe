import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Logo from '../components/logo';
import UserInfo from '../components/UserInfo';
import styles from './MainLayout.module.scss';

const { Header, Footer, Content } = Layout;
const MainLayout: FC = () => {
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
        <Outlet />
      </Content>

      <Footer className={styles.footer}>质子问卷</Footer>
    </Layout>
  );
};
export default MainLayout;
