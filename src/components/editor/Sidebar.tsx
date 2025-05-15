
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { Blocks } from 'lucide-react';
import { BlockItem } from './BlockItem';

const BLOCKS = [
  {
    id: 'paragraph',
    title: 'Paragraph',
    description: 'Start with a basic paragraph',
    image: '/images/blocks/paragraph.png'
  },
  {
    id: 'heading',
    title: 'Heading',
    description: 'Section heading (h2)',
    image: '/images/blocks/heading.png'
  },
  {
    id: 'image',
    title: 'Image',
    description: 'Insert an image',
    image: '/images/blocks/image.png'
  },
  {
    id: 'list',
    title: 'List',
    description: 'Create a bulleted list',
    image: '/images/blocks/list.png'
  },
  {
    id: 'code',
    title: 'Code',
    description: 'Insert code snippet',
    image: '/images/blocks/code.png'
  },
  {
    id: 'quote',
    title: 'Quote',
    description: 'Insert a quote',
    image: '/images/blocks/quote.png'
  },
  {
    id: 'columns',
    title: 'Columns',
    description: 'Add a columns layout',
    image: '/images/blocks/columns.png'
  }
];

export const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useEditor();

  return (
    <div
      className={cn(
        'flex flex-col bg-bootstrap-light border-r border-gray-300 transition-all duration-300 h-full',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-3 border-b border-gray-300">
        <h3 className={cn('font-semibold', isSidebarCollapsed ? 'hidden' : 'block')}>Blocks</h3>
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="p-2 rounded hover:bg-gray-200"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <Blocks size={20} />
        </button>
      </div>
      <div className="overflow-y-auto flex-grow p-2">
        {BLOCKS.map((block) => (
          <BlockItem 
            key={block.id}
            block={block}
            collapsed={isSidebarCollapsed}
          />
        ))}
      </div>
    </div>
  );
};
