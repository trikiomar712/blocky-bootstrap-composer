
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface EditorContextProps {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  activeBlock: string | null;
  setActiveBlock: React.Dispatch<React.SetStateAction<string | null>>;
  editorContent: any[];
  setEditorContent: React.Dispatch<React.SetStateAction<any[]>>;
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<any[]>([
    {
      type: 'paragraph',
      id: '1',
      content: 'Welcome to TipTap Editor! Try adding blocks from the sidebar.'
    }
  ]);

  return (
    <EditorContext.Provider
      value={{
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        activeBlock,
        setActiveBlock,
        editorContent,
        setEditorContent
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
