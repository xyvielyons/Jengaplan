'use client'
import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import NavButtons from './FormNavButtons'
import { Button } from '@heroui/react'
import { ArrowRight } from 'lucide-react'
import { updateFormData } from '@/store/slices/SchemeSlice'


// A sortable item component for each topic
const SortableItem = ({ id }: { id: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px 16px',
    margin: '4px 0',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'grab',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  )
}

// The main component that renders a sortable list of topics
const KanbanTopic = () => {
  const topicsInitialData = useAppSelector((state:any)=>state.schemes.formData?.selectedTopics) || []
  const [topics, setTopics] = useState<string[]>(topicsInitialData)

  // Configure sensors (mouse and touch)
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  )

  // Handle the end of a drag operation
  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      setTopics((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
    const dispatch = useAppDispatch()
    const updateTopicOrder = ()=>{
        dispatch(updateFormData({selectedTopics:topics}))
        console.log(topics)
    }

  return (
    <div className="">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={topics} strategy={verticalListSortingStrategy}>
            {topics.map((topic) => (
            <SortableItem key={topic} id={topic} />
            ))}
        </SortableContext>
        </DndContext>
        <div className="flex md:flex-row md:justify-between flex-col">
            <NavButtons></NavButtons>
            <Button radius="sm" className='bg-blue-600 text-white mt-2' endContent={<ArrowRight></ArrowRight>} onPress={updateTopicOrder}>Generate Pdf</Button>
        </div>
    </div>
    
  )
}

export default KanbanTopic
