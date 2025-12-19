import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Space,
  Typography,
  Button,
  Input,
  Form,
  Checkbox,
  CheckboxChangeEvent,
  message,
} from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import {} from 'react-router-dom';
import styles from './login.module.scss';
import { HOME_PATHNAME, MANGE_LIST_PATHNAME, REGISTER_PATHNAME } from '../router';
import { loginService } from '../services/user';
import { useRequest } from 'ahooks';
import { setToken } from './utils/user-token';
const { Title } = Typography;
const USERNAME = 'USERNAME';
const PASSWORD = 'PASSWORD';
//写入 user
function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME, username);
  localStorage.setItem(PASSWORD, password);
}
//忘记 user
function forgetUser(event: CheckboxChangeEvent) {
  const ischecked = event.target.checked;
  if (!ischecked) {
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(PASSWORD);
  }
}
//读取 user
function readUser() {
  return {
    username: localStorage.getItem(USERNAME),
    password: localStorage.getItem(PASSWORD),
  };
}
const Login: FC = () => {
  const nav = useNavigate();
  const { run: loginRun, loading: loginLoading } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      //console.log('loginService', data);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result;
        setToken(token);
        message.success('登录成功');
        nav(HOME_PATHNAME + MANGE_LIST_PATHNAME); // 导航到我的问卷
      },
    },
  );

  const [form] = Form.useForm();
  useEffect(() => {
    const { username, password } = readUser();
    const hasUser = !!username && !!password;
    if (hasUser) {
      form.setFieldsValue({ username, password, remember: hasUser });
    }
  }, [form]);

  const onFinish = (value: any) => {
    const { username, password, remember } = value || {};
    loginRun(username, password);
    if (remember) {
      rememberUser(username, password);
    }
  };
  return (
    <div className={styles.container}>
      <Space>
        <Title level={2}>
          <LoginOutlined />
        </Title>
        <Title level={2}>用户登录</Title>
      </Space>
      <div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: false }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请填写用户名' },
              { type: 'string', min: 6, max: 20, message: '用户名长度在 6-20 之间' },
              { pattern: /^\w+$/, message: '只允许使用字母数字和下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请填写密码' },
              { type: 'string', min: 6, max: 20, message: '密码长度为6-20之间' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" wrapperCol={{ offset: 8, span: 16 }} valuePropName="checked">
            <Checkbox onChange={forgetUser}>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit" disabled={loginLoading}>
                登录
              </Button>
              <Button type="text" onClick={() => nav('/' + REGISTER_PATHNAME)}>
                没有账户，请先注册
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
