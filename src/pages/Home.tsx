import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'antd';
const Home: FC = () => {
  const nav = useNavigate();

  return (
    <div>
      <p>首页</p>
      <div>
        <Button
          onClick={() => {
            nav('/login');
          }}
        >
          到login
        </Button>
        <Link to="/register">注册</Link>
      </div>
    </div>
  );
};
export default Home;
