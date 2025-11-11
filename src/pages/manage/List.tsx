import React, { FC, useState } from 'react';
import styles from './List.module.scss';
import QuestionCard from '../../components/QuestionCard';
const rawQuestionList = [
  {
    _id: '1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '2015年08月04日',
  },
  {
    _id: '2',
    title: '问卷2',
    isPublished: false,
    isStar: false,
    answerCount: 3,
    createAt: '2015年08月03日',
  },
  {
    _id: '3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 12,
    createAt: '2005年01月02日',
  },
  {
    _id: '4',
    title: '问卷4',
    isPublished: false,
    isStar: false,
    answerCount: 22,
    createAt: '2011年03月01日',
  },
];
const List: FC = () => {
  const [questionList] = useState(rawQuestionList);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>(搜索框)</div>
      </header>
      <nav className={styles.content}>
        {questionList.map(q => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q}></QuestionCard>;
        })}
      </nav>
      <footer className={styles.footer}>页脚</footer>
    </>
  );
};
export default List;
