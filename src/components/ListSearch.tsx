import React, { FC, useEffect, useState } from 'react';
import { Input, Space, Button } from 'antd';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import type { ChangeEvent } from 'react';
import { LIST_SEARCH_PARAM_KEY } from '../comstant';
// const { Search } = Input;
const ListSearch: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState('');

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curVal);
  }, [searchParams]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSearch() {
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }
  return (
    // <Search
    //   allowClear
    //   placeholder="搜索"
    //   onChange={handleChange}
    //   value={value}
    //   onSearch={handleSearch}
    //   style={{ width: '260px' }}
    // />
    // 使用 Space.Compact 包裹 Input 和 Button
    <Space.Compact style={{ width: '260px' }}>
      <Input
        allowClear
        placeholder="搜索"
        onChange={handleChange}
        value={value}
        onPressEnter={handleSearch} // 4. 监听回车键
      />
      <Button
        icon={<SearchOutlined />}
        onClick={handleSearch} // 5. 监听点击事件
      />
    </Space.Compact>
  );
};
export default ListSearch;
