import React, { FC, useEffect, useRef, useState, useMemo } from 'react';
import styles from './Manage.module.scss';
import QuestionCard from '../../components/QuestionCard';
import ListSearch from '../../components/ListSearch';
import { Typography, Spin, Empty } from 'antd';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
//import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../../services/question';
import { LIST_PAGE_SIZE_DEFAULT, LIST_SEARCH_PARAM_KEY } from '../../constant';

const { Title } = Typography;
const List: FC = () => {
  //const [questionList] = useState(rawQuestionList);
  useTitle('问卷列表');
  // const { data = {}, loading } = useLoadQuestionListData();
  // const { list = [], total = 0 } = data;

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
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1); //
  const [list, setList] = useState([]); //数据列表
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE_DEFAULT,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], count = 0 } = result;
        setList(list.concat(l)); //组合list数据
        setPage(page + 1); //页码+1
        setTotal(count);
      },
    },
  );

  const containerRef = useRef<HTMLDivElement>(null);
  //滑动加载防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const element = containerRef.current;
      if (element == null) return;

      const domRect = element.getBoundingClientRect();
      if (domRect == null) return;

      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
      //console.log('try load');
    },
    { wait: 1000 },
  );
  //keyword 变化 重置所有信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);
  //页面加载 或者url参数 keyword 变化时触发加载
  useEffect(() => {
    tryLoadMore();
  }, [searchParams, tryLoadMore]);
  // 页面滚动式要尝试加载
  useEffect(() => {
    if (haveMoreData) {
      //增加事件
      window.addEventListener('scroll', tryLoadMore);
    }

    return () => {
      //解绑事件
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, haveMoreData, tryLoadMore]);
  //加载更多 标定元素 同时使用缓存
  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading)
      return (
        <div style={{ textAlign: 'center' }}>
          {/* loading 动画 */}
          <Spin />
        </div>
      );
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData)
      return (
        <div style={{ textAlign: 'center' }}>
          <span>没有更多</span>
        </div>
      );
    return <span>加载更多中...</span>;
  }, [started, loading, total, haveMoreData]);
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
        {/* {问卷列表} */}
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
