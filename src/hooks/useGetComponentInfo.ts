import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentStateType } from '../store/componentsReducer';
/**
 *
 * @returns 获取Redux中的组件信息 包括当前选中组件的ID，和选中组件的信息
 */
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    state => state.components.present,
  ) as ComponentStateType;
  const { componentList = [], selectedId, copiedComponent } = components;
  const selectedComponent = componentList.find(c => c.fe_id === selectedId);
  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}
export default useGetComponentInfo;
