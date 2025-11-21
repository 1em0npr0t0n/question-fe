import React, { FC, useState } from 'react';
import { Input } from 'antd';
import type { ChangeEvent } from 'react';
const { Search } = Input;
const ListSearch: FC = () => {
  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function handleSearch(value: string) {
    console.log(value);
  }
  return (
    <Search
      allowClear
      placeholder="input search text"
      onChange={handleChange}
      value={value}
      onSearch={handleSearch}
      style={{ width: '260px' }}
    />
  );
};
export default ListSearch;
