import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponentSort,
} from '../../../store/componentsReducer';

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo();
  const isLocked = selectedComponent?.isLocked ?? false;
  const length = componentList.length;
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex + 1 >= length;

  const dispatch = useDispatch();
  //删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }
  //隐藏/显示组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }
  //锁定/解锁
  function handleLock() {
    //dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }
  //复制
  function handleCopy() {
    dispatch(copySelectedComponent());
  }
  //粘贴
  function handlePaste() {
    dispatch(pasteCopiedComponent());
  }
  function handleUpMove() {
    //const index = componentList.findIndex(c => c.fe_id === selectedId);
    if (isFirst) return;
    dispatch(moveComponentSort({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  }
  function handleDownMove() {
    //const index = componentList.findIndex(c => c.fe_id === selectedId);
    if (isLast) return;
    dispatch(moveComponentSort({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  }
  // TODO 上移/下移，撤销/重做
  return (
    <Space>
      <Tooltip title="删除">
        <Button icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="锁定/解锁">
        <Button
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button icon={<UpOutlined />} onClick={handleUpMove} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button icon={<DownOutlined />} onClick={handleDownMove} disabled={isLast}></Button>
      </Tooltip>
    </Space>
  );
};
export default EditToolbar;
