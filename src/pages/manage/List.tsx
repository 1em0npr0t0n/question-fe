import React, { FC } from 'react';
import styles from './Manage.module.scss';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import { Typography, Spin } from 'antd';
import { useTitle } from 'ahooks';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';

// const rawQuestionList = [
//   {
//     _id: '1',
//     title: '问卷1',
//     isPublished: false,
//     isStar: false,
//     answerCount: 5,
//     createAt: '2015年08月04日',
//   },
//   {
//     _id: '2',
//     title: '问卷2',
//     isPublished: false,
//     isStar: true,
//     answerCount: 3,
//     createAt: '2015年08月03日',
//   },
//   {
//     _id: '3',
//     title: '问卷3',
//     isPublished: true,
//     isStar: false,
//     answerCount: 12,
//     createAt: '2005年01月02日',
//   },
//   {
//     _id: '4',
//     title: '问卷4',
//     isPublished: false,
//     isStar: false,
//     answerCount: 22,
//     createAt: '2011年03月01日',
//   },
// ];

const { Title } = Typography;
const List: FC = () => {
  //const [questionList] = useState(rawQuestionList);
  useTitle('问卷列表');
  const { data = {}, loading } = useLoadQuestionListData();
  const { list = [], total = 0 } = data;

  // const [list, setList] = useState([]);
  // const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   async function load() {
  //     const data = await getQuestionListService();
  //     const { list = [], total = 0 } = data;
  //     setList(list);
  //     setTotal(total);
  //   }
  //   load();
  // }, []);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
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
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </nav>
      <footer className={styles.footer}>{total} loadMore 加载更多</footer>
    </>
  );
};
export default List;
