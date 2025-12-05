import React, { FC } from 'react';
import styles from './index.module.scss';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/componentsReducer';
import LeftPanel from './LeftPanel';
import RightPanel from './rightPanel';
const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();
  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }
  return (
    <div className={styles.container}>
      <header style={{ backgroundColor: 'white', height: '40px' }}>header</header>
      <main className={styles['content-wrapper']}>
        <div className={styles['content']}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.middle} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Edit;
