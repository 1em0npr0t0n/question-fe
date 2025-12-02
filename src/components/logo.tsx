import React, { FC, useEffect, useState } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './logo.module.scss';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { HOME_PATHNAME, MANGE_LIST_PATHNAME } from '../router';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState('/');
  useEffect(() => {
    if (username) {
      setPathname(HOME_PATHNAME + MANGE_LIST_PATHNAME);
    }
  }, [username]);
  return (
    <div className={styles.logo}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>质子问卷</Title>
        </Space>
      </Link>
    </div>
  );
};
export default Logo;
