import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from 'antd';
import styles from './ManageLayout.module.scss';
const ManageLayout: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout</p>
        <Button>创建问卷</Button>
        <Button>我的问卷</Button>
        <Button>星标问卷</Button>
        <Button>回收站</Button>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default ManageLayout;
