import { FC, JSX } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  //PointerSensor,
  //KeyboardSensor
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  //arrayMove,
  SortableContext,
  //sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
type PropsType = {
  children: JSX.Element | JSX.Element[];
  items: Array<{ id: string; [key: string]: unknown }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};
const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props;

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    //useSensor(PointerSensor),
    //useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(i => i.fe_id === active.id);
      const newIndex = items.findIndex(i => i.fe_id === over.id);
      onDragEnd(oldIndex, newIndex);
    }
  }

  return (
    //双层上下文
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
export default SortableContainer;
