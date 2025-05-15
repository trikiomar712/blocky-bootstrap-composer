
import React, { createContext, useContext, useState } from 'react';

// Define the type for a content block
type ContentBlock = {
  id: string;
  type: string;
  content: any;
};

// Define the type for the context
type EditorContextType = {
  editorContent: ContentBlock[];
  setEditorContent: React.Dispatch<React.SetStateAction<ContentBlock[]>>;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isPageSidebarOpen: boolean;
  setIsPageSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context
const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Create a provider component
export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [editorContent, setEditorContent] = useState<ContentBlock[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPageSidebarOpen, setIsPageSidebarOpen] = useState(false);

  const value = {
    editorContent,
    setEditorContent,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isPageSidebarOpen,
    setIsPageSidebarOpen,
  };

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

// Create a hook to use the context
export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
