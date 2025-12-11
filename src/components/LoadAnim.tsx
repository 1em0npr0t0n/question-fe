import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { FC } from 'react';

const LoadAnim: FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>
  );
};
export default LoadAnim;
