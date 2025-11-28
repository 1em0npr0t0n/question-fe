import React, { FC, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { LIST_PAGE_SIZE_DEFAULT, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
  total: number;
};
const ListPage: FC<PropsType> = (props: PropsType) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE_DEFAULT);
  const { total } = props;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
    setCurrent(page);
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_DEFAULT;
    setPageSize(pageSize);
  }, [searchParams]);
  //当 page pagesize 改变是，跳转页面(改变url 参数)
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageSize(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      align="end"
      onChange={handlePageSize}
    />
  );
};
export default ListPage;
