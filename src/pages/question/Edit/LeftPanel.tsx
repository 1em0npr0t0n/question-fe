import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { FC } from 'react';
import ComponentLib from './ComponentLib';

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: '组件库',
      children: <ComponentLib />,
      icon: <AppstoreOutlined />,
    },
    {
      key: 'layers',
      label: '图层',
      children: '图层',
      icon: <BarsOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};
export default LeftPanel;
