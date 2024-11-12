import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './components/header';
import { Meta } from './components/meta';
import { Sidebar } from './components/sidebar';
import { useSidebar } from '../contexts/SidebarContext';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { isExpanded, setCurrentPath } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname, setCurrentPath]);

  return (
    <>
      <Meta />
      <div className={`transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Sidebar />
          {children}
        </div>
      </div>
    </>
  );
};