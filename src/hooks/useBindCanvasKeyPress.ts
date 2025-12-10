import { useKeyPress } from 'ahooks';
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { useDispatch } from 'react-redux';
/**
 * 判断选中组件是否为body 如果为body返回真，
 * @returns true/false
 */
function isActiveElementValid() {
  const activeElem = document.activeElement;
  // dnd-kit 返回不是document.body 所以失效
  // if (activeElem === document.body) {
  //   return true;
  // } else {
  //   return false;
  // }
  if (activeElem === document.body) return true;
  //使用 matches 选择器
  if (activeElem?.matches('div[role="button"]')) {
    return true;
  } else {
    return false;
  }
}
function useBindCanvasKeyPreaa() {
  const dispatch = useDispatch();
  //快捷键删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return;
    dispatch(removeSelectedComponent());
  });
  //快捷键复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });
  //快捷键粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });
  //快捷键撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UndoActionCreators.undo());
    },
    {
      exactMatch: true,
    },
  );
  //快捷键重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return;
      dispatch(UndoActionCreators.redo());
    },
    {
      exactMatch: true,
    },
  );
}
export default useBindCanvasKeyPreaa;
