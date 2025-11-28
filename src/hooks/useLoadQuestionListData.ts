import { useRequest } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_DEFAULT,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from '../constant';
import { getQuestionListService } from '../services/question';
type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};
function useLoadQuestionListData(opt: Partial<OptionType> = {}) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
  const pageSize =
    parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_DEFAULT;
  const { loading, data, error } = useRequest(
    async () => {
      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize });
      return data;
    },
    { refreshDeps: [searchParams] },
  );
  return { loading, data, error };
}

export default useLoadQuestionListData;
