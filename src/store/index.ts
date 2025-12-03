import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userStateType } from './userReducer';
import componentReducer, { ComponentStateType } from './componentsReducer';
export type StateType = {
  user: userStateType;
  components: ComponentStateType;
};
export default configureStore({
  reducer: {
    user: userReducer, //用户信息
    components: componentReducer, //画布组件
  },
});
