'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import NavButtons from './FormNavButtons';
import { Button } from '@heroui/react';
import { ArrowRight } from 'lucide-react';
import { setCurrentStep, updateFormData } from '@/store/slices/SchemeSlice';

// A sortable item component for each list item, displaying its index.
const SortableItem = ({
  id,
  index,
}: {
  id: string;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="dark:bg-background bg-white border border-gray-300 p-2 mb-4 cursor-grab dark:border-gray-600 touch-none shadow-sm text-gray-700 rounded-sm dark:text-gray-100"
    >
      <span className="font-bold mr-2">{index + 1}.</span>
      {id}
    </div>
  );
};

// Main component that renders a sortable list of items.
// It uses selectedStrands if the school level is primary,
// otherwise it uses selectedTopics.
const KanbanList = () => {
  const formData = useAppSelector((state: any) => state.schemes.formData);
  const isPrimary = formData?.schoolLevel === 'primary';

  const initialList: string[] = isPrimary
    ? formData?.selectedStrands || []
    : formData?.selectedTopics || [];

  const [list, setList] = useState<string[]>(initialList);

  // Configure sensors (for mouse and touch)
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  // Handle drag end to reorder the list
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setList((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state: any) => state.schemes.currentStep);

  // Dispatch the updated order based on the school level
  const updateOrder = () => {
    if (isPrimary) {
      dispatch(updateFormData({ selectedStrands: list }));
    } else {
      dispatch(updateFormData({ selectedTopics: list }));
    }
    dispatch(setCurrentStep(currentStep + 1));
    console.log(list);
  };

  return (
    <div className="">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={list} strategy={verticalListSortingStrategy}>
          {list.map((item, index) => (
            <SortableItem key={item} id={item} index={index} />
          ))}
        </SortableContext>
      </DndContext>
      <div className="flex md:flex-row md:justify-between flex-col-reverse">
        <NavButtons />
        <Button
          radius="sm"
          className="bg-blue-600 text-white mt-2"
          endContent={<ArrowRight />}
          onPress={updateOrder}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default KanbanList;
