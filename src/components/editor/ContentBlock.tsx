
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';

interface ContentBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  const { activeBlock, setActiveBlock } = useEditor();
  const isActive = activeBlock === block.id;
  
  const renderContent = () => {
    switch (block.type) {
      case 'paragraph':
        return <p className="mb-4">{block.content}</p>;
      case 'heading':
        return <h2 className="text-2xl font-bold mb-4">{block.content}</h2>;
      case 'image':
        return (
          <div className="mb-4">
            <img 
              src={block.content.src} 
              alt={block.content.alt} 
              className="max-w-full h-auto rounded"
            />
          </div>
        );
      case 'list':
        return (
          <ul className="list-disc pl-6 mb-4">
            {Array.isArray(block.content) && block.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case 'code':
        return (
          <pre className="bg-gray-100 p-3 rounded mb-4 font-mono text-sm whitespace-pre-wrap">
            {block.content}
          </pre>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
            {block.content}
          </blockquote>
        );
      default:
        return <p className="mb-4">{String(block.content)}</p>;
    }
  };
  
  return (
    <div 
      className={cn(
        'mb-2 p-2 rounded border-2 border-transparent',
        isActive && 'border-bootstrap-primary'
      )}
      onClick={() => setActiveBlock(block.id)}
    >
      {renderContent()}
    </div>
  );
};
