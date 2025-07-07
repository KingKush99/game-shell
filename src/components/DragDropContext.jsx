import React, { useState, useRef, useEffect } from 'react'

// Custom drag and drop implementation for button reordering
export const DragDropProvider = ({ children, onReorder }) => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e, item, index) => {
    setDraggedItem({ item, index })
    setIsDragging(true)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedItem(null)
    setDragOverItem(null)
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e, item, index) => {
    e.preventDefault()
    setDragOverItem({ item, index })
  }

  const handleDrop = (e, targetItem, targetIndex) => {
    e.preventDefault()
    
    if (draggedItem && draggedItem.index !== targetIndex) {
      onReorder(draggedItem.index, targetIndex)
    }
    
    setDraggedItem(null)
    setDragOverItem(null)
    setIsDragging(false)
  }

  return (
    <div className="drag-drop-context">
      {React.cloneElement(children, {
        dragHandlers: {
          handleDragStart,
          handleDragEnd,
          handleDragOver,
          handleDragEnter,
          handleDrop
        },
        dragState: {
          draggedItem,
          dragOverItem,
          isDragging
        }
      })}
    </div>
  )
}

export const DraggableButton = ({ 
  children, 
  item, 
  index, 
  dragHandlers, 
  dragState,
  className = "",
  ...props 
}) => {
  const { handleDragStart, handleDragEnd, handleDragOver, handleDragEnter, handleDrop } = dragHandlers
  const { draggedItem, dragOverItem, isDragging } = dragState

  const isBeingDragged = draggedItem?.index === index
  const isDraggedOver = dragOverItem?.index === index

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, item, index)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, item, index)}
      onDrop={(e) => handleDrop(e, item, index)}
      className={`
        ${className}
        ${isBeingDragged ? 'opacity-50 scale-105' : ''}
        ${isDraggedOver ? 'border-2 border-blue-400 border-dashed' : ''}
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        transition-all duration-200
      `}
      style={{
        transform: isBeingDragged ? 'rotate(5deg)' : 'none',
        zIndex: isBeingDragged ? 1000 : 'auto'
      }}
      {...props}
    >
      {children}
    </div>
  )
}

