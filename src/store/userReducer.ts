import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type userStateType = {
  userid: string;
  username: string;
  nickname: string;
  email: string;
  phone: number;
};
const INIT_USER_STATE: userStateType = {
  userid: '',
  username: '',
  nickname: '',
  email: '',
  phone: 0,
};
export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_USER_STATE,
  reducers: {
    loginReducer: (state: userStateType, action: PayloadAction<userStateType>) => {
      return action.payload; //返回新的store
    },
    logoutReducer: () => INIT_USER_STATE,
  },
});
export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
