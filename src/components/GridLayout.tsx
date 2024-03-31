'use client'

import React, { useState } from 'react'
import { Box } from 'grommet'
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

import GridItem from './GridItem'

interface GridLayoutProps {
  items: any[]
}

export default function GridLayout(props: GridLayoutProps) {
  const [activeId, setActiveId] = useState(null)
  const [items, setItems] = useState(props.items.map((_, index) => index.toString()))
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: any) => {
    setActiveId(null)
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <Box
        flex={true}
        wrap={true}
        direction="row"
        justify="center"
        style={{ maxWidth: '100%' }}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map(item => (
            props.items[Number.parseInt(item)]
          ))}
          <DragOverlay>
            {activeId
              ? (
                  props.items[activeId]
                )
              : null}
          </DragOverlay>
        </SortableContext>
      </Box>
    </DndContext>
  )
}
