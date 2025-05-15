
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { BlockSuggestions } from './BlockSuggestions';

export const EmptyBlock: React.FC = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center">
      {showSuggestions ? (
        <BlockSuggestions onClose={() => setShowSuggestions(false)} />
      ) : (
        <>
          <p className="text-gray-500 mb-4">Drop blocks here or add a new block</p>
          <button 
            className="flex items-center justify-center bg-bootstrap-primary hover:bg-blue-600 text-white rounded-full w-12 h-12 transition-colors"
            onClick={() => setShowSuggestions(true)}
          >
            <Plus size={24} />
          </button>
        </>
      )}
    </div>
  );
};
