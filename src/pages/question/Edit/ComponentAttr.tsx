import { FC } from 'react';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { ComponentPropsType, getComponentConfByType } from '../../../components/questionComponents';
import { useDispatch } from 'react-redux';
import { changeComponentProps } from '../../../store/componentsReducer';
/**
 *selectedComponent 为空时返回的属性面板
 * @returns 未选中组件
 */
const NoAttr: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};
//右侧属性面板
const ComponentAttr: FC = () => {
  const dispatch = useDispatch();
  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoAttr />;
  const { type, props, isLocked, isHidden } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoAttr />;
  /**
   *
   * @param newAttr 新的组件属性
   */
  function changeProps(newAttr: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps: newAttr }));
  }
  const { AttrComponent } = componentConf;
  return <AttrComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />;
};
export default ComponentAttr;
