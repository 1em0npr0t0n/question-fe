import React, { FC } from 'react';
import { Space, Typography, Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Register.module.scss';
import { HOME_PATHNAME, LOGIN_PATHNAME } from '../router';
import { useRequest } from 'ahooks';
import { registerUserService } from '../services/user';
const Register: FC = () => {
  const nav = useNavigate();
  const { run: registerRun, loading: registerLoading } = useRequest(
    async values => {
      const { username, password, email, phone, nickname } = values;
      const data = await registerUserService(username, password, email, phone, nickname);
      return data;
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功');
        nav(HOME_PATHNAME + LOGIN_PATHNAME);
      },
    },
  );
  const onFinish = (values: any) => {
    console.log(values);
    registerRun(values);
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
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ type: 'string', min: 2, max: 20, message: '字符长度在 2-20 之间' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '邮箱地址有错误' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请填写密码' },
              { type: 'string', min: 6, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']} //依赖
            rules={[
              { required: true, message: '请再次输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('两次输入密码不一致'));
                  }
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="手机号码" name="phone">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" disabled={registerLoading}>
                提交
              </Button>
              <Link to={'/' + LOGIN_PATHNAME}> 已有账户,请登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Register;
