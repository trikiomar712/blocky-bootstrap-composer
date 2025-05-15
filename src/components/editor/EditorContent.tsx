
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { useDrop } from 'react-dnd';
import { ContentBlock } from './ContentBlock';
import { EmptyBlock } from './EmptyBlock';
import { ColumnsBlock } from './ColumnsBlock';

export const EditorContent: React.FC = () => {
  const { editorContent, setEditorContent } = useEditor();
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item: any) => {
      const newBlock = {
        type: item.type,
        id: `${item.type}-${Date.now()}`,
        content: getDefaultContentForType(item.type)
      };
      
      setEditorContent([...editorContent, newBlock]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
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
    <div 
      ref={drop} 
      className={`flex-grow p-6 bg-white overflow-y-auto min-h-[300px] ${isOver ? 'bg-gray-50' : ''}`}
    >
      {editorContent.length === 0 ? (
        <EmptyBlock />
      ) : (
        <div className="max-w-4xl mx-auto">
          {editorContent.map((block) => (
            block.type === 'columns' && block.columns ? (
              <ColumnsBlock key={block.id} block={block as any} />
            ) : (
              <ContentBlock key={block.id} block={block} />
            )
          ))}
        </div>
      )}
    </div>
  );
};
