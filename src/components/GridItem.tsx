import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box } from 'grommet'

interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: any
  id: string
  handle: boolean
  children: React.ReactNode
}

export default function GridItem(props: GridItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? '100' : 'auto',
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Box>
        <div {...listeners} {...attributes} className="min-w-30vw mx-2 mb-6 flex flex-col bg-white bg-op-80 rounded-8 shadow-lg">
          {props.children}
        </div>
      </Box>
    </div>
  )
}
