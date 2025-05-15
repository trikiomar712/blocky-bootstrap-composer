
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';

interface ContentBlockProps {
  block: {
    id: string;
    type: string;
    content?: any; // Making content optional
  };
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
  const { activeBlock, setActiveBlock } = useEditor();
  const isActive = activeBlock === block.id;
  
  const renderContent = () => {
    // If content is undefined, provide a default value based on type
    const content = block.content ?? getDefaultContentForType(block.type);
    
    switch (block.type) {
      case 'paragraph':
        return <p className="mb-4">{content}</p>;
      case 'heading':
        return <h2 className="text-2xl font-bold mb-4">{content}</h2>;
      case 'image':
        return (
          <div className="mb-4">
            <img 
              src={content?.src ?? '/placeholder.svg'} 
              alt={content?.alt ?? 'Image'} 
              className="max-w-full h-auto rounded"
            />
          </div>
        );
      case 'list':
        return (
          <ul className="list-disc pl-6 mb-4">
            {Array.isArray(content) ? content.map((item, index) => (
              <li key={index}>{item}</li>
            )) : <li>Empty list</li>}
          </ul>
        );
      case 'code':
        return (
          <pre className="bg-gray-100 p-3 rounded mb-4 font-mono text-sm whitespace-pre-wrap">
            {content}
          </pre>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4">
            {content}
          </blockquote>
        );
      default:
        return <p className="mb-4">{String(content || '')}</p>;
    }
  };
  
  // Helper function to provide default content based on block type
  const getDefaultContentForType = (type: string) => {
    switch (type) {
      case 'paragraph':
        return 'Empty paragraph';
      case 'heading':
        return 'Untitled';
      case 'image':
        return { src: '/placeholder.svg', alt: 'Placeholder image' };
      case 'list':
        return ['Empty list item'];
      case 'code':
        return '// Empty code block';
      case 'quote':
        return 'Empty quote';
      default:
        return '';
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
