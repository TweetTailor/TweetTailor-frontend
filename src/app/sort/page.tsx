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

import SortableItem from './sortableItem'

function App() {
  const [activeId, setActiveId] = useState(null)
  const [items, setItems] = useState([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
  ])
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
          {items.map(id => (
            <SortableItem key={id} id={id} handle={true} value={id}>
              <div className="p-3">
                <div className="flex-center">
                  <div className="i-cryptocurrency-sol bg-gradient-to-b from-cyan-600 to-purple-600 text-10"></div>
                  <h3 className="ml-2 text-8 font-black">{id}</h3>
                </div>
              </div>
              <div className="w-full bg-black bg-hero-graph-paper-gray-600 py-3 rounded-b-8 relative">
                <div className="i-solar-course-up-linear text-green-600 text-12"></div>
              </div>
            </SortableItem>
          ))}
          <DragOverlay>
            {activeId
              ? (
                <div className={`${(activeId % 2) ? 'min-w-96' : 'min-w-96'} mx-2 flex flex-col bg-white bg-op-80 rounded-8 shadow-lg`}>
                  <div className="p-3">
                    <div className="flex-center">
                      <div className="i-cryptocurrency-sol bg-gradient-to-b from-cyan-600 to-purple-600 text-10"></div>
                      <h3 className="ml-2 text-8 font-black">{activeId}</h3>
                    </div>
                  </div>
                  <div className="w-full bg-black bg-hero-graph-paper-gray-600 py-3 rounded-b-8 relative">
                    <div className="i-solar-course-up-linear text-green-600 text-12"></div>
                  </div>
                </div>
                )
              : null}
          </DragOverlay>
        </SortableContext>
      </Box>
    </DndContext>
  )
}

export default App
