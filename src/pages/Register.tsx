import React, { FC } from 'react';
import { Space, Typography, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Register.module.scss';
import { LOGIN_PATHNAME } from '../router';
const Register: FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };
  const { Title } = Typography;
  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>注册新用户</Title>
      </Space>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="确认密码" name="confirm">
            <Input.Password />
          </Form.Item>
          <Form.Item label="手机号码" name="phone">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Link to={LOGIN_PATHNAME}> 已有账户,请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
