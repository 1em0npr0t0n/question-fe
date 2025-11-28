import React, { FC, useEffect, useRef, useState, useMemo } from 'react';
import styles from './Manage.module.scss';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import { Typography, Spin, Empty } from 'antd';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../../services/question';
import { LIST_PAGE_SIZE_DEFAULT, LIST_SEARCH_PARAM_KEY } from '../../constant';

const { Title } = Typography;

// --- 明确定义数据接口
interface ListDataType {
  list: any[];
  total: number;
}

interface LoadResultType extends ListDataType {
  currentPage: number;
}
// ------------------------------------------

const List: FC = () => {
  useTitle('问卷列表');

  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';

  // 核心加载逻辑，指定 LoadResultType 为返回类型
  const { run: load, loading } = useRequest<LoadResultType, [number?]>(
    async (retryPage?: number) => {
      const currentPage = retryPage || page;

      const rawData = await getQuestionListService({
        // 明确 data 的类型
        page: currentPage,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
        keyword,
      });
      const data = rawData as ListDataType;
      // 返回的结构保证 list, total, currentPage 属性都存在
      return { ...data, currentPage };
    },
    {
      manual: true,
      onSuccess(result) {
        // 此时 result 的类型被正确识别为 LoadResultType，包含 list 和 total
        const { list: l = [], total = 0, currentPage } = result;

        setPage(currentPage + 1);
        setTotal(total);
        setStarted(true);

        if (currentPage === 1) {
          setList(l);
        } else {
          setList(prevList => prevList.concat(l));
        }
      },
    },
  );

  // 1. URL keyword 变化时，重置并加载第一页
  useEffect(() => {
    setStarted(false);
    setPage(1);
    load(1);
  }, [keyword, load]);

  // 2. 尝试加载更多的函数（防抖）
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const element = containerRef.current;
      if (element == null) return;
      const domRect = element.getBoundingClientRect();
      if (domRect == null) return;

      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
      }
    },
    { wait: 1000 },
  );

  // 3. 页面滚动监听
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore);
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, haveMoreData, tryLoadMore]);

  // 4. 首次渲染时，如果页面高度不够（没有滚动条），手动触发一次检测
  useEffect(() => {
    tryLoadMore();
  }, [searchParams, tryLoadMore]);

  // 底部加载状态 UI
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading)
      return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <Spin />
        </div>
      );
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData)
      return (
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <span>没有更多了</span>
        </div>
      );
    return (
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <span>向下滑动加载更多...</span>
      </div>
    );
  }, [started, loading, total, haveMoreData]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </header>
      <nav className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </nav>
      <footer className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </footer>
    </>
  );
};

export default List;
