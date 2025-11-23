import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Typography, Button, Input, Form } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import {} from 'react-router-dom';
import styles from './login.module.scss';
import { REGISTER_PATHNAME } from '../router';
const { Title } = Typography;
const Login: FC = () => {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <LoginOutlined />
        </Title>
        <Title level={2}>用户登录</Title>
      </Space>
      <div>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Form.Item label="用户名">
            <Input />
          </Form.Item>
          <Form.Item label="密码">
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary"> 登录</Button>
            <Button type="text" onClick={() => nav(REGISTER_PATHNAME)}>
              没有账户，请先注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
