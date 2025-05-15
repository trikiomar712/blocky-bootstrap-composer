
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BlockSuggestions } from './BlockSuggestions';

interface EmptyColumnBlockProps {
  columnId: string;
}

export const EmptyColumnBlock: React.FC<EmptyColumnBlockProps> = ({ columnId }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  return (
    <div className="h-full min-h-[100px] border-2 border-dashed border-gray-300 rounded flex items-center justify-center relative">
      {showSuggestions ? (
        <BlockSuggestions 
          onClose={() => setShowSuggestions(false)} 
          columnId={columnId}
        />
      ) : (
        <button 
          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 transition-colors"
          onClick={() => setShowSuggestions(true)}
        >
          <Plus size={20} />
        </button>
      )}
    </div>
  );
};
