import React, { FC } from 'react';
import { Space, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './logo.module.scss';

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className={styles.logo}>
      <Link to="/">
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
