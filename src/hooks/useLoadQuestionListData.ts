import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../comstant';
import { getQuestionListService } from '../services/question';
type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [searchPargms] = useSearchParams();
  const keyword = searchPargms.get(LIST_SEARCH_PARAM_KEY) || '';
  const { loading, data, error } = useRequest(
    async () => {
      const data = await getQuestionListService({ keyword, isStar, isDeleted });
      return data;
    },
    { refreshDeps: [searchPargms] },
  );
  return { loading, data, error };
}

export default useLoadQuestionListData;
