import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { MANGE_LIST_PATHNAME } from '../router';
import styles from './Home.module.scss';

const Home: FC = () => {
  const nav = useNavigate();
  const { Title, Paragraph } = Typography;
  // useEffect(() => {
  //   // fetch('/api/test')
  //   //   .then(res => res.json())
  //   //   .then(data => console.log('fetch data', data));
  // }, []);
  return (
    <div className={styles.container}>
      {/* <p>首页</p>
      <div>
        <Button
          onClick={() => {
            nav('/login');
          }}
        >
          到login
        </Button>
        <Link to="/register">注册</Link>
      </div> */}
      <Title>问卷调查|在线投票</Title>
      <Paragraph>已累计创建问卷 555 份，发布问卷 444 份，收到答卷 999 份</Paragraph>
      <div className={styles.info}>
        <Button type="primary" onClick={() => nav(MANGE_LIST_PATHNAME)}>
          开始使用
        </Button>
      </div>
    </div>
  );
};
export default Home;
