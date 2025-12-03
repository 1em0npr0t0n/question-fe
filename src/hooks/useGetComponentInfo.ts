import { useSelector } from 'react-redux';
import { StateType } from '../store';
import { ComponentStateType } from '../store/componentsReducer';
/**
 *
 * @returns 获取Redux中的组件信息
 */
function useGetComponentInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentStateType;
  const { componentList = [] } = components;
  return {
    componentList,
  };
}
export default useGetComponentInfo;
