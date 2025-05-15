
import React, { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { useDrag } from 'react-dnd';

interface BlockItemProps {
  block: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
  collapsed: boolean;
}

export const BlockItem: React.FC<BlockItemProps> = ({ block, collapsed }) => {
  const { title, description, image, id } = block;
  const [isHovered, setIsHovered] = useState(false);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { id, type: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        'flex items-center cursor-grab rounded mb-2 transition-all',
        collapsed ? 'justify-center p-2' : 'p-3',
        isDragging ? 'opacity-50' : 'opacity-100',
        isHovered ? 'bg-gray-100' : ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={collapsed ? title : ''}
    >
      <div className={cn('flex-shrink-0', collapsed ? 'w-10 h-10' : 'w-16 h-16')}>
        <img 
          src={image || '/placeholder.svg'} 
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      {!collapsed && (
        <div className="ml-3">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};
