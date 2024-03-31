import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box } from 'grommet'

function SortableItem(props: any) {
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
  // <div ref={setNodeRef} style={style}>
  //   <Box>
  //     <div ref={setNodeRef} {...listeners} {...attributes} className="flex flex-col bg-white bg-op-80 rounded-8 shadow-lg">
  //       <div className="p-3">
  //         <div className="flex-center">
  //           <div className="i-cryptocurrency-sol bg-gradient-to-b from-cyan-600 to-purple-600 text-10"></div>
  //           <h3 className="ml-2 text-8 font-black">{props.value}</h3>
  //         </div>
  //       </div>
  //       <div className="w-full bg-black bg-hero-graph-paper-gray-600 py-3 rounded-b-8 relative">
  //         <div className="i-solar-course-up-linear text-green-600 text-12"></div>
  //       </div>
  //     </div>

    //   </Box>
    // </div>
    <div ref={setNodeRef} style={style}>
      <Box>
        {/* {isDragging
          ? <div {...listeners} {...attributes} className="h-22 w-22 bg-gray z-100"></div>
          : (
            <div {...listeners} {...attributes} style={style} className={`${(props.value % 2) ? 'min-w-96' : 'min-w-192'} mx-2 flex flex-col bg-white bg-op-80 rounded-8 shadow-lg`}>
              <div className="p-3">
                <div className="flex-center">
                  <div className="i-cryptocurrency-sol bg-gradient-to-b from-cyan-600 to-purple-600 text-10"></div>
                  <h3 className="ml-2 text-8 font-black">{props.value}</h3>
                </div>
              </div>
              <div className="w-full bg-black bg-hero-graph-paper-gray-600 py-3 rounded-b-8 relative">
                <div className="i-solar-course-up-linear text-green-600 text-12"></div>
              </div>
            </div>
            )} */}
        <div {...listeners} {...attributes} className={`${(props.value % 2) ? 'min-w-96' : 'min-w-96'} mx-2 flex flex-col bg-white bg-op-80 rounded-8 shadow-lg`}>
          {props.children}
        </div>
      </Box>
    </div>
  )
}

export default SortableItem
