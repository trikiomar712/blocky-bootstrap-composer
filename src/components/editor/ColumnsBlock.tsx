
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { ContentBlock } from './ContentBlock';
import { EmptyColumnBlock } from './EmptyColumnBlock';
import { cn } from '@/lib/utils';

interface Column {
  id: string;
  content: any[];
}

interface ColumnsBlockProps {
  block: {
    id: string;
    type: string;
    columns: Column[];
  };
}

export const ColumnsBlock: React.FC<ColumnsBlockProps> = ({ block }) => {
  const { activeBlock, setActiveBlock } = useEditor();
  const isActive = activeBlock === block.id;
  
  const columnCount = block.columns.length;
  
  // Create the appropriate grid class based on column count
  const getGridClass = () => {
    switch (columnCount) {
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-3';
      case 4:
        return 'grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };
  
  return (
    <div 
      className={cn(
        'mb-6 p-2 rounded border-2 border-transparent',
        isActive && 'border-bootstrap-primary'
      )}
      onClick={(e) => {
        e.stopPropagation();
        setActiveBlock(block.id);
      }}
    >
      <div className={`grid ${getGridClass()} gap-4`}>
        {block.columns.map((column) => (
          <div key={column.id} className="min-h-[100px]">
            {column.content.length > 0 ? (
              column.content.map((contentBlock) => (
                <ContentBlock key={contentBlock.id} block={contentBlock} />
              ))
            ) : (
              <EmptyColumnBlock columnId={column.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
