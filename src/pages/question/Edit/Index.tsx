import React, { FC } from 'react';
import styles from './index.module.scss';
// import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import EditCanvas from './EditCanvas';
const Edit: FC = () => {
  //   const { id = '' } = useParams();
  // const [loading, setLoading] = useState(true);
  // const [questionData, setQuestionData] = useState({});
  // useEffect(() => {
  //   async function fn() {
  //     try {
  //       const data = await getQuestionService(id);
  //       setQuestionData(data);
  //       setLoading(false);
  //       console.log('data:', data);
  //     } catch (error: any) {
  //       // 错误被成功捕获，不会再是 Uncaught Error
  //       console.error('组件捕获到错误:', error);
  //     }
  //   }
  //   fn();
  // }, [id]);
  //const [searchParams] = useSearchParams();

  //console.log('key', searchParams.get('key'));

  // const { loading, data } = useLoadQuestionData();
  return (
    <div className={styles.container}>
      <header style={{ backgroundColor: 'white', height: '40px' }}>header</header>
      <main className={styles['content-wrapper']}>
        <div className={styles['content']}>
          <div className={styles.left}>left</div>
          <div className={styles.middle}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas />
            </div>
          </div>
          <div className={styles.right}>right</div>
        </div>
      </main>
    </div>
  );
};
export default Edit;
