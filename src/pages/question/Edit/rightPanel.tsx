import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { FC, useEffect, useState } from 'react';
import ComponentAttr from './ComponentAttr';
import PageSetting from './PageSetting';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

/**
 * 枚举KEY
 * PROP_KEY = 'prop',
 * SETTING_KEY = 'setting',
 */
enum TAB_KEYS {
  /**
   * PROP_KEY = 'prop' 代表右侧属性页面的activeKey
   */
  PROP_KEY = 'prop',
  /**
   *  SETTING_KEY = 'setting', 右侧面板页面设置页面 activeKey
   */
  SETTING_KEY = 'setting',
}
const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();
  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY);
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY);
    }
  }, [selectedId]);
  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentAttr />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: '页面设置',
      icon: <SettingOutlined />,
      children: <PageSetting />,
    },
  ];
  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
};
export default RightPanel;
