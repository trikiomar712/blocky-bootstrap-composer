
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';

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
];

interface BlockSuggestionsProps {
  onClose: () => void;
  columnId?: string;
}

export const BlockSuggestions: React.FC<BlockSuggestionsProps> = ({ onClose, columnId }) => {
  const { editorContent, setEditorContent } = useEditor();
  
  const addBlock = (blockType: string) => {
    const newBlock = {
      type: blockType,
      id: `${blockType}-${Date.now()}`,
      content: getDefaultContentForType(blockType)
    };
    
    if (columnId) {
      // Add block to a specific column
      const updatedContent = editorContent.map(block => {
        if (block.type === 'columns') {
          return {
            ...block,
            columns: block.columns.map(column => {
              if (column.id === columnId) {
                return {
                  ...column,
                  content: [...column.content, newBlock]
                };
              }
              return column;
            })
          };
        }
        return block;
      });
      
      setEditorContent(updatedContent);
    } else {
      // Add block to the main content
      setEditorContent([...editorContent, newBlock]);
    }
    
    onClose();
  };
  
  const getDefaultContentForType = (type: string) => {
    switch (type) {
      case 'paragraph':
        return 'Start writing your paragraph here...';
      case 'heading':
        return 'Heading';
      case 'image':
        return { src: '/placeholder.svg', alt: 'Image placeholder' };
      case 'list':
        return ['Item 1', 'Item 2', 'Item 3'];
      case 'code':
        return 'function hello() {\n  console.log("Hello world");\n}';
      case 'quote':
        return 'Insert a quote here';
      default:
        return '';
    }
  };
  
  return (
    <div className="absolute z-10 bg-white rounded-lg shadow-lg p-4 w-72 max-h-[400px] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Add a block</h3>
        <button 
          className="text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {BLOCKS.map((block) => (
          <button
            key={block.id}
            className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 transition-colors text-left"
            onClick={() => addBlock(block.id)}
          >
            <div className="w-12 h-12 mb-2">
              <img 
                src={block.image || '/placeholder.svg'} 
                alt={block.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <span className="text-sm font-medium">{block.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
