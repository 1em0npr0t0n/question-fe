import { FC } from 'react';
import styles from './EditCanvas.module.scss';
// import QuestionTitle from '../../../components/questionComponents/questionTitle/Component';
// import QuestionInput from '../../../components/questionComponents/questionInput/Component';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentInfoType } from '../../../store/componentsReducer';
import { getComponentConfByType } from '../../../components/questionComponents';
type PropsType = {
  loading: boolean;
};
/**
 * @param componentInfo
 * @returns 返回组合好的组件，形式FC<>===<QuestionTitle />
 */
function genCpmponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  //返回带参数的组件
  return <Component {...props} />;
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c;
        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{genCpmponent(c)}</div>
          </div>
        );
      })}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  );
};
export default EditCanvas;
