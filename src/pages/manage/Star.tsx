import React, { FC, useState } from 'react';
import styles from './Manage.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { Typography, Empty } from 'antd';
const rawQuestionList = [
  {
    _id: '1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '2015年08月04日',
  },
  {
    _id: '2',
    title: '问卷2',
    isPublished: false,
    isStar: true,
    answerCount: 3,
    createAt: '2015年08月03日',
  },
  {
    _id: '3',
    title: '问卷3',
    isPublished: true,
    isStar: true,
    answerCount: 12,
    createAt: '2005年01月02日',
  },
];
const { Title } = Typography;
const Star: FC = () => {
  const [questionList] = useState(rawQuestionList);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>(搜索框)</div>
      </header>
      <nav className={styles.content}>
        {/* {问卷列表} */}
        {questionList.length === 0 && <Empty description="没有数据呀" />}
        {questionList.length > 0 &&
          questionList.map(q => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </nav>
      <footer className={styles.footer}>分页</footer>
    </>
  );
};
export default Star;
