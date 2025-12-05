import { ComponentInfoType } from './index';
/**
 * 计算下一个被选中的ID
 * @param fe_id 当前选中ID
 * @param componentList 组件列表
 * @returns new选中ID
 */
export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  const visibleComponentList = componentList.filter(c => !c.isHidden);
  const removeIndex = visibleComponentList.findIndex(c => c.fe_id === fe_id);
  let newSelectedId = '';
  if (removeIndex < 0) return { removeIndex, newSelectedId };
  const length = visibleComponentList.length;

  if (length <= 1) {
    //就剩一个组件 没有下一个了，返回空
    newSelectedId = '';
  } else {
    if (removeIndex + 1 === length) {
      //是列表中最后一个组件，返回前面的组件ID
      newSelectedId = visibleComponentList[removeIndex - 1].fe_id;
    } else {
      //正常删除，返回排在后面的组件ID
      newSelectedId = visibleComponentList[removeIndex + 1].fe_id;
    }
  }
  return { removeIndex, newSelectedId };
}
