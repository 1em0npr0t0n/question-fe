import { Button, Result, Spin } from 'antd';
import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import styles from './Index.module.scss';
import StatHeader from './StatHeader';
// import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
const Star: FC = () => {
  const { loading } = useLoadQuestionData();
  //console.log('key', searchParams.get('key'));
  const { title, isPublished } = useGetPageInfo();
  useTitle(`问卷统计 - ${title}`);
  const nav = useNavigate();
  //加载动画
  const loadingElement = (
    <div style={{ textAlign: 'center', margin: '100px' }}>
      <Spin />
    </div>
  );
  //内容判断
  function genContentElement() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <Result
          style={{ flex: 1 }}
          status="warning"
          title="该页面尚未发布"
          extra={
            <Button type="primary" onClick={() => nav(-1)}>
              Back
            </Button>
          }
        />
      );
    } else {
      return (
        <>
          <div className={styles.left}>left</div>
          <div className={styles.middle}>middle</div>
          <div className={styles.right}>right</div>
        </>
      );
    }
  }

  return (
    <div className={styles.container}>
      <StatHeader />

      <div className={styles['content-wrapper']}>
        {loading && loadingElement}
        <div className={styles.content}>{!loading && genContentElement()}</div>
      </div>
    </div>
  );
};
export default Star;
