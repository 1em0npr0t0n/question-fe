import { Button, Result } from 'antd';
import React, { FC, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useTitle } from 'ahooks';
import styles from './Index.module.scss';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import PageStat from './PageStat';
import LoadAnim from '../../../components/LoadAnim';
import ChartStat from './ChartStat';
// import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
const Star: FC = () => {
  const { loading } = useLoadQuestionData();
  //console.log('key', searchParams.get('key'));
  const { title, isPublished } = useGetPageInfo();
  //状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');
  const { id = '' } = useParams();
  useTitle(`问卷统计 - ${title}`);
  const nav = useNavigate();
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
          <div className={styles.left}>
            <ComponentList
              loading={loading}
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              selectedComponentType={selectedComponentType}
              setSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.middle}>
            <PageStat
              selectedComponentId={selectedComponentId}
              setSelectedComponentId={setSelectedComponentId}
              selectedComponentType={selectedComponentType}
              setSelectedComponentType={setSelectedComponentType}
            />
          </div>
          <div className={styles.right}>
            <ChartStat
              questionId={id}
              selectedComponentId={selectedComponentId}
              selectedComponentType={selectedComponentType}
            />
          </div>
        </>
      );
    }
  }

  return (
    <div className={styles.container}>
      <StatHeader />

      <div className={styles['content-wrapper']}>
        {loading && <LoadAnim />}
        <div className={styles.content}>{!loading && genContentElement()}</div>
      </div>
    </div>
  );
};
export default Star;
