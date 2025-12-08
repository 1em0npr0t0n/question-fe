import { ChangeEvent, FC, useState } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { useDispatch } from 'react-redux';
import styles from './Layers.module.scss';
import classNames from 'classnames';
import { Button, Input, message, Space } from 'antd';
import {
  changeComponentHidden,
  changeComponentTitle,
  changeSelectedId,
  toggleComponentLocked,
} from '../../../store/componentsReducer';
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  //记录正在修改标题状态
  const [changingTitleId, setChanginTitleId] = useState('');
  //点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id);
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件');
      return;
    }
    if (fe_id !== selectedId) {
      //执行选中 同步画布选中ID
      dispatch(changeSelectedId(fe_id));
      setChanginTitleId('');
      return;
    }
    setChanginTitleId(fe_id);
  }
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (!newTitle) return;
    if (!selectedId) return;
    dispatch(changeComponentTitle({ fe_id: selectedId, newTitle }));
  }

  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }));
  }
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }));
  }
  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c;
        //拼接title className
        const titleDefaultClassName = styles.title;
        const selectedClassName = styles.selected;
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        });

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {fe_id === changingTitleId && (
                <Input
                  value={title}
                  onChange={changeTitle}
                  onPressEnter={() => {
                    setChanginTitleId('');
                  }}
                  onBlur={() => {
                    setChanginTitleId('');
                  }}
                />
              )}
              {fe_id !== changingTitleId && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  className={!isHidden ? styles.btn : ''}
                  icon={<EyeInvisibleOutlined />}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => {
                    changeHidden(fe_id, !isHidden);
                  }}
                ></Button>
                <Button
                  size="small"
                  shape="circle"
                  className={!isLocked ? styles.btn : ''}
                  icon={<LockOutlined />}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => {
                    changeLocked(fe_id);
                  }}
                ></Button>
              </Space>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Layers;
