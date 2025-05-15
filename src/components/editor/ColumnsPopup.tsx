
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Columns2, Columns3, Columns4 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ColumnsPopup: React.FC = () => {
  const { editorContent, setEditorContent } = useEditor();
  
  const addColumns = (count: number) => {
    const newColumnBlock = {
      type: 'columns',
      id: `col-${Date.now()}`,
      columns: Array(count).fill(null).map((_, i) => ({
        id: `col-${Date.now()}-${i}`,
        content: []
      }))
    };
    
    setEditorContent([...editorContent, newColumnBlock]);
  };
  
  return (
    <div className="p-2">
      <h4 className="font-medium text-sm mb-3">Add Columns</h4>
      <div className="grid grid-cols-3 gap-2">
        <Button 
          variant="outline"
          className="flex flex-col items-center p-2 h-auto"
          onClick={() => addColumns(2)}
        >
          <Columns2 size={24} />
          <span className="text-xs mt-1">Two Columns</span>
        </Button>
        
        <Button 
          variant="outline"
          className="flex flex-col items-center p-2 h-auto"
          onClick={() => addColumns(3)}
        >
          <Columns3 size={24} />
          <span className="text-xs mt-1">Three Columns</span>
        </Button>
        
        <Button 
          variant="outline"
          className="flex flex-col items-center p-2 h-auto"
          onClick={() => addColumns(4)}
        >
          <Columns4 size={24} />
          <span className="text-xs mt-1">Four Columns</span>
        </Button>
      </div>
    </div>
  );
};
