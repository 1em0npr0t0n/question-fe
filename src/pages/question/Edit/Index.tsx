import React, { FC } from 'react';
import styles from './index.module.scss';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditCanvas from './EditCanvas';
import { useDispatch } from 'react-redux';
import { changeSelectedId } from '../../../store/componentsReducer';
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
          <div className={styles.left}>left</div>
          <div className={styles.middle} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </main>
    </div>
  );
};
export default Edit;
