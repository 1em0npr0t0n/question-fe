import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/questionComponents';
import { getNextSelectedId } from './utils';
/**
 * 组件数据类型
 */
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
};
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //组件赋值 空 重置所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload;
    },
    // changeSelectedId:(state:ComponentStateType,action:PayloadAction<string>)=>{

    // },
    //修改选中的组件id
    changeSelectedId: (state: ComponentStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
    //组件库添加到画布
    addComponent: (state: ComponentStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      const { selectedId, componentList } = state;
      const index = componentList.findIndex(c => c.fe_id === selectedId);
      if (index < 0) {
        //未选中任何组件
        state.componentList.push(newComponent);
      } else {
        //选中了组件，插入到index后面
        state.componentList.splice(index + 1, 0, newComponent);
      }
      state.selectedId = newComponent.fe_id;
    },
    //改变组件属性
    changeComponentProps: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
    ) => {
      const { fe_id, newProps } = action.payload;
      const curComp = state.componentList.find(c => c.fe_id === fe_id);
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        };
      }
    },
    //删除选中组件
    removeSelectedComponent: (state: ComponentStateType) => {
      const { selectedId: removeId, componentList = [] } = state;
      const { removeIndex, newSelectedId } = getNextSelectedId(removeId, componentList);
      state.selectedId = newSelectedId;
      //const index = componentList.findIndex(c => c.fe_id === removeId);
      if (removeIndex >= 0) {
        componentList.splice(removeIndex, 1);
      }
    },
    //改变 显示/隐藏 组件
    changeComponentHidden: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { componentList = [] } = state;
      const { fe_id, isHidden } = action.payload;
      let newSelectedId = '';
      if (isHidden) {
        const { newSelectedId: selectedId } = getNextSelectedId(fe_id, componentList);
        newSelectedId = selectedId;
      } else {
        newSelectedId = fe_id;
      }
      state.selectedId = newSelectedId;
      const currentComponent = componentList.find(c => c.fe_id === fe_id);

      if (currentComponent) {
        currentComponent.isHidden = isHidden;
      }
    },
  },
});
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
} = componentsSlice.actions;
export default componentsSlice.reducer;
