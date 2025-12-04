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
  },
});
export const { resetComponents, changeSelectedId } = componentsSlice.actions;
export default componentsSlice.reducer;
