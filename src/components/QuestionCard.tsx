import React, { FC } from 'react';
import styles from './QuestionCard.module.scss';
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};
const QuestionCard: FC<PropsType> = (Props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createAt } = Props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <a href="/#">
              {title}
              {_id}
            </a>
          </div>
          <div className={styles.right}>
            {isPublished ? <span style={{ color: 'green' }}>已发布</span> : <span>未发布</span>}
            <span>答卷:{answerCount}</span>
            <span>{createAt}</span>
          </div>
        </div>
        <div className={styles['button-c']}>
          <div className={styles['left']}>
            <button>编辑问卷</button>
            <button>数据统计</button>
          </div>
          <div className={styles['right']}>
            <button>标星{isStar}</button>
            <button>复制</button>
            <button>删除</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuestionCard;
