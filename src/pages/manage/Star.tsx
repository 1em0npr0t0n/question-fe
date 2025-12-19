import React, { FC } from 'react';
import styles from './Manage.module.scss';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import { Typography, Empty, Spin } from 'antd';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';
import { useTitle } from 'ahooks';
// const rawQuestionList = [
//   {
//     _id: '1',
//     title: '问卷1',
//     isPublished: false,
//     isStar: true,
//     answerCount: 5,
//     createdAt: '2015年08月04日',
//   },
//   {
//     _id: '2',
//     title: '问卷2',
//     isPublished: false,
//     isStar: true,
//     answerCount: 3,
//     createdAt: '2015年08月03日',
//   },
//   {
//     _id: '3',
//     title: '问卷3',
//     isPublished: true,
//     isStar: true,
//     answerCount: 12,
//     createdAt: '2005年01月02日',
//   },
// ];
const { Title } = Typography;
const Star: FC = () => {
  useTitle('星标问卷');
  // const [questionList] = useState(rawQuestionList);
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], count = 0 } = data;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          {/* 搜索框 */}
          <ListSearch />
        </div>
      </header>
      <nav className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {/* {问卷列表} */}
        {!loading && list.length === 0 && <Empty description="没有数据呀" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </nav>
      <footer className={styles.footer}>
        <ListPage total={count} />
      </footer>
    </>
  );
};
export default Star;
