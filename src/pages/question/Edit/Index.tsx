import React, { FC } from 'react';

import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
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
  const { loading, data } = useLoadQuestionData();
  //console.log('key', searchParams.get('key'));
  return (
    <div>
      <p>Edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};
export default Edit;
