import { FC, MouseEvent } from 'react';
import styles from './EditCanvas.module.scss';
// import QuestionTitle from '../../../components/questionComponents/questionTitle/Component';
// import QuestionInput from '../../../components/questionComponents/questionInput/Component';
import { Spin } from 'antd';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import {
  changeSelectedId,
  ComponentInfoType,
  moveComponentSort,
} from '../../../store/componentsReducer';
import { getComponentConfByType } from '../../../components/questionComponents';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import useBindCanvasKeyPreaa from '../../../hooks/useBindCanvasKeyPress';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';
type PropsType = {
  loading: boolean;
};
/**
 * @param componentInfo
 * @returns 返回组合好的组件，形式FC<>===<QuestionTitle />
 */
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;
  const { Component } = componentConf;
  //返回带参数的组件
  return <Component {...props} />;
}
const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();
  useBindCanvasKeyPreaa();
  function handleClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  }
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin />
      </div>
    );
  }
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id };
  });
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponentSort({ oldIndex, newIndex }));
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c;
            const wrapperDefaultClassName = styles['component-wrapper'];
            const selectedClassName = styles.selected;
            const lockedClassName = styles.locked;
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            });
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={e => {
                    handleClick(e, fe_id);
                  }}
                >
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            );
          })}
        {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
      </div>
    </SortableContainer>
  );
};
export default EditCanvas;
