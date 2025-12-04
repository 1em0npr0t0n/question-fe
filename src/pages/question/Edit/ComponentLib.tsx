import { FC } from 'react';
import { componentConfGroup, ComponentConfType } from '../../../components/questionComponents';
import { Typography } from 'antd';
import styles from './ComponentLib.module.scss';
import { addComponent } from '../../../store/componentsReducer';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
function genComponent(c: ComponentConfType, dispatch: any) {
  const { title, type, Component, defaultProps } = c;

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
          <>
            <Title
              level={3}
              key={groupId}
              style={{ fontSize: '16px', marginTop: index > 0 ? '10px' : '0px' }}
            >
              {groupName}
            </Title>
            {components.map(c => genComponent(c, dispatch))}
          </>
        );
      })}
    </div>
  );
};
export default ComponentLib;
