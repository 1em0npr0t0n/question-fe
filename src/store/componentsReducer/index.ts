import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/questionComponents';
import { getNextSelectedId, insertNewComponent } from './utils';
import cloneDeep from 'lodash.clonedeep';
/**
 * 组件数据类型
 */
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
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
      insertNewComponent(state, newComponent);
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
    //切换锁定状态
    toggleComponentLocked: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string }>,
    ) => {
      const { fe_id } = action.payload;
      const curComp = state.componentList.find(c => c.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    //复制当前选中组件  深复制拷贝，
    copySelectedComponent: (state: ComponentStateType) => {
      const { componentList, selectedId } = state;
      const selectedComponent = componentList.find(c => c.fe_id === selectedId);
      if (selectedComponent == null) return;
      //cloneDeep 浅拷贝不行
      state.copiedComponent = cloneDeep(selectedComponent); //深拷贝
    },
    //粘贴组件
    pasteCopiedComponent: (state: ComponentStateType) => {
      const { copiedComponent } = state;
      if (copiedComponent == null) return;
      //ID 不能重复 fe_id 重新生成
      copiedComponent.fe_id = nanoid();
      insertNewComponent(state, copiedComponent);
    },
    //选中上一个
    selectPrevComponent: (state: ComponentStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
      //const length = componentList.length;
      if (selectedIndex <= 0) {
        return;
      }
      state.selectedId = componentList[selectedIndex - 1].fe_id;
    },
    //选中下一个
    selectNextComponent: (state: ComponentStateType) => {
      const { selectedId, componentList } = state;
      const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId);
      const length = componentList.length;
      if (selectedIndex + 1 === length) {
        return;
      }
      if (selectedIndex < 0) {
        return;
      }
      state.selectedId = componentList[selectedIndex + 1].fe_id;
    },
    //修改组件title
    changeComponentTitle: (
      state: ComponentStateType,
      action: PayloadAction<{ fe_id: string; newTitle: string }>,
    ) => {
      const { newTitle, fe_id } = action.payload;
      const { componentList } = state;
      for (const c of componentList) {
        if (c.fe_id === fe_id) {
          c.title = newTitle;
          break;
        }
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
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = componentsSlice.actions;
export default componentsSlice.reducer;
