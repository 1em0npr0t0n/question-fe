import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/questionComponents';
/**
 * 组件数据类型
 */
export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
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
  },
});
export const { resetComponents, changeSelectedId, addComponent } = componentsSlice.actions;
export default componentsSlice.reducer;
