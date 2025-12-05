import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import { removeSelectedComponent, changeComponentHidden } from '../../../store/componentsReducer';

const EditToolbar: FC = () => {
  const { selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  //删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  //隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏/显示">
        <Button icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
    </Space>
  );
};
export default EditToolbar;
