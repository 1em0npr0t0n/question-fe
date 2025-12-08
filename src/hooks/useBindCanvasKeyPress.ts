import { useKeyPress } from 'ahooks';
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from '../store/componentsReducer';
import { useDispatch } from 'react-redux';
/**
 * 判断选中组件是否为body 如果为body返回真，
 * @returns true/false
 */
function isActiveElementValid() {
  const activeElem = document.activeElement;
  if (activeElem === document.body) {
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
}
export default useBindCanvasKeyPreaa;
