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
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentStateType = {
  componentList: [],
};
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetCompinents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload;
    },
  },
});
export const { resetCompinents } = componentsSlice.actions;
export default componentsSlice.reducer;
