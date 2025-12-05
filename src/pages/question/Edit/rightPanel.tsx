import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { FC } from 'react';
import ComponentAttr from './ComponentAttr';

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentAttr />,
    },
    {
      key: 'setting',
      label: '页面设置',
      icon: <SettingOutlined />,
      children: '页面设置',
    },
  ];
  return <Tabs defaultActiveKey="prop" items={tabsItems}></Tabs>;
};
export default RightPanel;
