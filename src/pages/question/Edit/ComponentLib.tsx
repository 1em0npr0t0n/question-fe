import React, { FC } from 'react';
import { componentConfGroup, ComponentConfType } from '../../../components/questionComponents';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
import { addComponent } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import { nanoid, Dispatch } from '@reduxjs/toolkit';
/**
 *
 * @param c 组件信息
 * @param dispatch redux dispatch
 * @returns 右侧组件库内的组件
 */
function genComponent(c: ComponentConfType, dispatch: Dispatch) {
  const { title, type, Component, defaultProps } = c;
  //点击把组件添加到画布
  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      }),
    );
  }
  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  );
}
const ComponentLib: FC = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  return (
    <div>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;
        return (
          <React.Fragment key={groupId}>
            {/* 右侧组件库内渲染组件标题 */}
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '10px' : '0px' }}>
              {groupName}
            </Title>
            {/* //生成组件库内组件 */}
            {components.map(c => genComponent(c, dispatch))}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default ComponentLib;
