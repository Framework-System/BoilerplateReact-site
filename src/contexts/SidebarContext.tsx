import type { FC, ReactNode } from 'react';
import { createContext, memo, useContext, useState } from 'react';

interface SidebarContextType {
  isVisible: boolean;
  isExpanded: boolean;
  toggleSidebar: () => void;
  toggleSidebarSize: () => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  setIsVisible: (isVisible: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: FC<{ children: ReactNode }> = memo(
  ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const [currentPath, setCurrentPath] = useState('/');

    const toggleSidebar = () => {
      setIsVisible((prev) => !prev);
    };

    const toggleSidebarSize = () => {
      setIsExpanded((prev) => !prev);
    };

    return (
      <SidebarContext.Provider
        value={{
          isVisible,
          isExpanded,
          toggleSidebar,
          toggleSidebarSize,
          currentPath,
          setCurrentPath,
          setIsVisible,
        }}
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
