/**
 * @description 加载问卷数据hook  同步数据到redux
 */
import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCompinents } from '../store/componentsReducer';
function useLoadQuestionData() {
  const { id = '' } = useParams();
  const dispatch = useDispatch();
  const { data, error, loading, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('问卷异常'); //没有ID
      const data = await getQuestionService(id);
      return data;
    },
    { manual: true },
  );
  useEffect(() => {
    if (!data) return;
    // const { title = '', componentList = [] } = data;
    const { componentList = [] } = data;
    //画布组件列表信息 存储到redux
    dispatch(resetCompinents({ componentList }));
  }, [data, dispatch]);
  //问卷ID变化，执行ajax 加载问卷
  useEffect(() => {
    run(id);
  }, [id, run]);
  return { error, loading };
}
export default useLoadQuestionData;
