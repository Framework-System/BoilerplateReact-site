import type { FC, ReactNode } from 'react';
import { createContext, memo, useContext, useState } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPath, setCurrentPath] = useState('/');

    const toggleSidebar = () => {
      setIsExpanded((prev) => !prev);
    };

    return (
      <SidebarContext.Provider
        value={{ isExpanded, toggleSidebar, currentPath, setCurrentPath }}
      >
        {children}
      </SidebarContext.Provider>
    );
  },
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
