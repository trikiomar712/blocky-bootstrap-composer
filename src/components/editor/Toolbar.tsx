
import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered, 
  Link, 
  Image,
  Columns2, 
  Settings
} from 'lucide-react';
import { ColumnsPopup } from './ColumnsPopup';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEditor } from '@/contexts/EditorContext';

export const Toolbar: React.FC = () => {
  const [showColumnsPopup, setShowColumnsPopup] = useState(false);
  const { setIsPageSidebarOpen } = useEditor();
  
  const handleButtonClick = (command: string) => {
    console.log(`Execute command: ${command}`);
    // In a real implementation, this would apply the formatting to the editor
  };
  
  return (
    <div className="border-b border-gray-300 bg-white p-2 flex items-center flex-wrap gap-1 justify-between">
      <div className="flex items-center flex-wrap gap-1">
        <div className="flex items-center mr-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('bold')}
          >
            <Bold size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('italic')}
          >
            <Italic size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('underline')}
          >
            <Underline size={16} />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-300 mx-1" />
        
        <div className="flex items-center mr-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('alignLeft')}
          >
            <AlignLeft size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('alignCenter')}
          >
            <AlignCenter size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('alignRight')}
          >
            <AlignRight size={16} />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-300 mx-1" />
        
        <div className="flex items-center mr-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('bulletList')}
          >
            <List size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('orderedList')}
          >
            <ListOrdered size={16} />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-300 mx-1" />
        
        <div className="flex items-center mr-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('link')}
          >
            <Link size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0" 
            onClick={() => handleButtonClick('image')}
          >
            <Image size={16} />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-gray-300 mx-1" />
        
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 p-1"
              >
                <Columns2 size={16} />
                <span className="text-xs">Columns</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <ColumnsPopup />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setIsPageSidebarOpen(true)}
        >
          <Settings size={16} />
          <span className="text-xs">Page Settings</span>
        </Button>
      </div>
    </div>
  );
};
