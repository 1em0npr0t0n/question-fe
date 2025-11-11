import React, { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
const Edit: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  console.log('key', searchParams.get('key'));
  return <div>{id}</div>;
};
export default Edit;
