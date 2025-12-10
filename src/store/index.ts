import { configureStore } from '@reduxjs/toolkit';
import userReducer, { userStateType } from './userReducer';
import componentReducer, { ComponentStateType } from './componentsReducer';
import pageInfoReducer, { PageInfoType } from './pageInfoReducer';
import undoable, { excludeAction, type StateWithHistory } from 'redux-undo';
export type StateType = {
  user: userStateType;
  components: StateWithHistory<ComponentStateType>;
  pageInfo: PageInfoType;
};
export default configureStore({
  reducer: {
    user: userReducer, //用户信息

    //components: componentReducer, //画布组件
    components: undoable(componentReducer, {
      limit: 20,
      filter: excludeAction([
        'components/changeSelectedId',
        'components/resetComponents',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
});
