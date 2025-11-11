import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Home: FC = () => {
  const nav = useNavigate();

  return (
    <div>
      <p>首页</p>
      <div>
        <button
          onClick={() => {
            nav('/login');
          }}
        >
          到login
        </button>
        <Link to="/register">注册</Link>
      </div>
    </div>
  );
};
export default Home;
