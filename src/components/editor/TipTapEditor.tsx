
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { EditorContent } from './EditorContent';
import { EditorProvider } from '@/contexts/EditorContext';
import { PageFormSidebar } from './PageFormSidebar';

export const TipTapEditor: React.FC = () => {
  return (
    <EditorProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-screen">
          <div className="border-b border-gray-300 bg-bootstrap-light p-2">
            <h1 className="text-xl font-bold">TipTap Editor</h1>
          </div>
          <div className="flex-grow flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-grow overflow-hidden">
              <Toolbar />
              <EditorContent />
            </div>
          </div>
          <PageFormSidebar />
        </div>
      </DndProvider>
    </EditorProvider>
  );
};
