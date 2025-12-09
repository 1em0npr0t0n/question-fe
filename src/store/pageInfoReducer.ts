import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type PageInfoType = {
  title: string;
  desc?: string;
  jsCode?: string;
  cssCode?: string;
};
const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  jsCode: '',
  cssCode: '',
};
const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    //修改或者重置页面信息
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload;
    },
    //改变页面标题
    changePageTitle: (state: PageInfoType, action: PayloadAction<{ title: string }>) => {
      state.title = action.payload.title;
    },
  },
});
export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
