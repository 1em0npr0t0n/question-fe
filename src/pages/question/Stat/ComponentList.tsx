import { FC } from 'react';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { getComponentConfByType } from '../../../components/questionComponents';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import styles from './ComponentList.module.scss';
import classNames from 'classnames';
type PropsType = {
  loading: boolean;
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  selectedComponentType: string;
  setSelectedComponentType: (type: string) => void;
};
const ComponentList: FC<PropsType> = (props: PropsType) => {
  const { loading, selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { componentList = [] } = useGetComponentInfo();
  //const [selectedComponentId, setSelectedComponentId] = useState('');
  /**
   * @param componentInfo
   * @returns 返回组合好的组件，形式FC<>===<QuestionTitle />
   */
  function genComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo;
    const componentConf = getComponentConfByType(type);
    if (componentConf == null) return null;
    const { Component } = componentConf;
    //返回带参数的组件
    return <Component {...props} />;
  }
  if (loading) {
    return <Spin></Spin>;
  }

  return (
    <div className={styles.container}>
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, type } = c;
          const componentWrapper = styles['component-wrapper'];
          const componentSelected = styles.selected;
          const componentCss = classNames({
            [componentWrapper]: true,
            [componentSelected]: fe_id === selectedComponentId,
          });
          return (
            <div
              key={fe_id}
              className={componentCss}
              onClick={() => {
                setSelectedComponentId(fe_id);
                setSelectedComponentType(type);
              }}
            >
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
};
export default ComponentList;
